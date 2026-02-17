from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from app.core.config import ADMIN_USERNAME, ADMIN_PASSWORD

router = APIRouter(prefix="/api/admin", tags=["auth"])

@router.post("/login")
def admin_login(form_data: OAuth2PasswordRequestForm = Depends()):
    print(f"Login attempt: {form_data.username}")  # Debug log
    
    if form_data.username == ADMIN_USERNAME and form_data.password == ADMIN_PASSWORD:
        print("Login successful!")
        return {"access_token": "admin-token", "token_type": "bearer"}
    
    print("Login failed - invalid credentials")
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid username or password",
        headers={"WWW-Authenticate": "Bearer"},
    )