from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from models.user import Users
from dependencies import connect_to_db, get_current_user
from schemas.user import UserCreate, UserUpdate, UserResponse, UserLogin, UserPatch
from auth_utils import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/create", response_model=UserResponse)
def create_user(user_data: UserCreate, db: Session = Depends(connect_to_db)):
    try:
        print(f"DEBUG: Receiving signup for {user_data.email}, password length: {len(user_data.password)}")
        hashed_pwd = hash_password(user_data.password)
        user_dict = user_data.model_dump()
        user_dict["password"] = hashed_pwd
        
        user = Users(**user_dict)
        db.add(user)
        db.commit()
        db.refresh(user)
        
        token = create_access_token(data={"sub": user.email})
        
        response_data = {
            "user_id": user.user_id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "token": token,
            "token_type": "bearer"
        }
        return response_data
    except Exception as e:
        db.rollback()
        print(f"Error in create_user: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


@router.post("/login", response_model=UserResponse)
def login_user(user_credentials: UserLogin, db: Session = Depends(connect_to_db)):
    try:
        user = db.query(Users).filter(Users.email == user_credentials.email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        if not verify_password(user_credentials.password, user.password):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        token = create_access_token(data={"sub": user.email})
        
        return {
            "user_id": user.user_id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "token": token,
            "token_type": "bearer"
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error in login_user: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


@router.get("/", response_model=list[UserResponse])
def get_all_users(db: Session = Depends(connect_to_db)):
    return db.query(Users).all()


@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(connect_to_db)):
    user = db.query(Users).filter(Users.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(connect_to_db), current_user: Users = Depends(get_current_user)):
    user = db.query(Users).filter(Users.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()
    return {"message": "User deleted"}


@router.patch("/{user_id}", response_model=UserResponse)
def patch_user(
    user_id: int,
    user_data: UserPatch,
    db: Session = Depends(connect_to_db),
    current_user: Users = Depends(get_current_user)
):
    user = db.query(Users).filter(Users.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = user_data.model_dump(exclude_unset=True)

    if "password" in update_data:
        update_data["password"] = hash_password(update_data["password"])

    for key, value in update_data.items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)
    return user

