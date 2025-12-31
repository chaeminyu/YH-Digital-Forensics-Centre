from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime
from sqlalchemy.sql import func
from database import Base

class SiteSettings(Base):
    __tablename__ = "site_settings"

    id = Column(Integer, primary_key=True, index=True)
    
    # Company Information
    company_name = Column(String(255), default="YH Digital Forensic Center")
    company_email = Column(String(255), default="info@yhdfc.com")
    company_phone = Column(String(50), default="+82-10-0000-0000")
    company_address = Column(Text, default="Seoul, South Korea")
    
    # SEO Settings
    default_meta_title = Column(String(255), default="YHDFC - Digital Forensics & Cyber Investigation")
    default_meta_description = Column(Text, default="Professional digital forensics services including mobile forensics, computer forensics, and cyber investigation training.")
    default_keywords = Column(Text, default="digital forensics, mobile forensics, computer forensics, cyber investigation, data recovery")
    
    # Social Media
    facebook_url = Column(String(255), default="")
    twitter_url = Column(String(255), default="")
    linkedin_url = Column(String(255), default="")
    youtube_url = Column(String(255), default="")
    
    # System Configuration
    maintenance_mode = Column(Boolean, default=False)
    allow_registration = Column(Boolean, default=False)
    require_email_verification = Column(Boolean, default=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())