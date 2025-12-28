from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from pathlib import Path
import os
import uuid
from datetime import datetime

from auth import get_current_admin
from models.admin import Admin
from utils.s3 import upload_to_s3

router = APIRouter()

UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "static/uploads"))
MAX_FILE_SIZE = int(os.getenv("MAX_UPLOAD_SIZE", "10485760"))  # 10MB
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    current_admin: Admin = Depends(get_current_admin)
):
    # Check file size
    if file.size > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File too large")
    
    # Check file extension
    file_extension = Path(file.filename).suffix.lower()
    if file_extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="File type not allowed")
    
    # Read file content
    content = await file.read()
    
    # Try S3 upload first
    success, result = upload_to_s3(content, file.filename, file.content_type)
    
    if success:
        # S3 upload successful
        return {
            "url": result,  # Full S3 URL
            "filename": file.filename,
            "original_filename": file.filename,
            "storage": "s3"
        }
    else:
        # Fallback to local storage
        # Create unique filename
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        
        # Create date-based subdirectory
        date_dir = datetime.now().strftime("%Y/%m")
        full_upload_dir = UPLOAD_DIR / date_dir
        full_upload_dir.mkdir(parents=True, exist_ok=True)
        
        # Save file
        file_path = full_upload_dir / unique_filename
        
        with open(file_path, "wb") as buffer:
            buffer.write(content)
        
        # Return URL path
        url_path = f"/static/uploads/{date_dir}/{unique_filename}"
        
        return {
            "url": url_path,
            "filename": unique_filename,
            "original_filename": file.filename,
            "storage": "local"
        }