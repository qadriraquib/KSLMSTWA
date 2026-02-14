from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    designation = Column(String(150), nullable=False)
    school_name = Column(String(200), nullable=False)
    school_address = Column(String(300), nullable=False)
    subject = Column(String(150))
    description = Column(Text)
    photo = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
