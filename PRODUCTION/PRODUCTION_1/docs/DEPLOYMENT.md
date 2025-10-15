# Deployment Guide

Complete guide for deploying AhFai to production.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Docker Deployment](#docker-deployment)
- [Manual Deployment](#manual-deployment)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Security Checklist](#security-checklist)
- [Monitoring](#monitoring)
- [Backup](#backup)

---

## Prerequisites

### Required
- Node.js 18+ (for manual deployment)
- Docker and Docker Compose (for Docker deployment)
- Ollama (for AI features)

### Recommended
- Reverse proxy (nginx, Caddy)
- SSL certificate
- Process manager (PM2 for manual deployment)

---

## Docker Deployment

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PRODUCTION/PRODUCTION_1
   ```

2. **Build and start services**
   ```bash
   docker-compose up -d
   ```

3. **Pull AI model**
   ```bash
   docker-compose exec ollama ollama pull llama3.1:8b
   ```

4. **Access the application**
   Navigate to `http://localhost:3000`

### Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Rebuild after code changes
docker-compose up -d --build
```

### Production Docker Configuration

For production, update `docker-compose.yml`:

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - OLLAMA_HOST=http://ollama:11434
    volumes:
      - ./db:/app/db
    restart: always
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
```

---

## Manual Deployment

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh
```

### 2. Application Setup

```bash
# Clone repository
git clone <repository-url>
cd PRODUCTION/PRODUCTION_1

# Install dependencies
npm ci --production

# Set up environment
cp .env.example .env
nano .env  # Edit configuration

# Build application
npm run build

# Set up database
npm run db:push
```

### 3. Start with PM2

```bash
# Start application
pm2 start npm --name "ahfai" -- start

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot
pm2 startup
```

### 4. PM2 Commands

```bash
# View status
pm2 status

# View logs
pm2 logs ahfai

# Restart
pm2 restart ahfai

# Stop
pm2 stop ahfai

# Monitor
pm2 monit
```

---

## Environment Configuration

### Production Environment Variables

Create `.env` file:

```env
# Node Environment
NODE_ENV=production

# Server Configuration
PORT=3000

# Ollama Configuration
OLLAMA_HOST=http://localhost:11434

# Database Configuration
# Database will be at ./db/ahfai.db
```

### Security Considerations

1. **Never commit `.env` file**
2. **Use strong session secrets in production**
3. **Enable HTTPS in production**
4. **Set secure cookie flags**
5. **Configure CORS if needed**

---

## Database Setup

### Initial Setup

```bash
# Generate migrations
npm run db:generate

# Apply migrations
npm run db:push
```

### Database Location

- Development: `./db/ahfai.db`
- Docker: `/app/db/ahfai.db` (mounted volume)
- Production: Configure path in environment

### Database Backup

```bash
# Backup database
cp ./db/ahfai.db ./db/ahfai.db.backup

# Restore database
cp ./db/ahfai.db.backup ./db/ahfai.db
```

---

## Reverse Proxy Setup

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### SSL with Certbot

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal is set up automatically
```

---

## Security Checklist

### Before Production Deployment

- [ ] Change default passwords
- [ ] Enable HTTPS
- [ ] Configure secure cookies
- [ ] Set up firewall rules
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Review security headers
- [ ] Test authentication flows
- [ ] Verify data isolation
- [ ] Check input validation
- [ ] Review error messages (no sensitive data)

### Firewall Configuration

```bash
# Allow SSH
sudo ufw allow 22

# Allow HTTP/HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Enable firewall
sudo ufw enable
```

---

## Monitoring

### Application Monitoring

```bash
# PM2 monitoring
pm2 monit

# View logs
pm2 logs ahfai --lines 100

# Check status
pm2 status
```

### Docker Monitoring

```bash
# View container stats
docker stats

# View logs
docker-compose logs -f app

# Check health
docker-compose ps
```

### System Monitoring

```bash
# CPU and memory
htop

# Disk usage
df -h

# Database size
du -h ./db/ahfai.db
```

---

## Backup Strategy

### Automated Backup Script

Create `backup.sh`:

```bash
#!/bin/bash

# Configuration
BACKUP_DIR="/path/to/backups"
DB_PATH="./db/ahfai.db"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
cp $DB_PATH "$BACKUP_DIR/ahfai_$DATE.db"

# Keep only last 30 days
find $BACKUP_DIR -name "ahfai_*.db" -mtime +30 -delete

echo "Backup completed: ahfai_$DATE.db"
```

### Cron Job for Daily Backups

```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * /path/to/backup.sh
```

---

## Scaling Considerations

### Horizontal Scaling

For multiple instances:

1. Use external database (PostgreSQL)
2. Implement session store (Redis)
3. Use load balancer
4. Share file storage

### Vertical Scaling

- Increase server resources
- Optimize database queries
- Enable caching
- Use CDN for static assets

---

## Troubleshooting

### Application Won't Start

```bash
# Check logs
pm2 logs ahfai

# Check port availability
sudo lsof -i :3000

# Check environment
cat .env
```

### Database Issues

```bash
# Check database file
ls -lh ./db/ahfai.db

# Check permissions
chmod 644 ./db/ahfai.db

# Regenerate database
rm ./db/ahfai.db
npm run db:push
```

### Ollama Connection Issues

```bash
# Check Ollama status
systemctl status ollama

# Test Ollama
curl http://localhost:11434/api/tags

# Restart Ollama
systemctl restart ollama
```

---

## Performance Optimization

### Application Level

1. Enable production mode
2. Use caching headers
3. Minimize database queries
4. Optimize images
5. Enable compression

### Server Level

1. Use HTTP/2
2. Enable gzip compression
3. Configure caching
4. Use CDN
5. Optimize database

---

## Maintenance

### Regular Tasks

- **Daily**: Check logs, monitor resources
- **Weekly**: Review backups, check disk space
- **Monthly**: Update dependencies, security patches
- **Quarterly**: Review and optimize database

### Update Procedure

```bash
# Backup first
./backup.sh

# Pull latest code
git pull

# Install dependencies
npm ci --production

# Build
npm run build

# Restart
pm2 restart ahfai
```

---

## Support

For deployment issues:
- Check logs first
- Review this guide
- Check GitHub issues
- Contact support

---

**Last Updated:** 2024-01-01
