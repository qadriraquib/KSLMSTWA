from pydantic import BaseModel
from uuid import UUID

class GalleryResponse(BaseModel):
    id: UUID
    url: str
    title: str
    description: str | None

    class Config:
        from_attributes = True
