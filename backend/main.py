from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from dotenv import load_dotenv

from database import engine, Base
from routers import posts, categories, inquiries, admin_auth, admin_posts, admin_inquiries, admin_categories, admin_dashboard, upload

load_dotenv()

app = FastAPI(
    title="YHDFC Blog API",
    description="API for YHDFC digital forensics blog platform",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://yhforensic.com",
        "https://www.yhforensic.com",
        "http://localhost:3000", 
        "http://localhost:3001", 
        "http://localhost:3002", 
        "http://localhost:3003",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3002",
        "http://127.0.0.1:3003"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create upload directory if it doesn't exist
upload_dir = os.getenv("UPLOAD_DIR", "static/uploads")
os.makedirs(upload_dir, exist_ok=True)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(posts.router, prefix="/api", tags=["posts"])
app.include_router(categories.router, prefix="/api", tags=["categories"])
app.include_router(inquiries.router, prefix="/api", tags=["inquiries"])
app.include_router(admin_auth.router, prefix="/api/admin", tags=["admin_auth"])
app.include_router(admin_posts.router, prefix="/api/admin", tags=["admin_posts"])
app.include_router(admin_inquiries.router, prefix="/api/admin", tags=["admin_inquiries"])
app.include_router(admin_categories.router, prefix="/api/admin", tags=["admin_categories"])
app.include_router(admin_dashboard.router, prefix="/api/admin", tags=["admin_dashboard"])
app.include_router(upload.router, prefix="/api/admin", tags=["upload"])

@app.get("/")
async def root():
    return {"message": "YHDFC Blog API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)