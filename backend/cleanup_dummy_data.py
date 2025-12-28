#!/usr/bin/env python3
"""
Database cleanup script to remove all dummy data before deployment.
Keeps only category definitions and admin user account.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal
from models import Post, Inquiry
from sqlalchemy import text

def cleanup_database():
    """Remove all dummy/test data from the database."""
    db = SessionLocal()
    try:
        # Count current data
        posts_count = db.query(Post).count()
        inquiries_count = db.query(Inquiry).count()
        
        print(f"Current database state:")
        print(f"- Posts: {posts_count}")
        print(f"- Inquiries: {inquiries_count}")
        
        if posts_count == 0 and inquiries_count == 0:
            print("✅ Database is already clean!")
            return
        
        # Delete all posts
        deleted_posts = db.query(Post).delete()
        print(f"🗑️  Deleted {deleted_posts} posts")
        
        # Delete all inquiries
        deleted_inquiries = db.query(Inquiry).delete()
        print(f"🗑️  Deleted {deleted_inquiries} inquiries")
        
        # Reset auto-increment counters
        db.execute(text("UPDATE sqlite_sequence SET seq = 0 WHERE name = 'posts'"))
        db.execute(text("UPDATE sqlite_sequence SET seq = 0 WHERE name = 'inquiries'"))
        
        db.commit()
        print("✅ Database cleanup completed successfully!")
        print("📝 Categories and admin user account preserved")
        
    except Exception as e:
        print(f"❌ Error during cleanup: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    print("🧹 Starting database cleanup...")
    cleanup_database()