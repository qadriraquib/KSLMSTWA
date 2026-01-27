from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class MemberCreate(BaseModel):
    name: str
    designation: str
    photo: str
    district: str
    taluka: Optional[str] = None

class MemberResponse(MemberCreate):
    id: UUID

    class Config:
        from_attributes = True
