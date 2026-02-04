from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.user import router as user_router
from routers.routers_pass import router as pass_router
from routers.message import router as message_router

from db.database import Base, engine


app = FastAPI(title="Bus Pass Booking API")


origins = [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "http://127.0.0.1:5501",
    "http://localhost:5501",
    "http://127.0.0.1:5502",
    "http://localhost:5502",
    "http://127.0.0.1:5503",
    "http://localhost:5503",
    "http://127.0.0.1:5505",
    "http://localhost:5505",
    "http://127.0.0.1:8000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)


app.include_router(user_router)
app.include_router(pass_router)
app.include_router(message_router)


@app.get("/")
def root():
    return {"message": "Welcome to Bus Pass Booking API"}
