# AhFai Maintenance Guide

Complete guide for maintaining both production versions.

## 📋 Daily Maintenance Tasks

### Health Checks

**PRODUCTION_1:**
```bash
cd PRODUCTION/PRODUCTION_1
./health-check.sh
```

**PRODUCTION_2:**
```bash
cd PRODUCTION/PRODUCTION_2
./health-check.sh
```

### Log Monitoring

```bash
# View all logs
docker-compose logs -f

# View specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Last 100 lines
docker-compose logs --tail=100
```

### Resource Monitoring

```bash
# Container stats
docker stats

# Disk usage
docker system df

# Clean up unused resources
docker system prune -a
```

## 🔄 Weekly Maintenance Tasks

### Backup Database

**PRODUCTION_1 (SQLite):**
```bash
cd PRODUCTION/PRODUCTION_1
cp db/ahfai.db db/backup_$(date +%Y%m%d).db
```

**PRODUCTION_2 (PostgreSQL):**
```bash
cd PRODUCTION/PRODUCTION_2
docker-compose exec postgres pg_dump -U ahfai ahfai > backup_$(date +%Y%m%d).sql
```

### Check Disk Space

```bash
df -h
du -sh PRODUCTION/*/
```

### Review Logs for Errors

```bash
docker-compose logs --since 7d | grep -i error
docker-compose logs --since 7d | grep -i warning
```

## 📅 Monthly Maintenance Tasks

### Update Dependencies

**PRODUCTION_1:**
```bash
cd PRODUCTION/PRODUCTION_1
npm update
npm audit fix
npm run build
```

**PRODUCTION_2 Frontend:**
```bash
cd PRODUCTION/PRODUCTION_2/frontend
npm update
npm audit fix
npm run build
```

**PRODUCTION_2 Backend:**
```bash
cd PRODUCTION/PRODUCTION_2/backend
pip list --outdated
pip install -r requirements.txt --upgrade
```

### Database Optimization

**PRODUCTION_1:**
```bash
# SQLite vacuum
sqlite3 db/ahfai.db "VACUUM;"
```

**PRODUCTION_2:**
```bash
# PostgreSQL vacuum
docker-compose exec postgres psql -U ahfai -d ahfai -c "VACUUM ANALYZE;"
```

### Security Updates

```bash
# Update base images
docker-compose pull
docker-compose up -d --build
```

## 🔧 Troubleshooting

### Application Won't Start

```bash
# Check logs
docker-compose logs

# Restart services
docker-compose restart

# Full restart
docker-compose down
docker-compose up -d
```

### Database Issues

**PRODUCTION_1:**
```bash
# Check database file
ls -lh db/ahfai.db

# Restore from backup
cp db/backup_YYYYMMDD.db db/ahfai.db
```

**PRODUCTION_2:**
```bash
# Check connection
docker-compose exec postgres psql -U ahfai -d ahfai -c "SELECT 1;"

# Restore from backup
docker-compose exec -T postgres psql -U ahfai ahfai < backup_YYYYMMDD.sql
```

### High Memory Usage

```bash
# Check container memory
docker stats

# Restart specific service
docker-compose restart backend

# Limit memory in docker-compose.yml
deploy:
  resources:
    limits:
      memory: 1G
```

### Slow Performance

```bash
# Check database size
# PRODUCTION_1
du -h db/ahfai.db

# PRODUCTION_2
docker-compose exec postgres psql -U ahfai -d ahfai -c "SELECT pg_size_pretty(pg_database_size('ahfai'));"

# Optimize database
# See Database Optimization section above
```

## 📊 Monitoring Metrics

### Key Metrics to Track

1. **Response Time**
   - Frontend load time
   - API response time
   - Database query time

2. **Resource Usage**
   - CPU usage
   - Memory usage
   - Disk space
   - Network bandwidth

3. **Application Health**
   - Uptime
   - Error rate
   - Request rate
   - Active users

4. **Database Health**
   - Connection count
   - Query performance
   - Database size
   - Index usage

### Setting Up Monitoring

