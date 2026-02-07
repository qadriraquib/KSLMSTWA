from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.database import Base, engine

# Import models (register tables)
from app.models.team_member import TeamMember
from app.models.teacher_resource import TeacherResource

# Import routers
from app.routers import (
    team_member as team_member_router,
    teacher_resource as teacher_resource_router,
    circular as circular_router,
    testimonial as testimonial_router,
    gallery
)

# ✅ 1. Create app FIRST
app = FastAPI(title="Linguistic Platform API")

# ✅ 2. Add CORS middleware (MINIMAL FIX)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://127.0.0.1:8000",
        "http://localhost:5432",   # ⚠️ Vite fallback
    ],
    allow_credentials=True,
    allow_methods=["*"],         # PUT, POST, DELETE, OPTIONS
    allow_headers=["*"],         # multipart/form-data
)

# ⚠️ Enable only after DB password is correct
# Base.metadata.create_all(bind=engine)

# ✅ 3. Register routers
app.include_router(team_member_router.router)
app.include_router(teacher_resource_router.router)
app.include_router(circular_router.router)
app.include_router(testimonial_router.router)
app.include_router(gallery.router, prefix="/api")

# ✅ 4. Serve uploaded files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
