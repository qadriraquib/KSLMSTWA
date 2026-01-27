from sqlalchemy import Column, String, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.core.database import Base

class TeacherResource(Base):
    __tablename__ = "teacher_resources"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    category = Column(String, nullable=False)
    class_id = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    title = Column(String, nullable=False)
    resource_type = Column(String, nullable=False)  # pdf / video
    file_path = Column(String, nullable=True)
    youtube_url = Column(String, nullable=True)
    created_at = Column(TIMESTAMP)
