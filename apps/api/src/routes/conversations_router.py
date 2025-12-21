from typing import List
from uuid import UUID

import requests
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func
from sqlalchemy.orm import Session

from src.database.database import get_db
from src.database.models import Conversation, Message, MessageRole, User
from src.database.schemas import (
    ChatRequest,
    ChatResponse,
    ConversationCreate,
    ConversationResponse,
    MessageResponse,
)
from src.utils.auth_utils import get_current_active_user

conversations_router = APIRouter(prefix="/chat", tags=["chat"])


@conversations_router.post("/conversations", response_model=ConversationResponse)
def create_conversation(
    conversation_data: ConversationCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    """Créer une nouvelle conversation pour l'utilisateur connecté"""
    new_conversation = Conversation(
        user_id=current_user.id, title=conversation_data.title
    )
    db.add(new_conversation)
    db.commit()
    db.refresh(new_conversation)
    return new_conversation


@conversations_router.get("/conversations", response_model=List[ConversationResponse])
def get_user_conversations(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    """Récupérer toutes les conversations de l'utilisateur connecté et les trier par dernière activité"""
    subquery = (
        db.query(
            Message.conversation_id,
            func.max(Message.created_at).label("last_message_date"),
        )
        .group_by(Message.conversation_id)
        .subquery()
    )
    conversations = (
        db.query(Conversation)
        .filter(Conversation.user_id == current_user.id)
        .outerjoin(subquery, Conversation.id == subquery.c.conversation_id)
        .order_by(
            func.coalesce(
                subquery.c.last_message_date,
                Conversation.created_at,
            ).desc()
        )
        .all()
    )
    return conversations


@conversations_router.get(
    "/conversations/{conversation_id}", response_model=ConversationResponse
)
def get_conversation(
    conversation_id: UUID,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    """Récupérer une conversation spécifique"""
    conversation = (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id,
            Conversation.user_id == current_user.id,
        )
        .first()
    )
    if not conversation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation non trouvée",
        )
    return conversation


@conversations_router.delete(
    "/conversations/{conversation_id}", status_code=status.HTTP_204_NO_CONTENT
)
def delete_conversation(
    conversation_id: UUID,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    """Supprimer une conversation (supprime aussi tous les messages associés)"""
    conversation = (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id,
            Conversation.user_id == current_user.id,
        )
        .first()
    )
    if not conversation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation non trouvée",
        )
    db.delete(conversation)
    db.commit()
    return {"message": f"La conversation {conversation_id} a été supprimée"}


@conversations_router.post(
    "/conversations/{conversation_id}/messages", response_model=ChatResponse
)
def send_message(
    conversation_id: UUID,
    chat_request: ChatRequest,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    """
    Envoyer un message dans une conversation et obtenir la réponse du LLM
    - vérifie que la conversation appartient à l'utilisateur
    - sauvegarde le message de l'utilisateur
    - appelle le LLM en lui donnant le contexte s'il existe
    - sauvegarde la réponse du LLM
    """
    conversation = (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id,
            Conversation.user_id == current_user.id,
        )
        .first()
    )
    if not conversation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation non trouvée",
        )

    user_message = Message(
        conversation_id=conversation_id,
        role=MessageRole.user,
        content=chat_request.prompt,
    )
    db.add(user_message)
    db.commit()
    db.refresh(user_message)

    messages_history = (
        db.query(Message)
        .filter(Message.conversation_id == conversation_id)
        .order_by(Message.created_at)
        .all()
    )
    context = "\n".join(
        [
            f"{message.role.value}: {message.content}"
            for message in messages_history[:-1]
        ]
    )
    full_prompt = (
        f"{context}\nuser: {chat_request.prompt}\nassistant:"
        if context
        else chat_request.prompt
    )

    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": chat_request.model,
                "prompt": full_prompt,
                "stream": False,
            },
            timeout=60,
        )
        response.raise_for_status()
        llm_response = response.json()
        assistant_content = llm_response.get("response", "")
    except requests.RequestException as e:
        db.delete(user_message)
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur de communication avec le LLM : {str(e)}",
        )

    assistant_message = Message(
        conversation_id=conversation_id,
        role=MessageRole.assistant,
        content=assistant_content,
    )
    db.add(assistant_message)
    db.commit()
    db.refresh(assistant_message)
    return ChatResponse(
        conversation_id=conversation_id,
        user_message=user_message,
        assistant_message=assistant_message,
    )


@conversations_router.get(
    "/conversations/{conversation_id}/messages", response_model=List[MessageResponse]
)
def get_conversation_messages(
    conversation_id: UUID,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    """Récupérer tous les messages d'une conversation"""
    conversation = (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id,
            Conversation.user_id == current_user.id,
        )
        .first()
    )
    if not conversation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation non trouvée",
        )
    messages = (
        db.query(Message)
        .filter(Message.conversation_id == conversation_id)
        .order_by(Message.created_at)
        .all()
    )
    return messages
