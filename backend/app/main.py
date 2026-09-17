"""
main.py — FastAPI application entry point.
Registers middleware and mounts all routers.
Run with: uvicorn app.main:app --reload
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import models
from app.routers import products, orders, chatbot, auth, newsletter, contact


app = FastAPI(title="Femiora API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(products.router, prefix="/products", tags=["products"])
app.include_router(orders.router, prefix="/orders", tags=["orders"])
app.include_router(chatbot.router, prefix="/chatbot", tags=["chatbot"])
app.include_router(newsletter.router, prefix="/newsletter", tags=["newsletter"])
app.include_router(contact.router, prefix="/contact", tags=["contact"])


@app.get("/")
def health():
    """Simple health check to confirm the API is running."""
    return {"status": "ok"}