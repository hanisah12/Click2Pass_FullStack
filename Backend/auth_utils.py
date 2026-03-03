import os
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from dotenv import load_dotenv

load_dotenv()


SECRET_KEY = os.getenv("SECRET_KEY", "secret")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

# Switch to pbkdf2_sha256 which is more stable on Vercel and has no 72-byte limit
pwd_context = CryptContext(schemes=["pbkdf2_sha256", "bcrypt_sha256", "bcrypt"], deprecated="auto")

def hash_password(password: str):
    # pbkdf2_sha256 is the default scheme now
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    try:
        # This will automatically handle pbkdf2, bcrypt_sha256, and old bcrypt hashes
        return pwd_context.verify(plain_password, hashed_password)
    except Exception as e:
        print(f"Verification Error: {str(e)}")
        # Ultimate fallback for extremely old 72-char truncated bcrypt hashes
        try:
             return pwd_context.verify(plain_password[:72], hashed_password)
        except:
             return False

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
