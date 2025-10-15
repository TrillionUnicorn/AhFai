# PRODUCTION_2 Deployment Guide

Complete guide for deploying AhFai Production Version 2 to production.

## 📋 Prerequisites

- Docker and Docker Compose installed
- Domain name (optional, for production)
- SSL certificate (optional, for HTTPS)
- Minimum 2GB RAM, 2 CPU cores
- 20GB disk space

## 🚀 Quick Deployment

### 1. Clone and Configure

```bash
# Clone repository
git clone <repository-url>
cd PRODUCTION/PRODUCTION_2

# Copy environment file
cp .env.example .env

# Edit environment variables
nano .env
```

### 2. Update Environment Variables

```env
# Backend
DATABASE_URL=postgresql://ahfai:STRONG_PASSWORD@postgres:5432/ahfai
SECRET_KEY=GENERATE_STRONG_SECRET_KEY_HERE
OLLAMA_HOST=http://ollama:11434
ALLOWED_ORIGINS=https://yourdomain.com

# Frontend
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
```

### 3. Start Services

```bash
# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### 4. Initialize AI Model

```bash
# Pull AI model (this may take a while)
docker-compose exec ollama ollama pull llama3.1:8b

# Verify model is available
docker-compose exec ollama ollama list
```

### 5. Access Application

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- API Docs: `http://localhost:8000/api/docs`

## 🔒 Production Configuration

### Reverse Proxy (Nginx)

Create `/etc/nginx/sites-available/ahfai`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/ahfai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal is configured automatically
```

### Firewall Configuration

```bash
# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow SSH
sudo ufw allow 22/tcp

# Enable firewall
sudo ufw enable
```

## 📊 Monitoring

### Health Checks

```bash
# Check all services
docker-compose ps

# Check backend health
curl http://localhost:8000/health

# Check database
docker-compose exec postgres pg_isready -U ahfai

# Check Ollama
curl http://localhost:11434/api/tags
```

### Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
docker-compose logs -f ollama

# Last 100 lines
docker-compose logs --tail=100
```

### Resource Usage

```bash
# Container stats
docker stats

# Disk usage
docker system df

# Database size
docker-compose exec postgres psql -U ahfai -d ahfai -c "SELECT pg_size_pretty(pg_database_size('ahfai'));"
```

## 💾 Backup & Restore

### Database Backup

```bash
# Create backup
docker-compose exec postgres pg_dump -U ahfai ahfai > backup_$(date +%Y%m%d_%H%M%S).sql

# Automated daily backup (crontab)
0 2 * * * cd /path/to/PRODUCTION_2 && docker-compose exec -T postgres pg_dump -U ahfai ahfai > /backups/ahfai_$(date +\%Y\%m\%d).sql
```

### Database Restore

```bash
# Restore from backup
docker-compose exec -T postgres psql -U ahfai ahfai < backup.sql
```

### Full Backup

```bash
# Backup volumes
docker run --rm -v production_2_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_backup.tar.gz /data
docker run --rm -v production_2_ollama_data:/data -v $(pwd):/backup alpine tar czf /backup/ollama_backup.tar.gz /data
```

## 🔄 Updates & Maintenance

### Update Application

```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose up -d --build

# Check logs
docker-compose logs -f
```

### Database Migrations

```bash
# Run migrations
docker-compose exec backend alembic upgrade head

# Rollback migration
docker-compose exec backend alembic downgrade -1
```

### Update Dependencies

Backend:
```bash
cd backend
pip install -r requirements.txt --upgrade
pip freeze > requirements.txt
```

Frontend:
```bash
cd frontend
npm update
npm audit fix
```

## 🐛 Troubleshooting

### Backend Won't Start

```bash
# Check logs
docker-compose logs backend

# Check database connection
docker-compose exec backend python -c "from app.database import engine; print(engine.connect())"

# Restart service
docker-compose restart backend
```

### Frontend Won't Start

```bash
# Check logs
docker-compose logs frontend

# Rebuild
docker-compose up -d --build frontend
```

### Database Connection Issues

```bash
# Check PostgreSQL is running
docker-compose ps postgres

# Check connection
docker-compose exec postgres psql -U ahfai -d ahfai -c "SELECT 1;"

# Restart database
docker-compose restart postgres
```

### Ollama Not Responding

```bash
# Check Ollama status
docker-compose logs ollama

# Restart Ollama
docker-compose restart ollama

# Re-pull model
docker-compose exec ollama ollama pull llama3.1:8b
```

## 📈 Scaling

### Horizontal Scaling

For multiple instances:

1. Use external PostgreSQL database
2. Use load balancer (nginx, HAProxy)
3. Share Ollama service or use multiple instances
4. Use Redis for session storage (if needed)

### Vertical Scaling

Update `docker-compose.yml`:

```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G
```

## 🔐 Security Checklist

- [ ] Change default passwords
- [ ] Set strong SECRET_KEY
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set up firewall
- [ ] Enable rate limiting (nginx)
- [ ] Regular security updates
- [ ] Monitor logs
- [ ] Set up automated backups
- [ ] Restrict database access
- [ ] Use environment variables for secrets
- [ ] Enable Docker security features

## 📞 Support

For deployment issues:
- Check logs first
- Review this guide
- Check GitHub issues
- Contact support

---

**Last Updated:** 2024-01-01
