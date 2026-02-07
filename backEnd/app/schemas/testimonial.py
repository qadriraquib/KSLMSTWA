from pydantic import BaseModel

class TestimonialCreate(BaseModel):
    name: str
    role: str
    content: str

class TestimonialResponse(TestimonialCreate):
    id: str

    class Config:
        orm_mode = True
