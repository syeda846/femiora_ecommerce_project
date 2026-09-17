"""
newsletter.py — Newsletter subscriber model.
Stores emails collected from the footer signup form.
"""
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.db import Base


class NewsletterSubscriber(Base):
    __tablename__ = "newsletter_subscribers"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())