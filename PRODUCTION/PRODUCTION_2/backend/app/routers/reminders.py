"""Reminders management routes."""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from app.database import get_db
from app.models import User, Reminder
from app.schemas import ReminderCreate, ReminderUpdate, ReminderResponse
from app.auth import get_current_user

router = APIRouter(prefix="/reminders", tags=["reminders"])


def add_reminder_status(reminder: Reminder) -> dict:
    """Add status field to reminder."""
    now = datetime.utcnow()
    if reminder.completed:
        status_value = "completed"
    elif reminder.due_at <= now:
        status_value = "overdue"
    else:
        status_value = "pending"
    
    return {
        **reminder.__dict__,
        "status": status_value
    }


@router.get("", response_model=List[ReminderResponse])
async def list_reminders(
    status_filter: Optional[str] = Query(None, regex="^(pending|completed|overdue)$"),
    limit: int = Query(50, le=100),
    offset: int = Query(0, ge=0),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all reminders for the current user with optional status filter."""
    query = db.query(Reminder).filter(Reminder.user_id == current_user.id)
    
    # Add status filter
    now = datetime.utcnow()
    if status_filter == "pending":
        query = query.filter(
            Reminder.completed == False,
            Reminder.due_at >= now
        )
    elif status_filter == "completed":
        query = query.filter(Reminder.completed == True)
    elif status_filter == "overdue":
        query = query.filter(
            Reminder.completed == False,
            Reminder.due_at < now
        )
    
    reminders = query.order_by(Reminder.due_at).limit(limit).offset(offset).all()
    
    # Add status to each reminder
    reminders_with_status = [add_reminder_status(r) for r in reminders]
    
    return reminders_with_status


@router.post("", response_model=ReminderResponse, status_code=status.HTTP_201_CREATED)
async def create_reminder(
    reminder_data: ReminderCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new reminder."""
    # Validate due date is in the future
    now = datetime.utcnow()
    if reminder_data.due_at < now:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Due date must be in the future"
        )
    
    new_reminder = Reminder(
        user_id=current_user.id,
        title=reminder_data.title,
        description=reminder_data.description,
        due_at=reminder_data.due_at
    )
    
    db.add(new_reminder)
    db.commit()
    db.refresh(new_reminder)
    
    return add_reminder_status(new_reminder)


@router.get("/{reminder_id}", response_model=ReminderResponse)
async def get_reminder(
    reminder_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific reminder."""
    reminder = db.query(Reminder).filter(
        Reminder.id == reminder_id,
        Reminder.user_id == current_user.id
    ).first()
    
    if not reminder:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reminder not found"
        )
    
    return add_reminder_status(reminder)


@router.patch("/{reminder_id}", response_model=ReminderResponse)
async def update_reminder(
    reminder_id: int,
    reminder_data: ReminderUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a reminder."""
    reminder = db.query(Reminder).filter(
        Reminder.id == reminder_id,
        Reminder.user_id == current_user.id
    ).first()
    
    if not reminder:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reminder not found"
        )
    
    # Update fields if provided
    if reminder_data.title is not None:
        reminder.title = reminder_data.title
    if reminder_data.description is not None:
        reminder.description = reminder_data.description
    if reminder_data.due_at is not None:
        reminder.due_at = reminder_data.due_at
    if reminder_data.completed is not None:
        reminder.completed = reminder_data.completed
    
    db.commit()
    db.refresh(reminder)
    
    return add_reminder_status(reminder)


@router.delete("/{reminder_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_reminder(
    reminder_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a reminder."""
    reminder = db.query(Reminder).filter(
        Reminder.id == reminder_id,
        Reminder.user_id == current_user.id
    ).first()
    
    if not reminder:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reminder not found"
        )
    
    db.delete(reminder)
    db.commit()
    
    return None
