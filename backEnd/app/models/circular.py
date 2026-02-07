from sqlalchemy import Column, String, Date
from sqlalchemy.dialects.postgresql import UUID
import uuid

from app.core.database import Base

class Circular(Base):
    __tablename__ = "circulars"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    date = Column(String, nullable=False)