**Basic Monitoring Script:**
```bash
#!/bin/bash
# monitor.sh

while true; do
    echo "=== $(date) ==="
    
    # Check health
    ./health-check.sh
    
    # Log metrics
    docker stats --no-stream >> metrics.log
    
    sleep 300  # Every 5 minutes
done
```

## 🔐 Security Maintenance

### Regular Security Tasks

1. **Update Passwords**
   - Change database passwords quarterly
   - Update SECRET_KEY annually

2. **Review Access Logs**
   ```bash
   docker-compose logs | grep -i "401\|403\|404"
   ```

3. **Check for Vulnerabilities**
   ```bash
   # PRODUCTION_1
   npm audit
   
   # PRODUCTION_2
   npm audit  # Frontend
   pip-audit  # Backend
   ```

4. **Update SSL Certificates**
   ```bash
   sudo certbot renew
   ```

## 💾 Backup Strategy

### Automated Backup Script

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backups/ahfai"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# PRODUCTION_1
cp PRODUCTION/PRODUCTION_1/db/ahfai.db $BACKUP_DIR/p1_$DATE.db

# PRODUCTION_2
docker-compose -f PRODUCTION/PRODUCTION_2/docker-compose.yml exec -T postgres \
  pg_dump -U ahfai ahfai > $BACKUP_DIR/p2_$DATE.sql

# Keep only last 30 days
find $BACKUP_DIR -name "*.db" -mtime +30 -delete
find $BACKUP_DIR -name "*.sql" -mtime +30 -delete

echo "Backup completed: $DATE"
```

### Cron Job Setup

```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * /path/to/backup.sh >> /var/log/ahfai-backup.log 2>&1
```

## 🔄 Update Procedures

### Application Updates

1. **Backup First**
   ```bash
   ./backup.sh
   ```

2. **Pull Latest Code**
   ```bash
   git pull origin main
   ```

3. **Update Dependencies**
   ```bash
   npm install  # or pip install
   ```

4. **Run Migrations**
   ```bash
   # PRODUCTION_1
   npm run db:push
   
   # PRODUCTION_2
   docker-compose exec backend alembic upgrade head
   ```

5. **Rebuild and Restart**
   ```bash
   docker-compose up -d --build
   ```

6. **Verify Health**
   ```bash
   ./health-check.sh
   ```

### Rollback Procedure

```bash
# Stop services
docker-compose down

# Restore database
# PRODUCTION_1
cp db/backup_YYYYMMDD.db db/ahfai.db

# PRODUCTION_2
docker-compose exec -T postgres psql -U ahfai ahfai < backup_YYYYMMDD.sql

# Checkout previous version
git checkout <previous-commit>

# Rebuild
docker-compose up -d --build
```

## 📈 Performance Optimization

### Database Optimization

**PRODUCTION_1:**
```bash
# Analyze database
sqlite3 db/ahfai.db "ANALYZE;"

# Check indexes
sqlite3 db/ahfai.db ".schema"
```

**PRODUCTION_2:**
```bash
# Analyze tables
docker-compose exec postgres psql -U ahfai -d ahfai -c "ANALYZE;"

# Check slow queries
docker-compose exec postgres psql -U ahfai -d ahfai -c "
SELECT query, calls, total_time, mean_time 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;"
```

### Application Optimization

1. **Enable Caching**
2. **Optimize Images**
3. **Minify Assets**
4. **Use CDN**
5. **Enable Compression**

## 🚨 Incident Response

### Service Down

1. Check health: `./health-check.sh`
2. Check logs: `docker-compose logs`
3. Restart service: `docker-compose restart`
4. If persists: Full restart
5. Check backups if data corruption

### Data Loss

1. Stop services immediately
2. Restore from latest backup
3. Verify data integrity
4. Restart services
5. Document incident

### Security Breach

1. Isolate affected systems
2. Change all passwords
3. Review access logs
4. Restore from clean backup
5. Update security measures
6. Document and report

## 📞 Support Contacts

- **Technical Issues**: Check GitHub issues
- **Security Issues**: Report immediately
- **General Questions**: Review documentation

---

**Last Updated:** 2024-01-01
