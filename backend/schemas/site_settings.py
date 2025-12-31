from pydantic import BaseModel
from typing import Optional

class SiteSettingsBase(BaseModel):
    # Company Information
    company_name: str
    company_email: str
    company_phone: str
    company_address: str
    
    # SEO Settings
    default_meta_title: str
    default_meta_description: str
    default_keywords: str
    
    # Social Media
    facebook_url: str
    twitter_url: str
    linkedin_url: str
    youtube_url: str
    
    # System Configuration
    maintenance_mode: bool
    allow_registration: bool
    require_email_verification: bool

class SiteSettingsCreate(SiteSettingsBase):
    pass

class SiteSettingsUpdate(BaseModel):
    company_name: Optional[str] = None
    company_email: Optional[str] = None
    company_phone: Optional[str] = None
    company_address: Optional[str] = None
    default_meta_title: Optional[str] = None
    default_meta_description: Optional[str] = None
    default_keywords: Optional[str] = None
    facebook_url: Optional[str] = None
    twitter_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    youtube_url: Optional[str] = None
    maintenance_mode: Optional[bool] = None
    allow_registration: Optional[bool] = None
    require_email_verification: Optional[bool] = None

class SiteSettings(SiteSettingsBase):
    id: int
    
    class Config:
        from_attributes = True