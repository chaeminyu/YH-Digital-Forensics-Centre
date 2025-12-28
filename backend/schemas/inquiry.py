from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class InquiryBase(BaseModel):
    name: str
    email: EmailStr
    country_code: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    subject: str
    message: str

class InquiryCreate(InquiryBase):
    service_type: Optional[str] = None
    urgency_level: Optional[str] = 'normal'

class InquiryUpdate(BaseModel):
    status: Optional[str] = None
    urgency_level: Optional[str] = None

class Inquiry(InquiryBase):
    id: int
    service_type: Optional[str] = None
    urgency_level: str = 'normal'
    status: str = 'new'
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True

class InquiryStats(BaseModel):
    total: int
    unread: int
    today: int