from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.inquiry import Inquiry
from schemas.inquiry import InquiryCreate, Inquiry as InquirySchema

router = APIRouter()

@router.post("/inquiries", response_model=InquirySchema)
async def create_inquiry(
    inquiry: InquiryCreate,
    db: Session = Depends(get_db)
):
    db_inquiry = Inquiry(**inquiry.dict())
    db.add(db_inquiry)
    db.commit()
    db.refresh(db_inquiry)
    
    # TODO: Send email notification to admin (implement in background task)
    
    return db_inquiry