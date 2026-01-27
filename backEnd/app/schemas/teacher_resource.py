from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class TeacherResourceResponse(BaseModel):
    id: UUID
    category: str
    class_id: str
    subject: str
    title: str
    resource_type: str
    file_path: Optional[str]
    youtube_url: Optional[str]

    class Config:
        from_attributes = True
