import os
import uuid
from fastapi import UploadFile, HTTPException

UPLOAD_DIR = "uploads/circulars"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def save_pdf(file: UploadFile) -> str:
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(400, "Only PDF files allowed")

    filename = f"{uuid.uuid4()}.pdf"
    path = os.path.join(UPLOAD_DIR, filename)

    with open(path, "wb") as f:
        f.write(file.file.read())

    return path
