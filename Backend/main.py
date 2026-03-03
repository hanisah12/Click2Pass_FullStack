from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.user import router as user_router
from routers.routers_pass import router as pass_router
from routers.message import router as message_router

from db.database import Base, engine


app = FastAPI(title="Bus Pass Booking API")


origins = ["*"]


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
    try:
        Base.metadata.create_all(bind=engine)
    except Exception as e:
        print(f"Database creation error: {e}")


app.include_router(user_router, prefix="/api")
app.include_router(pass_router, prefix="/api")
app.include_router(message_router, prefix="/api")


@app.get("/")
def root():
    return {"message": "Welcome to Bus Pass Booking API"}


@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Server is reachable"}
