#!/bin/bash

# AhFai Production 2 Health Check Script
# Comprehensive health monitoring for all services

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🏥 AhFai Health Check${NC}"
echo "================================"
echo ""

# Track overall health
HEALTHY=true

# Check Docker
echo -n "Docker: "
if docker info > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Running${NC}"
else
    echo -e "${RED}❌ Not running${NC}"
    HEALTHY=false
fi

# Check containers
echo ""
echo "Containers:"
echo "----------"

containers=("postgres" "ollama" "backend" "frontend")
for container in "${containers[@]}"; do
    echo -n "  $container: "
    if docker-compose ps | grep -q "$container.*Up"; then
        echo -e "${GREEN}✅ Running${NC}"
    else
        echo -e "${RED}❌ Not running${NC}"
        HEALTHY=false
    fi
done

# Check PostgreSQL
echo ""
echo -n "PostgreSQL Connection: "
if docker-compose exec -T postgres pg_isready -U ahfai > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Connected${NC}"
else
    echo -e "${RED}❌ Connection failed${NC}"
    HEALTHY=false
fi

# Check Backend API
echo -n "Backend API: "
if curl -f http://localhost:8000/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Healthy${NC}"
else
    echo -e "${RED}❌ Unhealthy${NC}"
    HEALTHY=false
fi

# Check Frontend
echo -n "Frontend: "
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Accessible${NC}"
else
    echo -e "${RED}❌ Not accessible${NC}"
    HEALTHY=false
fi

# Check Ollama
echo -n "Ollama Service: "
if curl -f http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Running${NC}"
    
    # Check if model exists
    echo -n "AI Model (llama3.1:8b): "
    if docker-compose exec -T ollama ollama list | grep -q "llama3.1:8b"; then
        echo -e "${GREEN}✅ Available${NC}"
    else
        echo -e "${YELLOW}⚠️  Not found${NC}"
        echo "  Run: docker-compose exec ollama ollama pull llama3.1:8b"
    fi
else
    echo -e "${RED}❌ Not running${NC}"
    HEALTHY=false
fi

# Check disk space
echo ""
echo "Resources:"
echo "----------"
echo -n "Disk Space: "
DISK_USAGE=$(df -h . | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -lt 80 ]; then
    echo -e "${GREEN}✅ ${DISK_USAGE}% used${NC}"
elif [ "$DISK_USAGE" -lt 90 ]; then
    echo -e "${YELLOW}⚠️  ${DISK_USAGE}% used${NC}"
else
    echo -e "${RED}❌ ${DISK_USAGE}% used (critical)${NC}"
    HEALTHY=false
fi

# Check memory
echo -n "Memory: "
if command -v free > /dev/null 2>&1; then
    MEM_USAGE=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100}')
    if [ "$MEM_USAGE" -lt 80 ]; then
        echo -e "${GREEN}✅ ${MEM_USAGE}% used${NC}"
    elif [ "$MEM_USAGE" -lt 90 ]; then
        echo -e "${YELLOW}⚠️  ${MEM_USAGE}% used${NC}"
    else
        echo -e "${RED}❌ ${MEM_USAGE}% used (critical)${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Cannot check (free command not available)${NC}"
fi

# Database size
echo -n "Database Size: "
DB_SIZE=$(docker-compose exec -T postgres psql -U ahfai -d ahfai -t -c "SELECT pg_size_pretty(pg_database_size('ahfai'));" 2>/dev/null | xargs)
if [ -n "$DB_SIZE" ]; then
    echo -e "${GREEN}✅ $DB_SIZE${NC}"
else
    echo -e "${YELLOW}⚠️  Cannot check${NC}"
fi

# API Response Time
echo ""
echo "Performance:"
echo "------------"
echo -n "Backend Response Time: "
RESPONSE_TIME=$(curl -o /dev/null -s -w '%{time_total}' http://localhost:8000/health 2>/dev/null || echo "0")
if (( $(echo "$RESPONSE_TIME < 0.5" | bc -l) )); then
    echo -e "${GREEN}✅ ${RESPONSE_TIME}s${NC}"
elif (( $(echo "$RESPONSE_TIME < 1.0" | bc -l) )); then
    echo -e "${YELLOW}⚠️  ${RESPONSE_TIME}s${NC}"
else
    echo -e "${RED}❌ ${RESPONSE_TIME}s (slow)${NC}"
fi

# Overall status
echo ""
echo "================================"
if [ "$HEALTHY" = true ]; then
    echo -e "${GREEN}✅ All systems healthy${NC}"
    exit 0
else
    echo -e "${RED}❌ Some systems unhealthy${NC}"
    echo ""
    echo "Troubleshooting:"
    echo "  - Check logs: docker-compose logs -f"
    echo "  - Restart services: docker-compose restart"
    echo "  - Full restart: docker-compose down && docker-compose up -d"
    exit 1
fi
