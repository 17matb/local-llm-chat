from datetime import datetime
from uuid import UUID

from pydantic import BaseModel

from src.database.models import MessageRole, UserRole


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
    id: int
    username: str
    first_name: str
    last_name: str
    role: UserRole


class ConversationCreate(BaseModel):
    id: UUID
    user_id: int
    title: str
    created_at: datetime
    edited_at: datetime


class ConversationRead(BaseModel):
    id: UUID
    user_id: int
    title: str
    created_at: datetime
    edited_at: datetime


class MessageCreate(BaseModel):
    id: int
    conversation_id: UUID
    role: MessageRole
    content: str
    created_at: datetime


class MessageRead(BaseModel):
    id: int
    conversation_id: UUID
    role: MessageRole
    content: str
    created_at: datetime
