"""
chatbot.py — Chat endpoint.
Accepts a user message (+ optional conversation history) and
returns the assistant's reply using the Groq pipeline.
"""
from fastapi import APIRouter
from pydantic import BaseModel
from app.services.chatbot import get_chat_response

router = APIRouter()


class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []


@router.post("/")
async def chat(payload: ChatRequest):
    """
    Takes the user's latest message + prior conversation history,
    sends it to the Groq pipeline, and returns the assistant's reply.
    """
    reply = await get_chat_response(payload.message, payload.history)
    return {"reply": reply}