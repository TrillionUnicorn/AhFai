"""User management routes."""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Chat, Message, Note, Reminder
from app.schemas import UserResponse, UserUpdate
from app.auth import get_current_user, get_password_hash, verify_password

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """Get current user's profile."""
    return current_user


@router.patch("/me", response_model=UserResponse)
async def update_user_profile(
    user_data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update current user's profile."""
    # Update name if provided
    if user_data.name is not None:
        current_user.name = user_data.name
    
    # Update email if provided
    if user_data.email is not None:
        # Check if email is already taken
        existing_user = db.query(User).filter(
            User.email == user_data.email,
            User.id != current_user.id
        ).first()
        
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already taken"
            )
        
        current_user.email = user_data.email
    
    # Update password if provided
    if user_data.new_password is not None:
        if not user_data.current_password:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Current password is required to change password"
            )
        
        # Verify current password
        if not verify_password(user_data.current_password, current_user.password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Current password is incorrect"
            )
        
        # Update password
        current_user.password = get_password_hash(user_data.new_password)
    
    db.commit()
    db.refresh(current_user)
    
    return current_user


@router.get("/me/export")
async def export_user_data(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Export all user data."""
    # Get all chats with messages
    chats = db.query(Chat).filter(Chat.user_id == current_user.id).all()
    chats_data = []
    
    for chat in chats:
        messages = db.query(Message).filter(Message.chat_id == chat.id).order_by(Message.created_at).all()
        chats_data.append({
            "id": chat.id,
            "title": chat.title,
            "created_at": chat.created_at.isoformat(),
            "updated_at": chat.updated_at.isoformat(),
            "messages": [
                {
                    "id": msg.id,
                    "role": msg.role,
                    "content": msg.content,
                    "created_at": msg.created_at.isoformat()
                }
                for msg in messages
            ]
        })
    
    # Get all notes
    notes = db.query(Note).filter(Note.user_id == current_user.id).all()
    notes_data = [
        {
            "id": note.id,
            "title": note.title,
            "content": note.content,
            "created_at": note.created_at.isoformat(),
            "updated_at": note.updated_at.isoformat()
        }
        for note in notes
    ]
    
    # Get all reminders
    reminders = db.query(Reminder).filter(Reminder.user_id == current_user.id).all()
    reminders_data = [
        {
            "id": reminder.id,
            "title": reminder.title,
            "description": reminder.description,
            "due_at": reminder.due_at.isoformat(),
            "completed": reminder.completed,
            "created_at": reminder.created_at.isoformat(),
            "updated_at": reminder.updated_at.isoformat()
        }
        for reminder in reminders
    ]
    
    # Build export data
    export_data = {
        "export_info": {
            "exported_at": datetime.utcnow().isoformat(),
            "version": "1.0",
            "application": "AhFai"
        },
        "user": {
            "id": current_user.id,
            "email": current_user.email,
            "name": current_user.name,
            "created_at": current_user.created_at.isoformat(),
            "updated_at": current_user.updated_at.isoformat()
        },
        "chats": chats_data,
        "notes": notes_data,
        "reminders": reminders_data,
        "statistics": {
            "total_chats": len(chats_data),
            "total_messages": sum(len(chat["messages"]) for chat in chats_data),
            "total_notes": len(notes_data),
            "total_reminders": len(reminders_data)
        }
    }
    
    return export_data


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user_account(
    password: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete current user's account and all data."""
    # Verify password
    if not verify_password(password, current_user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect password"
        )
    
    # Delete user (cascade will delete all related data)
    db.delete(current_user)
    db.commit()
    
    return None


from datetime import datetime
