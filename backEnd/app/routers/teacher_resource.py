from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from typing import Optional, List
from uuid import UUID

from app.core.database import get_db
from app.models.teacher_resource import TeacherResource
from app.schemas.teacher_resource import TeacherResourceResponse
from app.services.upload_service import save_pdf

router = APIRouter(
    prefix="/teacher-resources",
    tags=["Teacher Resources"]
)
from uuid import UUID

@router.delete("/{resource_id}")
def delete_resource(
    resource_id: UUID,
    db: Session = Depends(get_db)
):
    resource = db.query(TeacherResource).filter(
        TeacherResource.id == resource_id
    ).first()

# @router.delete("/{resource_id}")
# def delete_resource(
#     resource_id: str,
#     db: Session = Depends(get_db)
# ):
#     resource = db.query(TeacherResource).filter(
#         TeacherResource.id == resource_id
#     ).first()

#     if not resource:
#         raise HTTPException(status_code=404, detail="Resource not found")

#     db.delete(resource)
#     db.commit()

#     return {"message": "Deleted successfully"}

# ------------------------
# GET (LIST / FILTER)
# ------------------------
@router.get("/", response_model=List[TeacherResourceResponse])
def get_resources(
    category: Optional[str] = None,
    class_id: Optional[str] = None,
    subject: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(TeacherResource)

    if category:
        query = query.filter(TeacherResource.category == category)
    if class_id:
        query = query.filter(TeacherResource.class_id == class_id)
    if subject:
        query = query.filter(TeacherResource.subject == subject)

    return query.all()

# ------------------------
# CREATE
# ------------------------
@router.post("/", response_model=TeacherResourceResponse)
def create_resource(
    category: str = Form(...),
    class_id: str = Form(...),
    subject: str = Form(...),
    title: str = Form(...),
    type: str = Form(...),  # pdf / video
    youtube_url: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
):
    if type == "pdf":
        if not file:
            raise HTTPException(status_code=400, detail="PDF file required")
        file_path = save_pdf(file)
        resource = TeacherResource(
            category=category,
            class_id=class_id,
            subject=subject,
            title=title,
            resource_type="pdf",
            file_path=file_path,
        )

    elif type == "video":
        if not youtube_url:
            raise HTTPException(status_code=400, detail="YouTube URL required")
        resource = TeacherResource(
            category=category,
            class_id=class_id,
            subject=subject,
            title=title,
            resource_type="video",
            youtube_url=youtube_url,
        )
    else:
        raise HTTPException(status_code=400, detail="Invalid resource type")

    db.add(resource)
    db.commit()
    db.refresh(resource)
    return resource

# from uuid import UUID

@router.put("/{resource_id}", response_model=TeacherResourceResponse)
def update_resource(
    resource_id: UUID,
    category: str = Form(...),
    class_id: str = Form(...),
    subject: str = Form(...),
    title: str = Form(...),
    type: str = Form(...),
    youtube_url: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
):
    resource = db.query(TeacherResource).filter(
        TeacherResource.id == resource_id
    ).first()

    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")

    resource.category = category
    resource.class_id = class_id
    resource.subject = subject
    resource.title = title
    resource.resource_type = type

    if type == "pdf" and file:
        resource.file_path = save_pdf(file)
        resource.youtube_url = None

    if type == "video":
        resource.youtube_url = youtube_url
        resource.file_path = None

    db.commit()
    db.refresh(resource)
    return resource
    
