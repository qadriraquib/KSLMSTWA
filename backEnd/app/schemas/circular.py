from pydantic import BaseModel
from uuid import UUID

class CircularResponse(BaseModel):
    id: UUID
    title: str
    file_path: str
    date: str

    class Config:
        from_attributes = True
