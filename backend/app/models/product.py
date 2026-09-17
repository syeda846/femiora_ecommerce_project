"""
product.py — Product model.
Represents one item in the Femiora catalogue (name, price, category, image, stock).
"""
from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from sqlalchemy.sql import func
from app.db import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)  # used in product page URL
    description = Column(Text)
    price = Column(Float, nullable=False)
    color = Column(String, nullable=True)
    category = Column(String, index=True)
    image_url = Column(String)  # main product image, also used as garment input for try-on
    stock = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    image_urls = Column(String)  # comma-separated list of additional image URLs