"""
products.py — Product endpoints.
Read-only routes for the shop/catalogue pages to fetch product data.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.product import Product

router = APIRouter()


@router.get("/")
def list_products(db: Session = Depends(get_db)):
    """Returns all products — used on the Shop listing page."""
    return db.query(Product).all()


@router.get("/{slug}")
def get_product(slug: str, db: Session = Depends(get_db)):
    """Returns a single product by its slug — used on the product detail page."""
    product = db.query(Product).filter(Product.slug == slug).first()
    if not product:
        raise HTTPException(404, "Product not found")
    return product