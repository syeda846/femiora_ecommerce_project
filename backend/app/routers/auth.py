"""
auth.py — Registration and login endpoints.
Issues a JWT on successful login/register; the frontend stores it
and sends it as a Bearer token on authenticated requests.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from app.db import get_db
from app.models.user import User
from app.services.auth import hash_password, verify_password, create_access_token

router = APIRouter()


class RegisterInput(BaseModel):
    email: EmailStr
    password: str
    full_name: str


class LoginInput(BaseModel):
    email: EmailStr
    password: str


@router.post("/register")
def register(payload: RegisterInput, db: Session = Depends(get_db)):
    """Creates a new user account and returns an access token."""
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(400, "Email already registered")

    user = User(
        email=payload.email,
        hashed_password=hash_password(payload.password),
        full_name=payload.full_name,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(user.id)
    return {"access_token": token, "user": {"id": user.id, "email": user.email, "full_name": user.full_name}}


@router.post("/login")
def login(payload: LoginInput, db: Session = Depends(get_db)):
    """Verifies credentials and returns an access token."""
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(401, "Invalid email or password")

    token = create_access_token(user.id)
    return {"access_token": token, "user": {"id": user.id, "email": user.email, "full_name": user.full_name}}