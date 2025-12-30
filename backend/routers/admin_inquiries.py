from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc, func
from typing import List
import math
from datetime import datetime, date

from database import get_db
from auth import get_current_admin
from models.inquiry import Inquiry
from models.admin import Admin
from schemas.inquiry import Inquiry as InquirySchema, InquiryStats, InquiryUpdate

router = APIRouter()

@router.get("/inquiries")
async def get_inquiries(
    page: int = 1,
    limit: int = 10,
    is_read: bool = None,
    status: str = None,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    query = db.query(Inquiry)
    
    if is_read is not None:
        query = query.filter(Inquiry.is_read == is_read)
    
    if status is not None:
        query = query.filter(Inquiry.status == status)
    
    total = query.count()
    inquiries = query.order_by(desc(Inquiry.created_at)).offset((page - 1) * limit).limit(limit).all()
    
    return {
        "inquiries": inquiries,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": math.ceil(total / limit)
    }

@router.get("/inquiries/stats", response_model=InquiryStats)
async def get_inquiry_stats(
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    total = db.query(Inquiry).count()
    unread = db.query(Inquiry).filter(Inquiry.is_read == False).count()
    today = db.query(Inquiry).filter(
        func.date(Inquiry.created_at) == date.today()
    ).count()
    
    return InquiryStats(total=total, unread=unread, today=today)

@router.get("/inquiries/{inquiry_id}", response_model=InquirySchema)
async def get_inquiry(
    inquiry_id: int,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    
    # Mark as read automatically
    if not inquiry.is_read:
        inquiry.is_read = True
        db.commit()
        db.refresh(inquiry)
    
    return inquiry

@router.put("/inquiries/{inquiry_id}", response_model=InquirySchema)
async def update_inquiry(
    inquiry_id: int,
    inquiry_data: InquiryUpdate,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    
    # Update fields if provided
    if inquiry_data.status is not None:
        inquiry.status = inquiry_data.status
        # Mark as read when status is changed
        if not inquiry.is_read:
            inquiry.is_read = True
    if inquiry_data.urgency_level is not None:
        inquiry.urgency_level = inquiry_data.urgency_level
    
    db.commit()
    db.refresh(inquiry)
    
    return inquiry

@router.delete("/inquiries/{inquiry_id}")
async def delete_inquiry(
    inquiry_id: int,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    
    db.delete(inquiry)
    db.commit()
    
    return {"message": "Inquiry deleted successfully"}