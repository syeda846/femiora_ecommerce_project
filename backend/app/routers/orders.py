"""
routers/orders.py — Order endpoints.
GET / lists all orders (used by admin dashboard).
POST / creates a new order from cart items + shipping info,
sends a confirmation email to the customer.
PATCH /{order_id}/status updates an order's status (used by admin dashboard).
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from app.db import get_db
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.services.email import send_order_confirmation
from app.dependencies import require_admin
from app.models.user import User

router = APIRouter()

DELIVERY_CHARGE = 200.0


class OrderItemInput(BaseModel):
    product_id: int
    quantity: int


class CreateOrderInput(BaseModel):
    items: list[OrderItemInput]
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    shipping_address: str


class UpdateStatusInput(BaseModel):
    status: str  # pending, confirmed, shipped, delivered, cancelled


@router.get("/")
@router.get("/")
def list_orders(db: Session = Depends(get_db), admin: User = Depends(require_admin)):
    """Returns all orders, most recent first — used by the admin dashboard."""
    return db.query(Order).order_by(Order.created_at.desc()).all()


@router.get("/{order_id}")
def get_order(order_id: int, db: Session = Depends(get_db)):
    """Returns one order with its items — used by order confirmation page."""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(404, "Order not found")
    return order


@router.post("/")
def create_order(payload: CreateOrderInput, db: Session = Depends(get_db)):
    """
    Creates a new order:
    1. Validates each product and looks up its current price server-side.
    2. Calculates subtotal + delivery charge = grand total.
    3. Saves the Order (with shipping info, payment_method="cod") + OrderItems.
    4. Sends a confirmation email to the customer.
    """
    if not payload.items:
        raise HTTPException(400, "Cart is empty")

    subtotal = 0.0
    order_items_data = []
    summary_lines = []

    for item in payload.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            raise HTTPException(404, f"Product {item.product_id} not found")
        line_total = product.price * item.quantity
        subtotal += line_total
        order_items_data.append((product.id, item.quantity, product.price))
        summary_lines.append(f"- {product.name} x{item.quantity} — Rs. {line_total}")

    grand_total = subtotal + DELIVERY_CHARGE

    order = Order(
        status="pending",
        total=grand_total,
        delivery_charge=DELIVERY_CHARGE,
        customer_name=payload.customer_name,
        customer_email=payload.customer_email,
        customer_phone=payload.customer_phone,
        shipping_address=payload.shipping_address,
        payment_method="cod",
    )
    db.add(order)
    db.commit()
    db.refresh(order)

    for product_id, quantity, price in order_items_data:
        db.add(OrderItem(order_id=order.id, product_id=product_id, quantity=quantity, price=price))
    db.commit()

    send_order_confirmation(order, "\n".join(summary_lines))

    return {"order_id": order.id, "total": order.total, "delivery_charge": DELIVERY_CHARGE, "status": order.status}


@router.patch("/{order_id}/status")
def update_order_status(order_id: int, payload: UpdateStatusInput, db: Session = Depends(get_db)):
    """Updates an order's status — used by the admin dashboard."""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(404, "Order not found")
    order.status = payload.status
    db.commit()
    return {"order_id": order.id, "status": order.status}