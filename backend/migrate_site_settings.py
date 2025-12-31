#!/usr/bin/env python3

import os
import sys
from datetime import datetime

# Add the parent directory to the path so we can import our modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from database import engine, get_db
from models.site_settings import SiteSettings

def migrate_site_settings():
    """Create site_settings table and add default values"""
    print("Creating site_settings table...")
    
    # Create the table
    SiteSettings.metadata.create_all(bind=engine)
    
    # Add default settings if none exist
    db = next(get_db())
    
    try:
        existing_settings = db.query(SiteSettings).first()
        
        if not existing_settings:
            print("Creating default site settings...")
            default_settings = SiteSettings(
                company_name="YH Digital Forensic Center",
                company_email="yh@yhforensic.com",
                company_phone="+82-10-8402-2752",
                company_address="Seoul, South Korea",
                default_meta_title="YHDFC - Digital Forensics & Cyber Investigation",
                default_meta_description="Professional digital forensics services including mobile forensics, computer forensics, and cyber investigation training.",
                default_keywords="digital forensics, mobile forensics, computer forensics, cyber investigation, data recovery",
                facebook_url="",
                twitter_url="",
                linkedin_url="",
                youtube_url="",
                maintenance_mode=False,
                allow_registration=False,
                require_email_verification=True
            )
            
            db.add(default_settings)
            db.commit()
            db.refresh(default_settings)
            
            print("✅ Default site settings created successfully!")
            print(f"   Meta Title: {default_settings.default_meta_title}")
            print(f"   Meta Description: {default_settings.default_meta_description}")
        else:
            print("✅ Site settings already exist, skipping creation.")
            
    except Exception as e:
        print(f"❌ Error creating site settings: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    migrate_site_settings()