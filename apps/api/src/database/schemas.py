from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from src.database.models import MessageRole, UserRole


class ConversationCreate(BaseModel):
    title: str = "Nouvelle conversation"


class ConversationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    user_id: int
    title: str
    created_at: datetime


class MessageCreate(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    conversation_id: UUID
    role: MessageRole
    content: str
    created_at: datetime


class MessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    conversation_id: UUID
    role: MessageRole
    content: str
    created_at: datetime


class ChatRequest(BaseModel):
    model: str = "qwen3:4b"
    prompt: str


class ChatResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    conversation_id: UUID
    user_message: MessageResponse
    assistant_message: MessageResponse


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None


class UserCreate(BaseModel):
    first_name: str
    last_name: str
    role: UserRole
    username: str
    password: str


class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    first_name: str
    last_name: str
    role: UserRole
