"""
newsletter.py — Newsletter subscription endpoint.
POST / saves a new subscriber email (or silently ignores duplicates).
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from app.db import get_db
from app.models.newsletter import NewsletterSubscriber

router = APIRouter()


class SubscribeInput(BaseModel):
    email: EmailStr


@router.post("/")
def subscribe(payload: SubscribeInput, db: Session = Depends(get_db)):
    """Adds an email to the newsletter list, or confirms it's already subscribed."""
    existing = db.query(NewsletterSubscriber).filter(
        NewsletterSubscriber.email == payload.email
    ).first()
    if existing:
        return {"status": "already_subscribed"}

    subscriber = NewsletterSubscriber(email=payload.email)
    db.add(subscriber)
    db.commit()
    return {"status": "subscribed"}