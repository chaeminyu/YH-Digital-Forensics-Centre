#!/usr/bin/env python3
"""
Script to update categories from old structure to new structure
- Remove old categories: blog, computer-forensics, mobile-forensics, cloud-forensics, data-recovery, expert-witness
- Add new categories:
  - digital-forensic (parent)
    - general-forensics (child)  
    - evidence-forensics (child)
    - digital-crime (child)
  - press
  - training
"""

import sys
import os

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal, Base, engine
from models.category import Category

def update_categories():
    """Update categories from old structure to new structure"""
    db = SessionLocal()
    
    try:
        # First, let's see what categories exist
        existing_categories = db.query(Category).all()
        print("Existing categories:")
        for cat in existing_categories:
            print(f"  - {cat.name} ({cat.slug})")
        
        # Delete all old categories first
        db.query(Category).delete()
        db.commit()
        print("\nDeleted all old categories")
        
        # Add new categories
        new_categories = [
            {
                'name': 'Digital Forensic',
                'slug': 'digital-forensic',
                'description': 'Digital forensic investigation services and case studies'
            },
            {
                'name': '일반 포렌식',
                'slug': 'general-forensics', 
                'description': 'General digital forensic investigations'
            },
            {
                'name': '증거물 포렌식',
                'slug': 'evidence-forensics',
                'description': 'Digital evidence analysis and preservation'
            },
            {
                'name': '디지털 범죄',
                'slug': 'digital-crime',
                'description': 'Digital crime investigation and analysis'
            },
            {
                'name': 'Press',
                'slug': 'press',
                'description': 'Press releases and media coverage'
            },
            {
                'name': 'Training',
                'slug': 'training',
                'description': 'Corporate training and education programs'
            }
        ]
        
        for cat_data in new_categories:
            category = Category(
                name=cat_data['name'],
                slug=cat_data['slug'],
                description=cat_data['description']
            )
            db.add(category)
        
        db.commit()
        print(f"\nAdded {len(new_categories)} new categories:")
        
        # Verify the new categories
        updated_categories = db.query(Category).all()
        for cat in updated_categories:
            print(f"  - {cat.name} ({cat.slug})")
            
    except Exception as e:
        print(f"Error updating categories: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    update_categories()
    print("\nCategory update complete!")