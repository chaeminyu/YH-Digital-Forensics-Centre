from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

class Visit(Base):
    __tablename__ = "visits"
    
    id = Column(Integer, primary_key=True, index=True)
    ip_address = Column(String(45), nullable=False)
    ip_masked = Column(String(45))  # For display: 123.45.xxx.xxx
    page_path = Column(String(500), nullable=False)
    country_code = Column(String(2))
    country_name = Column(String(100))
    user_agent = Column(String(500))
    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)