"""AI service for Ollama integration."""
from typing import List, Dict, Optional
import ollama
from app.config import settings


class AIService:
    """AI service wrapper for Ollama."""
    
    def __init__(self):
        self.client = ollama.Client(host=settings.OLLAMA_HOST)
        self.default_model = settings.OLLAMA_MODEL
    
    async def is_available(self) -> bool:
        """Check if Ollama service is available."""
        try:
            self.client.list()
            return True
        except Exception:
            return False
    
    async def get_models(self) -> List[str]:
        """Get list of available models."""
        try:
            response = self.client.list()
            return [model['name'] for model in response['models']]
        except Exception:
            return []
    
    async def is_model_available(self, model: str) -> bool:
        """Check if a specific model is available."""
        models = await self.get_models()
        return any(model in m for m in models)
    
    async def ensure_model(self, model: str) -> bool:
        """Ensure a model is available, pull if necessary."""
        try:
            if await self.is_model_available(model):
                return True
            
            # Try to pull the model
            self.client.pull(model)
            return True
        except Exception:
            return False
    
    async def generate(
        self,
        prompt: str,
        system: Optional[str] = None,
        model: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: int = 2048
    ) -> Dict[str, any]:
        """Generate a response from the AI."""
        try:
            model_name = model or self.default_model
            
            # Ensure model is available
            if not await self.ensure_model(model_name):
                # Try fallback model
                fallback = "llama3.1:7b"
                if not await self.ensure_model(fallback):
                    return {
                        "success": False,
                        "error": "No AI models available. Please install Ollama and pull a model."
                    }
                model_name = fallback
            
            # Generate response
            response = self.client.generate(
                model=model_name,
                prompt=prompt,
                system=system,
                options={
                    "temperature": temperature,
                    "num_predict": max_tokens
                }
            )
            
            return {
                "success": True,
                "response": response['response']
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    async def chat(
        self,
        messages: List[Dict[str, str]],
        model: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: int = 2048
    ) -> Dict[str, any]:
        """Chat with the AI using conversation history."""
        try:
            model_name = model or self.default_model
            
            # Ensure model is available
            if not await self.ensure_model(model_name):
                fallback = "llama3.1:7b"
                if not await self.ensure_model(fallback):
                    return {
                        "success": False,
                        "error": "No AI models available. Please install Ollama and pull a model."
                    }
                model_name = fallback
            
            # Chat with AI
            response = self.client.chat(
                model=model_name,
                messages=messages,
                options={
                    "temperature": temperature,
                    "num_predict": max_tokens
                }
            )
            
            return {
                "success": True,
                "response": response['message']['content']
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    async def get_status(self) -> Dict[str, any]:
        """Get AI service status."""
        try:
            available = await self.is_available()
            if not available:
                return {
                    "available": False,
                    "models": [],
                    "current_model": self.default_model,
                    "error": "Ollama service not available"
                }
            
            models = await self.get_models()
            return {
                "available": True,
                "models": models,
                "current_model": self.default_model
            }
        except Exception as e:
            return {
                "available": False,
                "models": [],
                "current_model": self.default_model,
                "error": str(e)
            }


# Singleton instance
ai_service = AIService()
