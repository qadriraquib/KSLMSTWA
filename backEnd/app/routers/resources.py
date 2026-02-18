from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.resources import Resource

import shutil
import os

router = APIRouter(prefix="/resources", tags=["Resources"])

UPLOAD_DIR = "uploads/resources"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# CREATE
@router.post("")
def create_resource(
    name: str = Form(...),
    designation: str = Form(...),
    school_name: str = Form(...),
    school_address: str = Form(...),
    subject: str = Form(None),
    description: str = Form(None),
    photo: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    photo_path = None

    if photo:
        file_path = f"{UPLOAD_DIR}/{photo.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(photo.file, buffer)
        photo_path = file_path

    resource = Resource(
        name=name,
        designation=designation,
        school_name=school_name,
        school_address=school_address,
        subject=subject,
        description=description,
        photo=photo_path
    )

    db.add(resource)
    db.commit()
    db.refresh(resource)

    return resource

# READ WITH PAGINATION
@router.get("")
def get_resources(page: int = 1, limit: int = 10, db: Session = Depends(get_db)):
    skip = (page - 1) * limit
    resources = db.query(Resource).offset(skip).limit(limit).all()
    total = db.query(Resource).count()

    return {
        "data": resources,
        "total": total
    }

# UPDATE
@router.put("/{resource_id}")
def update_resource(
    resource_id: int,
    name: str = Form(...),
    designation: str = Form(...),
    school_name: str = Form(...),
    school_address: str = Form(...),
    subject: str = Form(None),
    description: str = Form(None),
    photo: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    resource = db.query(Resource).filter(Resource.id == resource_id).first()

    if not resource:
        return {"error": "Resource not found"}

    resource.name = name
    resource.designation = designation
    resource.school_name = school_name
    resource.school_address = school_address
    resource.subject = subject
    resource.description = description

    if photo:
        file_path = f"{UPLOAD_DIR}/{photo.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(photo.file, buffer)
        resource.photo = file_path

    db.commit()
    return {"message": "Updated successfully"}

# DELETE
@router.delete("/{resource_id}")
def delete_resource(resource_id: int, db: Session = Depends(get_db)):
    resource = db.query(Resource).filter(Resource.id == resource_id).first()

    if not resource:
        return {"error": "Not found"}

    db.delete(resource)
    db.commit()
    return {"message": "Deleted successfully"}
