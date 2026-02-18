from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from typing import Optional
from app.core.database import get_db
from app.models.team_member import TeamMember  
from app.schemas.team_member import TeamMemberResponse
from app.services.team_member_service import (
    create_team_member,
    get_all_team_members,
    delete_team_member,
)
from app.services.photoUpload_service import save_photo
import pandas as pd

router = APIRouter(prefix="/team-members", tags=["Team Members"])

@router.post("", response_model=TeamMemberResponse)
def create(
    name: str = Form(...),
    designation: str = Form(...),
    district: str = Form(...),
    taluka: Optional[str] = Form(None),
    photo: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    photo_path = save_photo(photo)
    return create_team_member(
        db,
        name=name,
        designation=designation,
        district=district,
        taluka=taluka,
        photo=photo_path,
    )

@router.get("", response_model=List[TeamMemberResponse])
def list_all(db: Session = Depends(get_db)):
    return get_all_team_members(db)

@router.delete("/{member_id}")
def delete(member_id: UUID, db: Session = Depends(get_db)):
    member = delete_team_member(db, member_id)
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    return {"message": "Deleted"}

@router.put("/{member_id}", response_model=TeamMemberResponse)
def update_member(
    member_id: UUID,
    name: str = Form(...),
    designation: str = Form(...),
    district: str = Form(...),
    taluka: Optional[str] = Form(None),
   photo: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
):
    member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Not found")

    member.name = name
    member.designation = designation
    member.district = district
    member.taluka = taluka

    if photo:
        member.photo = save_photo(photo)

    db.commit()
    db.refresh(member)
    return member

import pandas as pd

@router.post("/bulk-upload")
def bulk_upload(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    if not file.filename.endswith(".xlsx"):
        raise HTTPException(400, "Only Excel files allowed")

    df = pd.read_excel(file.file)

    required_cols = {"name", "designation", "district", "taluka"}
    if not required_cols.issubset(df.columns):
        raise HTTPException(400, "Invalid Excel format")

    for _, row in df.iterrows():
        member = TeamMember(
            name=row["name"],
            designation=row["designation"],
            district=row["district"],
            taluka=row.get("taluka"),
            photo="",  # placeholder
        )
        db.add(member)

    db.commit()
    return {"message": "Bulk upload successful"}

@router.get("", response_model=List[TeamMemberResponse])
def list_all(
    db: Session = Depends(get_db),
   district: Optional[str] = None,
    taluka: Optional[str] = None,
    page: int = 1,
    limit: int = 10,
):
    query = db.query(TeamMember)

    if district:
        query = query.filter(TeamMember.district == district)
    if taluka:
        query = query.filter(TeamMember.taluka == taluka)

    offset = (page - 1) * limit
    return query.offset(offset).limit(limit).all()
