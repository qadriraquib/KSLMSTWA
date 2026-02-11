from sqlalchemy import Column, String, Integer, Date, TIMESTAMP, Text
from sqlalchemy.dialects.postgresql import UUID
import uuid

from app.core.database import Base
from sqlalchemy.sql import func

class TeacherMembership(Base):
    __tablename__ = "teacher_memberships"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    membership_no = Column(String(20), unique=True, index=True)

    # Personal Details
    full_name = Column(String, nullable=False)
    father_or_husband_name = Column(String, nullable=False)
    date_of_birth = Column(Date, nullable=False)
    gender = Column(String, nullable=False)

    # Professional Details
    designation = Column(String, nullable=False)
    subject_taught = Column(String, nullable=False)
    institution_name = Column(String, nullable=False)
    management = Column(String, nullable=False)
    medium = Column(String)
    years_of_experience = Column(Integer, nullable=False)

    # Location
    district = Column(String, nullable=False)
    taluka = Column(String, nullable=False)

    # Contact
    mobile_no = Column(String, nullable=False, unique=True)
    whatsapp_no = Column(String)
    email = Column(String)
    residential_address = Column(Text, nullable=False)

    created_at = Column(TIMESTAMP, server_default=func.now())
