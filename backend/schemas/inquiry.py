from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional
from datetime import datetime
from utils.sanitization import sanitize_plain_text, sanitize_message

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
    
    @field_validator('name', mode='before')
    @classmethod
    def sanitize_name(cls, v):
        return sanitize_plain_text(v) if v else v
    
    @field_validator('company', mode='before')
    @classmethod
    def sanitize_company(cls, v):
        return sanitize_plain_text(v) if v else v
    
    @field_validator('subject', mode='before')
    @classmethod
    def sanitize_subject(cls, v):
        return sanitize_plain_text(v) if v else v
    
    @field_validator('message', mode='before')
    @classmethod
    def sanitize_message_content(cls, v):
        return sanitize_message(v) if v else v
    
    @field_validator('service_type', mode='before')
    @classmethod
    def sanitize_service_type(cls, v):
        return sanitize_plain_text(v) if v else v

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