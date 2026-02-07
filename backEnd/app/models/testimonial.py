from sqlalchemy import Column, String, Text, DateTime
from datetime import datetime
from app.core.database import Base

class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
