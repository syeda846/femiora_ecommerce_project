"""
email.py — Sends transactional emails via SMTP.
Used to confirm orders to customers. Requires SMTP credentials in .env
(e.g. Gmail app password, or a provider like SendGrid/Resend SMTP).
"""
import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
FROM_EMAIL = os.getenv("FROM_EMAIL", SMTP_USER)


def send_order_confirmation(order, items_summary: str):
    """
    Sends the customer an order confirmation email.
    Fails silently (logs to console) if SMTP isn't configured yet,
    so checkout still works while email setup is pending.
    """
    if not SMTP_USER or not SMTP_PASSWORD:
        print(f"[email skipped — SMTP not configured] Order #{order.id} confirmation for {order.customer_email}")
        return

    body = f"""Hi {order.customer_name},

Thank you for your order! Here's a summary:

{items_summary}

Total: Rs. {order.total}
Payment method: Cash on Delivery
Shipping to: {order.shipping_address}

We'll notify you once your order ships.

— Femiora
"""
    msg = MIMEText(body)
    msg["Subject"] = f"Femiora Order Confirmation — #{order.id}"
    msg["From"] = FROM_EMAIL
    msg["To"] = order.customer_email

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)
    except Exception as e:
        print(f"[email failed] {e}")