from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from models.message import Message
from dependencies import connect_to_db
from schemas.message import MessageCreate, MessageUpdate, MessageResponse

router = APIRouter(prefix="/messages", tags=["Messages"])


@router.post("/create", response_model=MessageResponse)
def create_message(message_data: MessageCreate,db: Session = Depends(connect_to_db)):
    new_message = Message(**message_data.model_dump())
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message


@router.get("/", response_model=list[MessageResponse])
def get_all_messages(db: Session = Depends(connect_to_db)):
    return db.query(Message).all()


@router.get("/user/{user_id}", response_model=list[MessageResponse])
def get_user_messages(user_id: int, db: Session = Depends(connect_to_db)):
    return db.query(Message).filter(Message.user_id == user_id).all()


