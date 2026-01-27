import os
import uuid
from fastapi import UploadFile

UPLOAD_DIR = "uploads/teacher_resources/pdf"

os.makedirs(UPLOAD_DIR, exist_ok=True)

def save_pdf(file: UploadFile) -> str:
    extension = file.filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{extension}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as f:
        f.write(file.file.read())

    return file_path
