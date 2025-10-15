#!/bin/bash

# AhFai Production 1 Startup Script
# This script sets up and starts the entire application

set -e

echo "🚀 Starting AhFai Production 1..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

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

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

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

if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Application is healthy${NC}"
else
    echo -e "${YELLOW}⚠️  Application may still be starting...${NC}"
fi

echo ""
echo -e "${GREEN}🎉 AhFai is running!${NC}"
echo ""
echo "📱 Access the application:"
echo "   http://localhost:3000"
echo ""
echo "📊 View logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Stop the application:"
echo "   docker-compose down"
echo ""
