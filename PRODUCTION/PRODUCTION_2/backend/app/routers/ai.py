"""AI integration routes."""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Chat, Message
from app.schemas import (
    AIGenerateRequest,
    AIChatRequest,
    AIResponse,
    AIStatus
)
from app.auth import get_current_user
from app.ai_service import ai_service

router = APIRouter(prefix="/ai", tags=["ai"])


@router.get("/status", response_model=AIStatus)
async def get_ai_status(current_user: User = Depends(get_current_user)):
    """Get AI service status."""
    status_data = await ai_service.get_status()
    return status_data


@router.post("/generate", response_model=AIResponse)
async def generate_ai_response(
    request: AIGenerateRequest,
    current_user: User = Depends(get_current_user)
):
    """Generate a single AI response."""
    result = await ai_service.generate(
        prompt=request.prompt,
        system=request.system,
        model=request.model,
        temperature=request.temperature,
        max_tokens=request.max_tokens
    )
    
    return result


@router.post("/chat", response_model=AIResponse)
async def chat_with_ai(
    request: AIChatRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Chat with AI in a conversation context."""
    chat_id = request.chat_id
    
    # Create new chat if none provided
    if not chat_id:
        new_chat = Chat(
            user_id=current_user.id,
            title=request.message[:50] + ("..." if len(request.message) > 50 else "")
        )
        db.add(new_chat)
        db.commit()
        db.refresh(new_chat)
        chat_id = new_chat.id
    else:
        # Verify chat belongs to user
        chat = db.query(Chat).filter(
            Chat.id == chat_id,
            Chat.user_id == current_user.id
        ).first()
        
        if not chat:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chat not found"
            )
    
    # Get recent chat history (last 10 messages)
    chat_history = db.query(Message).filter(
        Message.chat_id == chat_id
    ).order_by(Message.created_at.desc()).limit(10).all()
    
    # Reverse to get chronological order
    chat_history.reverse()
    
    # Build conversation messages
    messages = [
        {"role": msg.role, "content": msg.content}
        for msg in chat_history
    ]
    
    # Add current user message
    messages.append({"role": "user", "content": request.message})
    
    # Save user message
    user_message = Message(
        chat_id=chat_id,
        role="user",
        content=request.message
    )
    db.add(user_message)
    db.commit()
    
    # Get AI response
    result = await ai_service.chat(
        messages=messages,
        model=request.model,
        temperature=request.temperature,
        max_tokens=request.max_tokens
    )
    
    if not result["success"]:
        return {**result, "chat_id": chat_id}
    
    # Save AI response
    ai_message = Message(
        chat_id=chat_id,
        role="assistant",
        content=result["response"]
    )
    db.add(ai_message)
    
    # Update chat timestamp
    chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if chat:
        db.commit()
        db.refresh(chat)
    
    db.commit()
    
    return {**result, "chat_id": chat_id}
