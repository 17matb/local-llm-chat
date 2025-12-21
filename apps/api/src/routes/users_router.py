from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.database import schemas
from src.database.database import get_db
from src.database.models import User
from src.utils.auth_utils import (
    get_current_active_user,
    hash_password,
)

users_router = APIRouter(prefix="/users", tags=["users"])


@users_router.post("/", response_model=schemas.UserRead)
def register_user(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    """Créer un nouvel utilisateur"""
    existing_user = db.query(User).filter(User.username == user_data.username).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ce nom d'utilisateur est déjà pris",
        )
    new_user = User(
        username=user_data.username,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        role=user_data.role,
        hashed_password=hash_password(user_data.password),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@users_router.get("/me", response_model=schemas.UserRead)
def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    """Récupérer les informations de son propre profil"""
    return current_user
