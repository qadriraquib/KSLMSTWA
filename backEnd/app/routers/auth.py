from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from app.core.config import ADMIN_USERNAME, ADMIN_PASSWORD

router = APIRouter(prefix="/api/admin", tags=["auth"])

@router.post("/login")
def admin_login(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username == ADMIN_USERNAME and form_data.password == ADMIN_PASSWORD:
        return {"access_token": "admin-token", "token_type": "bearer"}
    return JSONResponse(
        status_code=status.HTTP_401_UNAUTHORIZED,
        content={"detail": "Invalid username or password"}
    )
