from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from uuid import UUID

from app.core.database import get_db
from app.models.circular import Circular
from app.schemas.circular import CircularResponse
from app.services.circular_file_service import save_pdf

router = APIRouter(prefix="/circulars", tags=["Circulars"])


@router.post("", response_model=CircularResponse)
def create_circular(
    title: str = Form(...),
    date: str = Form(...),
    pdf: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    path = save_pdf(pdf)
    circular = Circular(title=title, date=date, file_path=path)
    db.add(circular)
    db.commit()
    db.refresh(circular)
    return circular


@router.get("", response_model=list[CircularResponse])
def list_circulars(db: Session = Depends(get_db)):
    return db.query(Circular).order_by(Circular.date.desc()).all()


@router.put("/{circular_id}", response_model=CircularResponse)
def update_circular(
    circular_id: UUID,
    title: str = Form(...),
    date: str = Form(...),
    pdf: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
):
    circular = db.query(Circular).filter(Circular.id == circular_id).first()
    if not circular:
        raise HTTPException(404, "Circular not found")

    circular.title = title
    circular.date = date

    if pdf and pdf.filename:
        circular.file_path = save_pdf(pdf)

    db.commit()
    db.refresh(circular)
    return circular


@router.delete("/{circular_id}")
def delete_circular(circular_id: UUID, db: Session = Depends(get_db)):
    circular = db.query(Circular).filter(Circular.id == circular_id).first()
    if not circular:
        raise HTTPException(404, "Circular not found")

    db.delete(circular)
    db.commit()
    return {"message": "Deleted"}
