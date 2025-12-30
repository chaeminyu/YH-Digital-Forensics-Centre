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
    total_visits: int
    unique_visitors: int
    visits_today: int
    visits_this_week: int
    visits_this_month: int

class CountryStats(BaseModel):
    country_code: Optional[str]
    country_name: Optional[str]
    visit_count: int

class RecentVisit(BaseModel):
    ip_masked: Optional[str]
    page_path: str
    country_code: Optional[str]
    country_name: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True