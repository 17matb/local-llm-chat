from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.database.database import Base, engine
from src.routes.auth_router import auth_router
from src.routes.conversations_router import conversations_router
from src.routes.users_router import users_router

Base.metadata.create_all(bind=engine)


app = FastAPI()
app.include_router(users_router)
app.include_router(auth_router)
app.include_router(conversations_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "API is fine"}
