from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List
import math

from database import get_db
from auth import get_current_admin
from models.post import Post
from models.admin import Admin
from schemas.post import Post as PostSchema, PostCreate, PostUpdate, PostList

router = APIRouter()

@router.get("/posts", response_model=PostList)
async def get_admin_posts(
    page: int = 1,
    limit: int = 10,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    total = db.query(Post).count()
    posts = db.query(Post).order_by(desc(Post.created_at)).offset((page - 1) * limit).limit(limit).all()
    
    return PostList(
        posts=posts,
        total=total,
        page=page,
        limit=limit,
        total_pages=math.ceil(total / limit)
    )

@router.get("/posts/{post_id}", response_model=PostSchema)
async def get_post(
    post_id: int,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    return db_post

@router.post("/posts", response_model=PostSchema)
async def create_post(
    post: PostCreate,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    # Check if slug already exists
    existing_post = db.query(Post).filter(Post.slug == post.slug).first()
    if existing_post:
        raise HTTPException(status_code=400, detail="Slug already exists")
    
    db_post = Post(**post.dict())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    
    return db_post

@router.put("/posts/{post_id}", response_model=PostSchema)
async def update_post(
    post_id: int,
    post: PostUpdate,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Check if new slug already exists (if slug is being updated)
    if post.slug and post.slug != db_post.slug:
        existing_post = db.query(Post).filter(Post.slug == post.slug).first()
        if existing_post:
            raise HTTPException(status_code=400, detail="Slug already exists")
    
    update_data = post.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_post, field, value)
    
    db.commit()
    db.refresh(db_post)
    
    return db_post

@router.delete("/posts/{post_id}")
async def delete_post(
    post_id: int,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    db.delete(db_post)
    db.commit()
    
    return {"message": "Post deleted successfully"}