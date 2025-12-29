#!/usr/bin/env python3
"""
Press Fields Migration Script
Adds external_url and source fields to posts table for press functionality
"""

import sqlite3
import os
from pathlib import Path

def migrate_press_fields():
    # Database path
    db_path = Path("data/forensic_blog.db")
    
    if not db_path.exists():
        print(f"Database not found at {db_path}")
        return
    
    # Connect to database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        print("Adding press fields to posts table...")
        
        # Check if columns already exist
        cursor.execute("PRAGMA table_info(posts)")
        columns = [column[1] for column in cursor.fetchall()]
        
        # Add external_url column if it doesn't exist
        if 'external_url' not in columns:
            print("Adding external_url column...")
            cursor.execute("ALTER TABLE posts ADD COLUMN external_url TEXT")
        else:
            print("external_url column already exists")
        
        # Add source column if it doesn't exist  
        if 'source' not in columns:
            print("Adding source column...")
            cursor.execute("ALTER TABLE posts ADD COLUMN source TEXT")
        else:
            print("source column already exists")
        
        # Commit changes
        conn.commit()
        print("✅ Press fields migration completed successfully!")
        
        # Verify the columns were added
        cursor.execute("PRAGMA table_info(posts)")
        columns_after = [column[1] for column in cursor.fetchall()]
        print(f"Posts table now has columns: {columns_after}")
        
    except Exception as e:
        conn.rollback()
        print(f"❌ Migration failed: {e}")
        raise
    
    finally:
        conn.close()

if __name__ == "__main__":
    migrate_press_fields()