from sqlalchemy.orm import Session

from src.database.models import User


def get_user(username: str, db: Session):
    return db.query(User).filter(User.username == username).first()
