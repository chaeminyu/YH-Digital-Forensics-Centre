from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from sqlalchemy.sql import func
from database import Base

class Inquiry(Base):
    __tablename__ = "inquiries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    country_code = Column(String(10))
    phone = Column(String(20))
    company = Column(String(100))
    subject = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    service_type = Column(String(100))  # Mobile, Computer, Cloud, etc.
    urgency_level = Column(String(20), default='normal', index=True)  # urgent, high, normal, low
    status = Column(String(20), default='new', index=True)  # new, read, responded, closed
    is_read = Column(Boolean, default=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())