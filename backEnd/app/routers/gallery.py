from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.gallery import GalleryImage
from fastapi.staticfiles import StaticFiles
import os
import uuid

router = APIRouter(
    prefix="/gallery",
    tags=["Gallery"]
)

UPLOAD_DIR = "uploads/gallery"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# ===================== GET ALL IMAGES =====================
@router.get("")
def get_gallery(db: Session = Depends(get_db)):
    images = db.query(GalleryImage).all()
    return [
        {
            "id": str(img.id),
            "url": f"/uploads/gallery/{img.file_name}",
            "title": img.title,
            "description": img.description,
        }
        for img in images
    ]


# ===================== UPLOAD IMAGE =====================
@router.post("/upload")
def upload_image(
    file: UploadFile = File(...),
    title: str = Form(...),
    description: str = Form(""),
    db: Session = Depends(get_db)
):
    if file.content_type not in ["image/jpeg", "image/png", "image/webp"]:
        raise HTTPException(status_code=400, detail="Invalid image type")

    content = file.file.read()
    if len(content) > 4 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Max 4MB allowed")

    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    path = os.path.join(UPLOAD_DIR, filename)

    with open(path, "wb") as f:
        f.write(content)

    image = GalleryImage(
        file_name=filename,
        file_path=path,
        title=title,
        description=description
    )

    db.add(image)
    db.commit()
    db.refresh(image)

    return {"message": "Uploaded successfully"}


# ===================== UPDATE IMAGE =====================
@router.put("/{image_id}")
def update_image(
    image_id: str,
    title: str = Form(...),
    description: str = Form(""),
    file: UploadFile | None = File(None),
    db: Session = Depends(get_db)
):
    image = db.query(GalleryImage).get(image_id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")

    image.title = title
    image.description = description

    if file:
        content = file.file.read()
        if len(content) > 4 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="Max 4MB allowed")

        ext = file.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{ext}"
        path = os.path.join(UPLOAD_DIR, filename)

        with open(path, "wb") as f:
            f.write(content)

        if os.path.exists(image.file_path):
            os.remove(image.file_path)

        image.file_name = filename
        image.file_path = path

    db.commit()
    return {"message": "Updated successfully"}


# ===================== DELETE IMAGE =====================
@router.delete("/{image_id}")
def delete_image(image_id: str, db: Session = Depends(get_db)):
    image = db.query(GalleryImage).get(image_id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")

    if os.path.exists(image.file_path):
        os.remove(image.file_path)

    db.delete(image)
    db.commit()
    return {"message": "Deleted successfully"}
