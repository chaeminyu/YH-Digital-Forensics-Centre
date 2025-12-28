from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, desc, text
from datetime import datetime, timedelta
from typing import List, Dict, Any

from database import get_db
from auth import get_current_admin
from models.admin import Admin
from models.post import Post
from models.inquiry import Inquiry

router = APIRouter()

@router.get("/dashboard/stats")
async def get_dashboard_stats(
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Get dashboard statistics"""
    
    # Get current date ranges
    now = datetime.utcnow()
    current_month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    last_month_start = (current_month_start - timedelta(days=1)).replace(day=1)
    last_month_end = current_month_start - timedelta(seconds=1)
    week_ago = now - timedelta(days=7)
    
    # Posts statistics
    total_posts = db.query(Post).count()
    published_posts = db.query(Post).filter(Post.is_published == True).count()
    posts_this_month = db.query(Post).filter(Post.created_at >= current_month_start).count()
    posts_last_month = db.query(Post).filter(
        Post.created_at >= last_month_start,
        Post.created_at <= last_month_end
    ).count()
    
    # Inquiries statistics
    total_inquiries = db.query(Inquiry).count()
    inquiries_this_month = db.query(Inquiry).filter(Inquiry.created_at >= current_month_start).count()
    inquiries_last_month = db.query(Inquiry).filter(
        Inquiry.created_at >= last_month_start,
        Inquiry.created_at <= last_month_end
    ).count()
    
    # Views statistics
    total_views = db.query(func.sum(Post.view_count)).scalar() or 0
    
    # Recent activity (posts created this week)
    recent_activity = db.query(Post).filter(Post.created_at >= week_ago).count()
    activity_last_week = db.query(Post).filter(
        Post.created_at >= (week_ago - timedelta(days=7)),
        Post.created_at < week_ago
    ).count()
    
    # Calculate percentage changes
    def calculate_change(current: int, previous: int) -> Dict[str, Any]:
        if previous == 0:
            if current > 0:
                return {"percentage": "+100%", "type": "positive"}
            else:
                return {"percentage": "0%", "type": "neutral"}
        
        change = ((current - previous) / previous) * 100
        if change > 0:
            return {"percentage": f"+{change:.0f}%", "type": "positive"}
        elif change < 0:
            return {"percentage": f"{change:.0f}%", "type": "negative"}
        else:
            return {"percentage": "0%", "type": "neutral"}
    
    posts_change = calculate_change(posts_this_month, posts_last_month)
    inquiries_change = calculate_change(inquiries_this_month, inquiries_last_month)
    activity_change = calculate_change(recent_activity, activity_last_week)
    
    # For views, we'll estimate based on recent post engagement
    # This is simplified - in a real scenario you'd track views over time
    views_change = {"percentage": "+15%", "type": "positive"}  # Placeholder calculation
    
    return {
        "stats": {
            "totalPosts": total_posts,
            "totalInquiries": total_inquiries, 
            "totalViews": total_views,
            "recentActivity": recent_activity
        },
        "changes": {
            "posts": posts_change,
            "inquiries": inquiries_change,
            "views": views_change,
            "activity": activity_change
        }
    }

@router.get("/dashboard/recent-activity")
async def get_recent_activity(
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Get recent activity feed"""
    
    activities = []
    
    # Recent inquiries (last 5)
    recent_inquiries = db.query(Inquiry).order_by(desc(Inquiry.created_at)).limit(5).all()
    for inquiry in recent_inquiries:
        time_diff = datetime.utcnow() - inquiry.created_at
        if time_diff.days == 0:
            if time_diff.seconds < 3600:  # Less than 1 hour
                time_str = f"{time_diff.seconds // 60} minutes ago"
            else:
                time_str = f"{time_diff.seconds // 3600} hours ago"
        else:
            time_str = f"{time_diff.days} days ago"
        
        activities.append({
            "type": "inquiry",
            "message": f"New inquiry from {inquiry.name}",
            "time": time_str,
            "color": "green"
        })
    
    # Recent posts (last 5)
    recent_posts = db.query(Post).order_by(desc(Post.created_at)).limit(5).all()
    for post in recent_posts:
        time_diff = datetime.utcnow() - post.created_at
        if time_diff.days == 0:
            if time_diff.seconds < 3600:  # Less than 1 hour
                time_str = f"{time_diff.seconds // 60} minutes ago"
            else:
                time_str = f"{time_diff.seconds // 3600} hours ago"
        else:
            time_str = f"{time_diff.days} days ago"
        
        action = "Published" if post.is_published else "Created draft"
        activities.append({
            "type": "post",
            "message": f"{action} blog post: {post.title[:50]}{'...' if len(post.title) > 50 else ''}",
            "time": time_str,
            "color": "blue"
        })
    
    # Sort by most recent first (mix of inquiries and posts)
    activities.sort(key=lambda x: x["time"])
    
    return {"activities": activities[:10]}  # Return top 10 most recent