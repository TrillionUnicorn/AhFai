"""Application configuration."""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings."""
    
    # Database
    DATABASE_URL: str = "postgresql://ahfai:ahfai_password@localhost:5432/ahfai"
    
    # JWT
    SECRET_KEY: str = "your-secret-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 43200  # 30 days
    
    # Ollama
    OLLAMA_HOST: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "llama3.1:8b"
    
    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001"
    ]
    
    # Environment
    ENVIRONMENT: str = "development"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
