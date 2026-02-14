from pydantic import BaseModel
from typing import Optional

class ResourceBase(BaseModel):
    name: str
    designation: str
    school_name: str
    school_address: str
    subject: Optional[str]
    description: Optional[str]

class ResourceCreate(ResourceBase):
    pass

class ResourceUpdate(ResourceBase):
    pass

class ResourceResponse(ResourceBase):
    id: int
    photo: Optional[str]

    class Config:
        orm_mode = True
