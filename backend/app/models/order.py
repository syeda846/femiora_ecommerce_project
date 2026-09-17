"""
order.py — Order and OrderItem models.
Order = one checkout, including shipping info, delivery charge,
and payment method (COD for now).
OrderItem = one product line inside that order.
"""
from sqlalchemy import Column, Integer, ForeignKey, Float, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # nullable: guest checkout allowed
    status = Column(String, default="pending")  # pending, confirmed, shipped, delivered, cancelled
    total = Column(Float, nullable=False)
    delivery_charge = Column(Float, default=200.0)  # flat delivery fee, Rs. 200

    # Shipping details, captured at checkout
    customer_name = Column(String, nullable=False)
    customer_email = Column(String, nullable=False)
    customer_phone = Column(String, nullable=False)
    shipping_address = Column(String, nullable=False)

    payment_method = Column(String, default="cod")  # "cod" for now; more added later

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    items = relationship("OrderItem", back_populates="order")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, default=1)
    price = Column(Float, nullable=False)  # snapshot of product price at purchase time

    order = relationship("Order", back_populates="items")