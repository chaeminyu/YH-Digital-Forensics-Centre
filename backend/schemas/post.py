from pydantic import BaseModel, field_validator
from typing import Optional, List
from datetime import datetime
from .category import Category
from utils.sanitization import sanitize_plain_text, sanitize_html_content, sanitize_url

class PostBase(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: Optional[str] = None
    thumbnail_url: Optional[str] = None
    category_id: Optional[int] = None
    tags: Optional[str] = None
    is_published: bool = False
    external_url: Optional[str] = None  # Press Settings > External URL
    source: Optional[str] = None        # Press Settings > Source
    client_name: Optional[str] = None   # Training Settings > Training Client Name
    training_date: Optional[str] = None # Training Settings > Date

class PostCreate(PostBase):
    @field_validator('title', mode='before')
    @classmethod
    def sanitize_title(cls, v):
        return sanitize_plain_text(v) if v else v
    
    @field_validator('content', mode='before')
    @classmethod
    def sanitize_content(cls, v):
        return sanitize_html_content(v) if v else v
    
    @field_validator('excerpt', mode='before')
    @classmethod
    def sanitize_excerpt(cls, v):
        return sanitize_plain_text(v) if v else v
    
    @field_validator('external_url', mode='before')
    @classmethod
    def sanitize_external_url(cls, v):
        return sanitize_url(v) if v else v
    
    @field_validator('source', mode='before')
    @classmethod
    def sanitize_source(cls, v):
        return sanitize_plain_text(v) if v else v
    
    @field_validator('client_name', mode='before')
    @classmethod
    def sanitize_client_name(cls, v):
        return sanitize_plain_text(v) if v else v

class PostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    thumbnail_url: Optional[str] = None
    category_id: Optional[int] = None
    tags: Optional[str] = None
    is_published: Optional[bool] = None
    external_url: Optional[str] = None  # Press Settings > External URL
    source: Optional[str] = None        # Press Settings > Source
    client_name: Optional[str] = None   # Training Settings > Training Client Name
    training_date: Optional[str] = None # Training Settings > Date
    
    @field_validator('title', mode='before')
    @classmethod
    def sanitize_title(cls, v):
        return sanitize_plain_text(v) if v else v
    
    @field_validator('content', mode='before')
    @classmethod
    def sanitize_content(cls, v):
        return sanitize_html_content(v) if v else v
    
    @field_validator('excerpt', mode='before')
    @classmethod
    def sanitize_excerpt(cls, v):
        return sanitize_plain_text(v) if v else v
    
    @field_validator('external_url', mode='before')
    @classmethod
    def sanitize_external_url(cls, v):
        return sanitize_url(v) if v else v
    
    @field_validator('source', mode='before')
    @classmethod
    def sanitize_source(cls, v):
        return sanitize_plain_text(v) if v else v
    
    @field_validator('client_name', mode='before')
    @classmethod
    def sanitize_client_name(cls, v):
        return sanitize_plain_text(v) if v else v

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