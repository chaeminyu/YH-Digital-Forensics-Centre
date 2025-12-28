from sqlalchemy.orm import Session
from database import SessionLocal
from models.admin import Admin
from auth import get_password_hash

def create_admin_user():
    db = SessionLocal()
    try:
        # Check if admin already exists
        existing_admin = db.query(Admin).filter(Admin.username == "admin").first()
        if existing_admin:
            print("Admin user already exists")
            return
        
        # Create admin user
        hashed_password = get_password_hash("admin123")
        admin = Admin(
            username="admin",
            hashed_password=hashed_password
        )
        
        db.add(admin)
        db.commit()
        print("Admin user created successfully")
        print("Username: admin")
        print("Password: admin123")
    except Exception as e:
        print(f"Error creating admin: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_admin_user()