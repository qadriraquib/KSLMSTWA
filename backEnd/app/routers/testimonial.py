from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import uuid4

from app.core.database import get_db
from app.models.testimonial import Testimonial
from app.schemas.testimonial import TestimonialCreate

router = APIRouter(
    prefix="/testimonials",
    tags=["Testimonials"]
)

# ✅ CREATE TESTIMONIAL
@router.post("/")
def create_testimonial(
    data: TestimonialCreate,
    db: Session = Depends(get_db)
):
    testimonial = Testimonial(
        id=str(uuid4()),
        name=data.name,
        role=data.role,
        content=data.content
    )
    db.add(testimonial)
    db.commit()
    db.refresh(testimonial)
    return testimonial

# ✅ GET ALL TESTIMONIALS (USED BY UI)
@router.get("/")
def get_testimonials(db: Session = Depends(get_db)):
    return db.query(Testimonial).order_by(Testimonial.created_at.desc()).all()

# ✅ DELETE TESTIMONIAL
@router.delete("/{testimonial_id}")
def delete_testimonial(
    testimonial_id: str,
    db: Session = Depends(get_db)
):
    testimonial = db.query(Testimonial).filter(
        Testimonial.id == testimonial_id
    ).first()

    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")

    db.delete(testimonial)
    db.commit()
    return {"message": "Testimonial deleted"}



@router.put("/{testimonial_id}")
def update_testimonial(
    testimonial_id: str,
    data: TestimonialCreate,
    db: Session = Depends(get_db)
):
    testimonial = db.query(Testimonial).filter(
        Testimonial.id == testimonial_id
    ).first()

    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")

    testimonial.name = data.name
    testimonial.role = data.role
    testimonial.content = data.content

    db.commit()
    db.refresh(testimonial)
    return testimonial
