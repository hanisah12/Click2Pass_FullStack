from pydantic import BaseModel, EmailStr, Field, field_validator
import re
from datetime import datetime
from typing import Optional

# Regex for 8+ chars, 1+ alpha, 1+ digit, 1+ special char
PASSWORD_REGEX = r'^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'

def validate_password(v: Optional[str]) -> Optional[str]:
    if v is None:
        return v
    if not re.match(PASSWORD_REGEX, v):
        raise ValueError(
            "Password must be at least 8 characters long and contain "
            "at least one alphabet, one number, and one special character (@$!%*?&)."
        )
    return v

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str = Field(min_length=10, max_length=10)
    password: str

    @field_validator('password')
    @classmethod
    def check_password(cls, v):
        return validate_password(v)

class UserUpdate(BaseModel):
    name: str
    email: EmailStr
    phone: str = Field(min_length=10, max_length=10)
    password: str

    @field_validator('password')
    @classmethod
    def check_password(cls, v):
        return validate_password(v)

class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    user_id: int
    name: str
    email: EmailStr
    phone: str = Field(min_length=10, max_length=10)
    token: Optional[str] = None
    token_type: Optional[str] = "bearer"

    model_config = {"from_attributes": True}
  
class UserPatch(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = Field(default=None, min_length=10, max_length=10)
    password: Optional[str] = None

    @field_validator('password')
    @classmethod
    def check_password(cls, v):
        return validate_password(v)
