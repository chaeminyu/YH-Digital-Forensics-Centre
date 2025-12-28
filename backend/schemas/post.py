from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from .category import Category

class PostBase(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: Optional[str] = None
    thumbnail_url: Optional[str] = None
    category_id: Optional[int] = None
    tags: Optional[str] = None
    is_published: bool = False

class PostCreate(PostBase):
    pass

class PostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    thumbnail_url: Optional[str] = None
    category_id: Optional[int] = None
    tags: Optional[str] = None
    is_published: Optional[bool] = None

class Post(PostBase):
    id: int
    view_count: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    category: Optional[Category] = None

    class Config:
        from_attributes = True

class PostList(BaseModel):
    posts: List[Post]
    total: int
    page: int
    limit: int
    total_pages: int