from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from auth import get_current_admin
from models.category import Category
from models.admin import Admin
from schemas.category import Category as CategorySchema, CategoryCreate, CategoryUpdate

router = APIRouter()

@router.get("/categories", response_model=List[CategorySchema])
async def get_admin_categories(
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    categories = db.query(Category).all()
    return categories

@router.post("/categories", response_model=CategorySchema)
async def create_category(
    category: CategoryCreate,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    # Check if slug already exists
    existing_category = db.query(Category).filter(Category.slug == category.slug).first()
    if existing_category:
        raise HTTPException(status_code=400, detail="Slug already exists")
    
    # Check if name already exists
    existing_name = db.query(Category).filter(Category.name == category.name).first()
    if existing_name:
        raise HTTPException(status_code=400, detail="Category name already exists")
    
    db_category = Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    
    return db_category

@router.put("/categories/{category_id}", response_model=CategorySchema)
async def update_category(
    category_id: int,
    category: CategoryUpdate,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    # Check if new slug already exists (if slug is being updated)
    if category.slug and category.slug != db_category.slug:
        existing_slug = db.query(Category).filter(Category.slug == category.slug).first()
        if existing_slug:
            raise HTTPException(status_code=400, detail="Slug already exists")
    
    # Check if new name already exists (if name is being updated)
    if category.name and category.name != db_category.name:
        existing_name = db.query(Category).filter(Category.name == category.name).first()
        if existing_name:
            raise HTTPException(status_code=400, detail="Category name already exists")
    
    update_data = category.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_category, field, value)
    
    db.commit()
    db.refresh(db_category)
    
    return db_category

@router.delete("/categories/{category_id}")
async def delete_category(
    category_id: int,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    # Check if category has posts - prevent deletion if it does
    if db_category.posts:
        raise HTTPException(
            status_code=400, 
            detail=f"Cannot delete category '{db_category.name}' - it has {len(db_category.posts)} posts. Please reassign or delete the posts first."
        )
    
    db.delete(db_category)
    db.commit()
    
    return {"message": "Category deleted successfully"}