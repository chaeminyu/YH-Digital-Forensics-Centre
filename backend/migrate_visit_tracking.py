#!/usr/bin/env python3
"""
Migration script to add visit tracking tables
"""

from sqlalchemy import text
from database import engine, Base

def create_visits_table():
    """Create the visits table"""
    try:
        with engine.connect() as connection:
            # Create visits table
            connection.execute(text("""
                CREATE TABLE IF NOT EXISTS visits (
                    id INTEGER PRIMARY KEY,
                    ip_address VARCHAR(45) NOT NULL,
                    ip_masked VARCHAR(45),
                    page_path VARCHAR(500) NOT NULL,
                    country_code VARCHAR(2),
                    country_name VARCHAR(100),
                    user_agent VARCHAR(500),
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            """))
            
            # Create indexes for better performance
            connection.execute(text("""
                CREATE INDEX IF NOT EXISTS ix_visits_ip_address ON visits (ip_address)
            """))
            
            connection.execute(text("""
                CREATE INDEX IF NOT EXISTS ix_visits_country_code ON visits (country_code)
            """))
            
            connection.execute(text("""
                CREATE INDEX IF NOT EXISTS ix_visits_created_at ON visits (created_at)
            """))
            
            connection.execute(text("""
                CREATE INDEX IF NOT EXISTS ix_visits_page_path ON visits (page_path)
            """))
            
            connection.commit()
            print("✓ Created visits table with indexes")
            
    except Exception as e:
        print(f"Error creating visits table: {e}")
        return False
    
    return True

def main():
    print("Running visit tracking migration...")
    
    # Create visits table
    if create_visits_table():
        print("✓ Visit tracking migration completed successfully!")
    else:
        print("✗ Visit tracking migration failed!")
        return False
    
    return True

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)