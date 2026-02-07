import os, uuid
from fastapi import UploadFile
from app.models.gallery import GalleryImage
from sqlalchemy.orm import Session

UPLOAD_DIR = "uploads/gallery"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def save_image(db: Session, file: UploadFile, title: str, description: str):
    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    path = os.path.join(UPLOAD_DIR, filename)

    with open(path, "wb") as f:
        f.write(file.file.read())

    image = GalleryImage(
        file_name=filename,
        file_path=path,
        title=title,
        description=description
    )
    db.add(image)
    db.commit()
    db.refresh(image)
    return image
