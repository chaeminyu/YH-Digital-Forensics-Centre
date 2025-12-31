from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class VisitCreate(BaseModel):
    page_path: str

class VisitResponse(BaseModel):
    id: int
    ip_masked: Optional[str]
    page_path: str
    country_code: Optional[str]
    country_name: Optional[str] 
    created_at: datetime

    class Config:
        from_attributes = True

class AnalyticsStats(BaseModel):
    total_visitors: int
    visitors_today: int
    visitors_this_week: int
    visitors_this_month: int

class CountryStats(BaseModel):
    country_code: Optional[str]
    country_name: Optional[str]
    visitor_count: int

class RecentVisit(BaseModel):
    ip_masked: Optional[str]
    page_path: str
    country_code: Optional[str]
    country_name: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True