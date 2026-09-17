"""
cloudinary.py — Cloudinary upload service.
Handles uploading user photos and product images to Cloudinary
and returns the public URL to store in the DB.
"""
import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv
from fastapi import UploadFile

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
)


async def upload_image(file: UploadFile) -> str:
    """
    Uploads a single image file to Cloudinary.
    Returns the HTTPS URL of the uploaded image (used as
    user_photo_url on TryOnJob, or image_url on Product).
    """
    result = cloudinary.uploader.upload(file.file)
    return result["secure_url"]