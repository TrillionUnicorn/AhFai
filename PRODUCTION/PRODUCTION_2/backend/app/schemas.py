"""Pydantic schemas for request/response validation."""
from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, List
from datetime import datetime
import re


# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=2, max_length=100)


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)
    
    @validator('password')
    def validate_password(cls, v):
        if not re.search(r'[A-Z]', v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not re.search(r'[a-z]', v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not re.search(r'\d', v):
            raise ValueError('Password must contain at least one number')
        return v


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=100)
    email: Optional[EmailStr] = None
    current_password: Optional[str] = None
    new_password: Optional[str] = Field(None, min_length=8)


# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: Optional[int] = None


# Chat Schemas
class ChatBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)


class ChatCreate(ChatBase):
    pass


class ChatUpdate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)


class ChatResponse(ChatBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Message Schemas
class MessageBase(BaseModel):
    role: str = Field(..., pattern="^(user|assistant)$")
    content: str = Field(..., min_length=1)


class MessageCreate(MessageBase):
    chat_id: int


class MessageResponse(MessageBase):
    id: int
    chat_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class ChatWithMessages(ChatResponse):
    messages: List[MessageResponse] = []


# Note Schemas
class NoteBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    content: str = Field(..., min_length=1, max_length=50000)


class NoteCreate(NoteBase):
    pass


class NoteUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    content: Optional[str] = Field(None, min_length=1, max_length=50000)


class NoteResponse(NoteBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Reminder Schemas
class ReminderBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    due_at: datetime


class ReminderCreate(ReminderBase):
    pass


class ReminderUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    due_at: Optional[datetime] = None
    completed: Optional[bool] = None


class ReminderResponse(ReminderBase):
    id: int
    user_id: int
    completed: bool
    created_at: datetime
    updated_at: datetime
    status: Optional[str] = None
    
    class Config:
        from_attributes = True


# AI Schemas
class AIGenerateRequest(BaseModel):
    prompt: str = Field(..., min_length=1, max_length=10000)
    system: Optional[str] = None
    model: Optional[str] = None
    temperature: Optional[float] = Field(0.7, ge=0.0, le=2.0)
    max_tokens: Optional[int] = Field(2048, ge=1, le=4096)


class AIChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=10000)
    chat_id: Optional[int] = None
    model: Optional[str] = None
    temperature: Optional[float] = Field(0.7, ge=0.0, le=2.0)
    max_tokens: Optional[int] = Field(2048, ge=1, le=4096)


class AIResponse(BaseModel):
    success: bool
    response: Optional[str] = None
    error: Optional[str] = None
    chat_id: Optional[int] = None


class AIStatus(BaseModel):
    available: bool
    models: List[str] = []
    current_model: str
    error: Optional[str] = None
