"""
chatbot.py — Groq-based chat service.
Sends the conversation to Groq's LLM and returns a reply, using a
system prompt that scopes the assistant to Femiora shopping help.
"""
import os
from groq import AsyncGroq
from dotenv import load_dotenv

load_dotenv()

client = AsyncGroq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = """You are Femiora's shopping assistant. You help customers with
outfit suggestions, sizing questions, order status, and general store info.
Keep responses warm, concise, and on-topic for a women's fashion ecommerce store."""


async def get_chat_response(message: str, history: list) -> str:
    """
    Builds the message list (system prompt + prior history + new message),
    calls Groq's chat completion, and returns the assistant's text reply.
    """
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for h in history:
        messages.append({"role": h.role, "content": h.content})
    messages.append({"role": "user", "content": message})

    response = await client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
    )
    return response.choices[0].message.content