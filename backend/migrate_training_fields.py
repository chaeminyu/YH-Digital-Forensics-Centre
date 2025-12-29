#!/usr/bin/env python3
"""
Training Fields Migration Script
Adds client_name and training_date fields to posts table for training functionality
"""

import sqlite3
import os
from pathlib import Path

def migrate_training_fields():
    # Database path
    db_path = Path("data/forensic_blog.db")
    
    if not db_path.exists():
        print(f"Database not found at {db_path}")
        return
    
    # Connect to database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        print("Adding training fields to posts table...")
        
        # Check if columns already exist
        cursor.execute("PRAGMA table_info(posts)")
        columns = [column[1] for column in cursor.fetchall()]
        
        # Add client_name column if it doesn't exist
        if 'client_name' not in columns:
            print("Adding client_name column...")
            cursor.execute("ALTER TABLE posts ADD COLUMN client_name TEXT")
        else:
            print("client_name column already exists")
        
        # Add training_date column if it doesn't exist  
        if 'training_date' not in columns:
            print("Adding training_date column...")
            cursor.execute("ALTER TABLE posts ADD COLUMN training_date TEXT")
        else:
            print("training_date column already exists")
        
        # Commit changes
        conn.commit()
        print("✅ Training fields migration completed successfully!")
        
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
    migrate_training_fields()