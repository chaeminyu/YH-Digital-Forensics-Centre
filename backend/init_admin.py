import os
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

from database import engine, Base
from models.admin import Admin
from models.category import Category
from auth import get_password_hash

load_dotenv()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def create_initial_data():
    db = SessionLocal()
    
    try:
        # Create tables
        Base.metadata.create_all(bind=engine)
        
        # Check if admin already exists
        existing_admin = db.query(Admin).first()
        if existing_admin:
            print("Admin already exists. Skipping creation.")
            return
        
        # Create admin user
        admin_username = os.getenv("ADMIN_USERNAME", "admin")
        admin_password = os.getenv("ADMIN_PASSWORD", "admin123")
        
        hashed_password = get_password_hash(admin_password)
        admin = Admin(
            username=admin_username,
            hashed_password=hashed_password
        )
        
        db.add(admin)
        
        # Create default categories
        categories = [
            Category(name="Digital Forensics", slug="digital-forensics", description="Digital forensics and investigation techniques"),
            Category(name="Cyber Security", slug="cyber-security", description="Cybersecurity best practices and news"),
            Category(name="Technology", slug="technology", description="General technology articles"),
            Category(name="Case Studies", slug="case-studies", description="Real-world forensic case studies"),
        ]
        
        for category in categories:
            existing_category = db.query(Category).filter(Category.slug == category.slug).first()
            if not existing_category:
                db.add(category)
        
        db.commit()
        print(f"✅ Initial admin created: {admin_username}")
        print(f"✅ Default categories created")
        print(f"🔑 Admin password: {admin_password}")
        
    except Exception as e:
        print(f"❌ Error creating initial data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_initial_data()