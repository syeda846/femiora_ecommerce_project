"""
dependencies.py — Shared FastAPI dependencies.
get_current_user reads the Bearer token from a request and returns
the matching User row, or raises 401 if missing/invalid.
"""
from fastapi import Depends, HTTPException, Header
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.user import User
from app.services.auth import decode_access_token


def get_current_user(
    authorization: str = Header(None),
    db: Session = Depends(get_db),
) -> User:
    """Extracts and validates the logged-in user from the Authorization header."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(401, "Not authenticated")

    token = authorization.split(" ")[1]
    user_id = decode_access_token(token)
    if not user_id:
        raise HTTPException(401, "Invalid or expired token")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(401, "User not found")
    return user

def require_admin(current_user: User = Depends(get_current_user)) -> User:
    """Ensures the logged-in user is an admin — used to protect admin-only routes."""
    if not current_user.is_admin:
        raise HTTPException(403, "Admin access required")
    return current_user