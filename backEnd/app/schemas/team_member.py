from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class TeamMemberCreate(BaseModel):
    name: str
    designation: str
    photo: str
    district: str
    taluka: Optional[str] = None

class TeamMemberResponse(TeamMemberCreate):
    id: UUID

    class Config:
        from_attributes = True
