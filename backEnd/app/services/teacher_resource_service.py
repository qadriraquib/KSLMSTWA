from sqlalchemy.orm import Session
from app.models.teacher_resource import TeacherResource

def create_pdf_resource(
    db: Session,
    category,
    class_id,
    subject,
    title,
    file_path
):
    resource = TeacherResource(
        category=category,
        class_id=class_id,
        subject=subject,
        title=title,
        resource_type="pdf",
        file_path=file_path
    )
    db.add(resource)
    db.commit()
    db.refresh(resource)
    return resource

def create_video_resource(
    db: Session,
    category,
    class_id,
    subject,
    title,
    youtube_url
):
    resource = TeacherResource(
        category=category,
        class_id=class_id,
        subject=subject,
        title=title,
        resource_type="video",
        youtube_url=youtube_url
    )
    db.add(resource)
    db.commit()
    db.refresh(resource)
    return resource
