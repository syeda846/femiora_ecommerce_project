"""
models/__init__.py — Imports every model so that:
1. Alembic's autogenerate can detect all tables via Base.metadata.
2. Other files can do `from app import models` and access everything.
"""
from app.models.product import Product
from app.models.order import Order, OrderItem
from app.models.user import User
from app.models.newsletter import NewsletterSubscriber
from app.models.contact import ContactMessage