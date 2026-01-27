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
)

# ✅ 1. Create app FIRST
app = FastAPI(title="Linguistic Platform API")

# ✅ 2. Add CORS middleware (MINIMAL FIX)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://localhost:5173",   # ⚠️ Vite fallback
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

# ✅ 4. Serve uploaded files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
