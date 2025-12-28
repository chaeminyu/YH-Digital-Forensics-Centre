from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc, and_
from typing import Optional
import math

from database import get_db
from models.post import Post
from models.category import Category
from schemas.post import Post as PostSchema, PostList

router = APIRouter()

@router.get("/posts", response_model=PostList)
async def get_posts(
    page: int = 1,
    limit: int = 10,
    category_id: Optional[int] = None,
    category: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Post).filter(Post.is_published == True)
    
    if category_id:
        query = query.filter(Post.category_id == category_id)
    elif category:
        # Filter by category slug/name - for blog, press, training categories
        category_obj = db.query(Category).filter(Category.name == category.title()).first()
        if category_obj:
            query = query.filter(Post.category_id == category_obj.id)
    
    if search:
        query = query.filter(
            Post.title.contains(search) | 
            Post.content.contains(search) |
            Post.excerpt.contains(search)
        )
    
    total = query.count()
    
    posts = query.order_by(desc(Post.created_at)).offset((page - 1) * limit).limit(limit).all()
    
    return PostList(
        posts=posts,
        total=total,
        page=page,
        limit=limit,
        total_pages=math.ceil(total / limit)
    )

@router.get("/posts/{slug}", response_model=PostSchema)
async def get_post(slug: str, db: Session = Depends(get_db)):
    post = db.query(Post).filter(
        and_(Post.slug == slug, Post.is_published == True)
    ).first()
    
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Increment view count
    post.view_count += 1
    db.commit()
    db.refresh(post)
    
    return post