# ===============================
# IMPORTS (TOP)
# ===============================
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from uuid import UUID
import os

from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

from app.core.database import get_db
from app.models.teacher_membership import TeacherMembership


# ===============================
# ROUTER (MUST COME BEFORE ROUTES)
# ===============================
router = APIRouter(
    prefix="/memberships",
    tags=["Memberships"]
)


# ===============================
# CREATE MEMBERSHIP
# ===============================
from sqlalchemy import func, Integer

@router.post("/")
def create_membership(data: dict, db: Session = Depends(get_db)):

    # 🔹 Extract numeric part safely
    last_number = db.query(
        func.max(
            func.cast(
                func.replace(TeacherMembership.membership_no, "KSLM", ""),
                Integer
            )
        )
    ).scalar()

    if last_number:
        next_number = last_number + 1
    else:
        next_number = 1

    membership_no = f"KSLM{next_number:04d}"

    member = TeacherMembership(
        **data,
        membership_no=membership_no
    )

    db.add(member)
    db.commit()
    db.refresh(member)

    return member


# ===============================
# GET MEMBERSHIPS
# ===============================
@router.get("/")
def get_memberships(
    district: str | None = None,
    taluka: str | None = None,
    db: Session = Depends(get_db)
):
    q = db.query(TeacherMembership)
    if district:
        q = q.filter(TeacherMembership.district == district)
    if taluka:
        q = q.filter(TeacherMembership.taluka == taluka)
    return q.all()


# ===============================
# DELETE MEMBERSHIP
# ===============================
@router.delete("/{id}")
def delete_membership(id: UUID, db: Session = Depends(get_db)):
    m = db.query(TeacherMembership).filter_by(id=id).first()
    if not m:
        raise HTTPException(404, "Member not found")

    db.delete(m)
    db.commit()
    return {"message": "Deleted successfully"}


# ===============================
# INDIVIDUAL MEMBER PDF (PREVIEW FORMAT)
# ===============================
@router.get("/receipt/{id}")
def membership_receipt(id: UUID, db: Session = Depends(get_db)):
    m = db.query(TeacherMembership).filter_by(id=id).first()
    if not m:
        raise HTTPException(404, "Member not found")

    os.makedirs("uploads/receipts", exist_ok=True)
    file_path = f"uploads/receipts/{m.id}.pdf"

    c = canvas.Canvas(file_path, pagesize=A4)
    width, height = A4

    # ===== HEADER =====
    c.setFont("Helvetica-Bold", 16)
    c.drawCentredString(width / 2, height - 60, "Karnataka State Linguistic Minorities Association ")

    c.setFont("Helvetica", 10)
    c.drawCentredString(
        width / 2,
        height - 80,
        "Teacher Membership Details"
    )

    y = height - 120
    label_x = 70
    value_x = 260
    line_gap = 22

    def row(label, value):
        nonlocal y
        c.setFont("Helvetica-Bold", 10)
        c.drawString(label_x, y, label)
        c.setFont("Helvetica", 10)
        c.drawString(value_x, y, str(value) if value else "-")
        y -= line_gap

    # ===== SAME AS PREVIEW =====
    row("Member ID", m.membership_no)
    row("Full Name", m.full_name)
    row("Father / Husband Name", m.father_or_husband_name)
    row("Date of Birth", m.date_of_birth)
    row("Gender", m.gender)

    y -= 8

    row("Designation", m.designation)
    row("Subject Taught", m.subject_taught)
    row("Institution", m.institution_name)
    row("Management", m.management)
    row("Medium", m.medium)
    row("Years of Experience", f"{m.years_of_experience} Years")

    y -= 8

    row("District", m.district)
    row("Taluka", m.taluka)
    row("Mobile No", m.mobile_no)
    row("WhatsApp No", m.whatsapp_no)
    row("Email", m.email)
    row("Address", m.residential_address)

    y -= 18

    c.setFont("Helvetica-Bold", 10)
    c.drawString(label_x, y, "Declaration")
    y -= 14

    c.setFont("Helvetica-Oblique", 9)
    c.drawString(
        label_x,
        y,
        "The form is submitted digitally with a declaration, so no individual signature is required."
    )

    c.showPage()
    c.save()

    return FileResponse(
        file_path,
        media_type="application/pdf",
        filename=f"{m.full_name}_membership.pdf"
    )
import pandas as pd

@router.get("/export/excel")
def export_memberships_excel(
    district: str | None = None,
    taluka: str | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(TeacherMembership)

    if district:
        query = query.filter(TeacherMembership.district == district)
    if taluka:
        query = query.filter(TeacherMembership.taluka == taluka)

    members = query.all()

    if not members:
        raise HTTPException(status_code=404, detail="No records found")

    os.makedirs("uploads", exist_ok=True)
    file_path = "uploads/memberships_full.xlsx"

    df = pd.DataFrame([{
        "Member ID": m.membership_no,
        "Full Name": m.full_name,
        "Father / Husband Name": m.father_or_husband_name,
        "Date of Birth": m.date_of_birth,
        "Gender": m.gender,
        "Designation": m.designation,
        "Subject Taught": m.subject_taught,
        "Institution": m.institution_name,
        "Management": m.management,
        "Medium": m.medium,
        "Years of Experience": m.years_of_experience,
        "District": m.district,
        "Taluka": m.taluka,
        "Mobile No": m.mobile_no,
        "WhatsApp No": m.whatsapp_no,
        "Email": m.email,
        "Address": m.residential_address,
    } for m in members])

    df.to_excel(file_path, index=False)

    return FileResponse(
        file_path,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        filename="memberships_full.xlsx"
    )
@router.get("/export/pdf")
def export_memberships_pdf(
    district: str | None = None,
    taluka: str | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(TeacherMembership)

    if district:
        query = query.filter(TeacherMembership.district == district)
    if taluka:
        query = query.filter(TeacherMembership.taluka == taluka)

    members = query.all()

    if not members:
        raise HTTPException(status_code=404, detail="No records found")

    os.makedirs("uploads", exist_ok=True)
    file_path = "uploads/memberships_full.pdf"

    c = canvas.Canvas(file_path, pagesize=A4)
    width, height = A4

    for m in members:

        c.setFont("Helvetica-Bold", 14)
        c.drawCentredString(width / 2, height - 40,
            "Karnataka State Linguistic Minorities Association"
        )

        c.setFont("Helvetica", 10)
        c.drawCentredString(width / 2, height - 60,
            "Teacher Membership Details"
        )

        y = height - 100
        label_x = 60
        value_x = 250
        gap = 20

        def row(label, value):
            nonlocal y
            c.setFont("Helvetica-Bold", 9)
            c.drawString(label_x, y, label)
            c.setFont("Helvetica", 9)
            c.drawString(value_x, y, str(value) if value else "-")
            y -= gap

        # FULL DETAILS
        row("Member ID", m.membership_no)
        row("Full Name", m.full_name)
        row("Father / Husband Name", m.father_or_husband_name)
        row("Date of Birth", m.date_of_birth)
        row("Gender", m.gender)

        y -= 6

        row("Designation", m.designation)
        row("Subject Taught", m.subject_taught)
        row("Institution", m.institution_name)
        row("Management", m.management)
        row("Medium", m.medium)
        row("Years of Experience", f"{m.years_of_experience} Years")

        y -= 6

        row("District", m.district)
        row("Taluka", m.taluka)
        row("Mobile No", m.mobile_no)
        row("WhatsApp No", m.whatsapp_no)
        row("Email", m.email)
        row("Address", m.residential_address)

        c.showPage()

    c.save()

    return FileResponse(file_path, filename="memberships_full.pdf")
