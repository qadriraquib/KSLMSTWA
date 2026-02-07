from sqlalchemy import Column, Text, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from app.core.database import Base

class GalleryImage(Base):
    __tablename__ = "gallery_images"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    file_name = Column(Text, nullable=False)
    file_path = Column(Text, nullable=False)
    title = Column(Text, nullable=False)
    description = Column(Text)
    created_at = Column(TIMESTAMP, server_default=func.now())
