from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
import logging

from database import get_db
from models.inquiry import Inquiry
from schemas.inquiry import InquiryCreate, Inquiry as InquirySchema
from services.email_service import email_service

logger = logging.getLogger(__name__)
router = APIRouter()

async def send_email_notification(inquiry: Inquiry):
    """Background task to send email notification"""
    try:
        success = await email_service.send_inquiry_notification(inquiry)
        if success:
            logger.info(f"Email notification sent for inquiry ID {inquiry.id}")
        else:
            logger.error(f"Failed to send email notification for inquiry ID {inquiry.id}")
    except Exception as e:
        logger.error(f"Error in email notification background task: {str(e)}")

@router.post("/inquiries", response_model=InquirySchema)
async def create_inquiry(
    inquiry: InquiryCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Create a new inquiry and send email notification"""
    try:
        # Create inquiry in database
        db_inquiry = Inquiry(**inquiry.dict())
        db.add(db_inquiry)
        db.commit()
        db.refresh(db_inquiry)
        
        # Add email notification as background task
        # This allows the API to respond quickly while sending email asynchronously
        background_tasks.add_task(send_email_notification, db_inquiry)
        
        logger.info(f"New inquiry created with ID {db_inquiry.id} from {inquiry.email}")
        return db_inquiry
        
    except Exception as e:
        logger.error(f"Error creating inquiry: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to create inquiry")