from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, text, distinct
from typing import List
import asyncio
from datetime import datetime, timedelta

from database import get_db
from models.visit import Visit
from schemas.visit import VisitCreate, VisitResponse, AnalyticsStats, CountryStats, RecentVisit
from utils.geolocation import get_country_from_ip, mask_ip_address

router = APIRouter()

def get_client_ip(request: Request) -> str:
    """Extract client IP from request headers"""
    # Check for forwarded headers (for reverse proxies like Nginx)
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        # Get the first IP in the chain
        return forwarded.split(',')[0].strip()
    
    # Check for real IP header
    real_ip = request.headers.get("x-real-ip")
    if real_ip:
        return real_ip
    
    # Fallback to direct connection
    if request.client:
        return request.client.host
    
    return "127.0.0.1"

@router.post("/track")
async def track_visit(
    visit_data: VisitCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Public endpoint to track page visits
    """
    try:
        # Extract visitor information
        ip_address = get_client_ip(request)
        user_agent = request.headers.get("user-agent", "")[:500]  # Limit length
        ip_masked = mask_ip_address(ip_address)
        
        # Get geolocation data asynchronously
        geo_data = await get_country_from_ip(ip_address)
        
        # Create visit record
        visit = Visit(
            ip_address=ip_address,
            ip_masked=ip_masked,
            page_path=visit_data.page_path,
            country_code=geo_data.get("country_code"),
            country_name=geo_data.get("country_name"),
            user_agent=user_agent
        )
        
        db.add(visit)
        db.commit()
        
        return {"status": "success"}
        
    except Exception as e:
        print(f"Visit tracking error: {e}")
        # Return success even on error to avoid breaking frontend
        return {"status": "success"}

@router.get("/admin/analytics/stats", response_model=AnalyticsStats)
async def get_analytics_stats(db: Session = Depends(get_db)):
    """
    Get overall analytics statistics
    """
    try:
        # Total visits
        total_visits = db.query(Visit).count()
        
        # Unique visitors (unique IP addresses)
        unique_visitors = db.query(func.count(distinct(Visit.ip_address))).scalar()
        
        # Today's visits
        today = datetime.utcnow().date()
        visits_today = db.query(Visit).filter(
            func.date(Visit.created_at) == today
        ).count()
        
        # This week's visits
        week_start = today - timedelta(days=today.weekday())
        visits_this_week = db.query(Visit).filter(
            func.date(Visit.created_at) >= week_start
        ).count()
        
        # This month's visits
        month_start = today.replace(day=1)
        visits_this_month = db.query(Visit).filter(
            func.date(Visit.created_at) >= month_start
        ).count()
        
        return AnalyticsStats(
            total_visits=total_visits,
            unique_visitors=unique_visitors,
            visits_today=visits_today,
            visits_this_week=visits_this_week,
            visits_this_month=visits_this_month
        )
        
    except Exception as e:
        print(f"Analytics stats error: {e}")
        return AnalyticsStats(
            total_visits=0,
            unique_visitors=0,
            visits_today=0,
            visits_this_week=0,
            visits_this_month=0
        )

@router.get("/admin/analytics/countries", response_model=List[CountryStats])
async def get_country_stats(db: Session = Depends(get_db)):
    """
    Get visitor statistics by country
    """
    try:
        result = db.query(
            Visit.country_code,
            Visit.country_name,
            func.count(Visit.id).label('visit_count')
        ).filter(
            Visit.country_code.isnot(None)
        ).group_by(
            Visit.country_code, Visit.country_name
        ).order_by(
            func.count(Visit.id).desc()
        ).limit(20).all()
        
        return [
            CountryStats(
                country_code=row.country_code,
                country_name=row.country_name,
                visit_count=row.visit_count
            )
            for row in result
        ]
        
    except Exception as e:
        print(f"Country stats error: {e}")
        return []

@router.get("/admin/analytics/recent", response_model=List[RecentVisit])
async def get_recent_visits(
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """
    Get recent visits
    """
    try:
        visits = db.query(Visit).order_by(
            Visit.created_at.desc()
        ).limit(limit).all()
        
        return [
            RecentVisit(
                ip_masked=visit.ip_masked,
                page_path=visit.page_path,
                country_code=visit.country_code,
                country_name=visit.country_name,
                created_at=visit.created_at
            )
            for visit in visits
        ]
        
    except Exception as e:
        print(f"Recent visits error: {e}")
        return []