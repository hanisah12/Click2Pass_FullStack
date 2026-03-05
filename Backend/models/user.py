from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from db.database import Base

class Users(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    phone = Column(String, unique=True, index=True)
    password = Column(String)
    create_date = Column(DateTime, default=datetime.utcnow)
