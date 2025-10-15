#!/bin/bash

# AhFai Production 2 Startup Script
# This script sets up and starts the entire application

set -e

echo "🚀 Starting AhFai Production 2..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found. Creating from .env.example...${NC}"
    cp .env.example .env
    echo -e "${RED}❌ Please edit .env file with your configuration and run again.${NC}"
    exit 1
fi

# Load environment variables
source .env

# Check required variables
if [ -z "$SECRET_KEY" ] || [ "$SECRET_KEY" == "your-secret-key-change-this-in-production" ]; then
    echo -e "${RED}❌ Please set a strong SECRET_KEY in .env file${NC}"
    exit 1
fi

if [ -z "$POSTGRES_PASSWORD" ]; then
    echo -e "${RED}❌ Please set POSTGRES_PASSWORD in .env file${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Environment variables loaded${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker is running${NC}"

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Build and start services
echo "🏗️  Building and starting services..."
docker-compose up -d --build

# Wait for services to be healthy
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check PostgreSQL
echo "🔍 Checking PostgreSQL..."
until docker-compose exec -T postgres pg_isready -U ${POSTGRES_USER:-ahfai} > /dev/null 2>&1; do
    echo "   Waiting for PostgreSQL..."
    sleep 2
done
echo -e "${GREEN}✅ PostgreSQL is ready${NC}"

# Run database migrations
echo "🗄️  Running database migrations..."
docker-compose exec -T backend alembic upgrade head
echo -e "${GREEN}✅ Database migrations complete${NC}"

# Check if Ollama model exists
echo "🤖 Checking AI model..."
if ! docker-compose exec -T ollama ollama list | grep -q "llama3.1:8b"; then
    echo -e "${YELLOW}⚠️  AI model not found. Pulling llama3.1:8b (this may take a while)...${NC}"
    docker-compose exec ollama ollama pull llama3.1:8b
    echo -e "${GREEN}✅ AI model downloaded${NC}"
else
    echo -e "${GREEN}✅ AI model already exists${NC}"
fi

# Check service health
echo "🏥 Checking service health..."

# Check backend
if curl -f http://localhost:8000/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend is healthy${NC}"
else
    echo -e "${RED}❌ Backend health check failed${NC}"
fi

# Check frontend
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend is healthy${NC}"
else
    echo -e "${RED}❌ Frontend health check failed${NC}"
fi

echo ""
echo -e "${GREEN}🎉 AhFai is running!${NC}"
echo ""
echo "📱 Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   API Docs: http://localhost:8000/api/docs"
echo ""
echo "📊 View logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Stop the application:"
echo "   docker-compose down"
echo ""
