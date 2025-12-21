from fastapi import FastAPI

from src.database.database import Base, engine
from src.routes.auth_router import auth_router
from src.routes.conversations_router import conversations_router
from src.routes.users_router import users_router

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(users_router)
app.include_router(auth_router)
app.include_router(conversations_router)


@app.get("/")
def read_root():
    return {"message": "API is fine"}
