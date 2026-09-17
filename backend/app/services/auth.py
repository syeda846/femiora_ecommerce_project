"""
auth.py — Password hashing and JWT token helpers.
Used by the auth router to register/login users and by route
dependencies to verify a logged-in user from their token.
"""
import os
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import jwt, JWTError
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET", "change-this-secret-in-env")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """Hashes a plain-text password for storage."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Checks a plain-text password against its stored hash."""
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(user_id: int) -> str:
    """Creates a signed JWT containing the user's id, valid for 7 days."""
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": str(user_id), "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> int | None:
    """Decodes a JWT and returns the user id, or None if invalid/expired."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return int(payload.get("sub"))
    except JWTError:
        return None