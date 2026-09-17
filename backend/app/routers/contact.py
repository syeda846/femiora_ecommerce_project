"""
contact.py — Contact form endpoint.
GET / lists all submitted queries (used by admin dashboard).
POST / saves a customer query for admin follow-up.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from app.db import get_db
from app.models.contact import ContactMessage
from app.dependencies import require_admin
from app.models.user import User

router = APIRouter()


class ContactInput(BaseModel):
    name: str
    email: EmailStr
    message: str



@router.get("/")
@router.get("/")
def list_orders(db: Session = Depends(get_db), admin: User = Depends(require_admin)):
    """Returns all contact submissions, most recent first — used by the admin dashboard."""
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()


@router.post("/")
def submit_contact(payload: ContactInput, db: Session = Depends(get_db)):
    """Saves a contact form submission to the database."""
    contact = ContactMessage(name=payload.name, email=payload.email, message=payload.message)
    db.add(contact)
    db.commit()
    return {"status": "received"}