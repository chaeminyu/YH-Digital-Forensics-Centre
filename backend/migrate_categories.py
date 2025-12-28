#!/usr/bin/env python3
"""
Category Migration Script
Migrates old blog categories to new fixed structure
"""

import sqlite3
import os
from pathlib import Path

def migrate_categories():
    # Database path
    db_path = Path("data/forensic_blog.db")
    
    if not db_path.exists():
        print(f"Database not found at {db_path}")
        return
    
    # Connect to database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Backup current categories
        print("Backing up current categories...")
        cursor.execute("SELECT * FROM categories")
        old_categories = cursor.fetchall()
        print(f"Found {len(old_categories)} existing categories:")
        for cat in old_categories:
            print(f"  - ID: {cat[0]}, Name: {cat[1]}, Slug: {cat[2]}")
        
        # Clear existing categories
        print("\nClearing existing categories...")
        cursor.execute("DELETE FROM categories")
        
        # Insert new standardized categories
        print("Inserting new standardized categories...")
        new_categories = [
            (1, "Digital Forensic", "digital-forensic", "Digital forensic investigation services and case studies"),
            (2, "일반 포렌식", "general-forensics", "General digital forensic investigations"),
            (3, "증거물 포렌식", "evidence-forensics", "Digital evidence analysis and preservation"),
            (4, "디지털 범죄", "digital-crime", "Digital crime investigation and analysis"),
            (5, "Press", "press", "Press releases and media coverage"),
            (6, "Training", "training", "Corporate training and education programs"),
            (7, "Digital Forensics", "digital-forensics", "Digital forensics and investigation techniques"),
            (8, "Cyber Security", "cyber-security", "Cybersecurity best practices and news"),
            (9, "Technology", "technology", "General technology articles"),
            (10, "Case Studies", "case-studies", "Real-world forensic case studies")
        ]
        
        cursor.executemany(
            "INSERT INTO categories (id, name, slug, description) VALUES (?, ?, ?, ?)",
            new_categories
        )
        
        # Update existing posts to map to appropriate categories
        print("\nUpdating existing posts...")
        cursor.execute("SELECT id, title, category_id FROM posts")
        posts = cursor.fetchall()
        
        for post_id, title, old_category_id in posts:
            # Map old categories to new ones based on content/title
            new_category_id = map_category(title, old_category_id, old_categories)
            
            cursor.execute(
                "UPDATE posts SET category_id = ? WHERE id = ?",
                (new_category_id, post_id)
            )
            
            print(f"  - Post '{title}': {old_category_id} -> {new_category_id}")
        
        # Commit changes
        conn.commit()
        print(f"\n✅ Migration completed successfully!")
        print(f"   - {len(new_categories)} categories created")
        print(f"   - {len(posts)} posts updated")
        
    except Exception as e:
        conn.rollback()
        print(f"❌ Migration failed: {e}")
        raise
    
    finally:
        conn.close()

def map_category(title, old_category_id, old_categories):
    """Map old category to new standardized category"""
    # Find old category name
    old_category_name = next((cat[1] for cat in old_categories if cat[0] == old_category_id), "Unknown")
    
    # Mapping logic based on title content and old category
    title_lower = title.lower()
    
    # Digital forensic related
    if any(keyword in title_lower for keyword in ["forensic", "investigation", "digital", "police"]):
        if any(keyword in title_lower for keyword in ["evidence", "preservation", "chain"]):
            return 3  # evidence-forensics
        elif any(keyword in title_lower for keyword in ["crime", "criminal", "cyber"]):
            return 4  # digital-crime
        else:
            return 2  # general-forensics
    
    # Press/Media related
    elif any(keyword in title_lower for keyword in ["press", "media", "news", "announcement"]):
        return 5  # press
    
    # Training related
    elif any(keyword in title_lower for keyword in ["training", "education", "course", "workshop"]):
        return 6  # training
    
    # Technology/Security related
    elif any(keyword in title_lower for keyword in ["security", "cyber", "technology"]):
        return 8  # cyber-security
    
    # Case studies
    elif any(keyword in title_lower for keyword in ["case", "study", "example"]):
        return 10  # case-studies
    
    # Default to general forensics for forensic-related content
    return 2  # general-forensics

if __name__ == "__main__":
    migrate_categories()