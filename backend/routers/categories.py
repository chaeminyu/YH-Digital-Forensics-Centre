from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models.category import Category
from schemas.category import Category as CategorySchema

router = APIRouter()

@router.get("/categories", response_model=List[CategorySchema])
async def get_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).all()
    return categories