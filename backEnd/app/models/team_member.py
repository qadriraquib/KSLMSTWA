from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.core.database import Base

class TeamMember(Base):
    __tablename__ = "membertable"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    designation = Column(String, nullable=False)
    photo = Column(String, nullable=False)
    district = Column(String, nullable=False)
    taluka = Column(String, nullable=True)
