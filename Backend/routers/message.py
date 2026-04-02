from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
import smtplib
from email.message import EmailMessage
import os

from models.message import Message
from dependencies import connect_to_db
from schemas.message import MessageCreate, MessageUpdate, MessageResponse

router = APIRouter(prefix="/messages", tags=["Messages"])

def send_email_notification(message_data: MessageCreate):
    try:
        sender_email = os.getenv("EMAIL_SENDER")
        sender_password = os.getenv("EMAIL_PASSWORD")
        receiver_email = "siddhihanisah2007@gmail.com"

        if not sender_email or not sender_password:
            print("Email credentials are not set in .env. Skipping email notification.")
            return

        msg = EmailMessage()
        msg.set_content(f"You received a new message from {message_data.name} ({message_data.email}):\n\nSubject: {message_data.subject}\n\nMessage:\n{message_data.message}")
        msg["Subject"] = f"New Contact Message: {message_data.subject}"
        msg["From"] = sender_email
        msg["To"] = receiver_email

        # Using Gmail's SMTP server
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_password)
            server.send_message(msg)
            print("Notification email sent successfully.")
    except Exception as e:
        print(f"Failed to send email: {e}")

@router.post("/create", response_model=MessageResponse)
def create_message(
    message_data: MessageCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(connect_to_db)
):
    new_message = Message(**message_data.model_dump())
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    
    # Trigger background task to send an email
    background_tasks.add_task(send_email_notification, message_data)
    
    return new_message


@router.get("/", response_model=list[MessageResponse])
def get_all_messages(db: Session = Depends(connect_to_db)):
    return db.query(Message).all()


@router.get("/user/{user_id}", response_model=list[MessageResponse])
def get_user_messages(user_id: int, db: Session = Depends(connect_to_db)):
    return db.query(Message).filter(Message.user_id == user_id).all()


