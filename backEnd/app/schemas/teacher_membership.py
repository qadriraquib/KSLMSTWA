from pydantic import BaseModel
from uuid import UUID
from datetime import date
from typing import Optional

class TeacherMembershipSchema(BaseModel):
    id: Optional[UUID] = None
membership_no: str

    full_name: str
    father_or_husband_name: str
    date_of_birth: date
    gender: str

    designation: str
    subject_taught: str
    institution_name: str
    management: str
    medium: Optional[str] = None
    years_of_experience: int

    district: str
    taluka: str

    mobile_no: str
    whatsapp_no: Optional[str] = None
    email: Optional[str] = None
    residential_address: str

    class Config:
        from_attributes = True
