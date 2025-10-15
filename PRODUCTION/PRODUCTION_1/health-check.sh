#!/bin/bash

# AhFai Production 1 Health Check Script

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

containers=("app" "ollama")
for container in "${containers[@]}"; do
    echo -n "  $container: "
    if docker-compose ps | grep -q "$container.*Up"; then
        echo -e "${GREEN}✅ Running${NC}"
    else
        echo -e "${RED}❌ Not running${NC}"
        HEALTHY=false
    fi
done

# Check Application
echo ""
echo -n "Application: "
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

# Database size
echo -n "Database Size: "
if [ -f "db/ahfai.db" ]; then
    DB_SIZE=$(du -h db/ahfai.db | cut -f1)
    echo -e "${GREEN}✅ $DB_SIZE${NC}"
else
    echo -e "${YELLOW}⚠️  Database not found${NC}"
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
    echo "  - Restart: docker-compose restart"
    exit 1
fi
