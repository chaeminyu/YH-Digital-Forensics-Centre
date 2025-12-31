from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.site_settings import SiteSettings
from schemas.site_settings import SiteSettings as SiteSettingsSchema, SiteSettingsUpdate

router = APIRouter(prefix="/api/site-settings", tags=["Site Settings"])

@router.get("/", response_model=SiteSettingsSchema)
def get_site_settings(db: Session = Depends(get_db)):
    """Get current site settings"""
    settings = db.query(SiteSettings).first()
    
    if not settings:
        # Create default settings if none exist
        default_settings = SiteSettings()
        db.add(default_settings)
        db.commit()
        db.refresh(default_settings)
        return default_settings
    
    return settings

@router.put("/", response_model=SiteSettingsSchema)
def update_site_settings(
    settings_update: SiteSettingsUpdate,
    db: Session = Depends(get_db)
):
    """Update site settings"""
    settings = db.query(SiteSettings).first()
    
    if not settings:
        # Create default settings if none exist
        settings = SiteSettings()
        db.add(settings)
        db.commit()
        db.refresh(settings)
    
    # Update only provided fields
    for field, value in settings_update.dict(exclude_unset=True).items():
        setattr(settings, field, value)
    
    db.commit()
    db.refresh(settings)
    
    return settings