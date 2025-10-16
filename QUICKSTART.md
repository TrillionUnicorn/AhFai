# ⚡ Quick Start Guide

Get AhFai running in 5 minutes!

## 🎯 Choose Your Version

### Option 1: PRODUCTION_1 (Recommended for Quick Start)
**Best for**: Quick setup, testing, small deployments

### Option 2: PRODUCTION_2 (Recommended for Production)
**Best for**: Enterprise, scalability, production deployments

Not sure? See [COMPARISON.md](PRODUCTION/COMPARISON.md)

---

## 🚀 PRODUCTION_1 Quick Start

### Prerequisites
- Docker installed
- 4GB+ RAM
- 10GB+ free disk space

### 3-Step Setup

#### Step 1: Clone Repository
```bash
git clone https://github.com/TrillionUnicorn/AhFai.git
cd AhFai/PRODUCTION/PRODUCTION_1
```

#### Step 2: Start Application
```bash
./start.sh
```

That's it! The script will:
- ✅ Check Docker
- ✅ Start services
- ✅ Initialize database
- ✅ Download AI model
- ✅ Run health checks

#### Step 3: Access Application
Open your browser to:
- **Application**: http://localhost:3000
- **Health Check**: Run `./health-check.sh`

### First Steps
1. **Register**: Create your account
2. **Chat**: Try the AI chat
3. **Notes**: Create your first note
4. **Reminders**: Set a reminder
5. **Explore**: Check out all features!

---

## 🚀 PRODUCTION_2 Quick Start

### Prerequisites
- Docker installed
- 8GB+ RAM
- 20GB+ free disk space

### 4-Step Setup

#### Step 1: Clone Repository
```bash
git clone https://github.com/TrillionUnicorn/AhFai.git
cd AhFai/PRODUCTION/PRODUCTION_2
```

#### Step 2: Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and set:
```env
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://ahfai:ahfai@postgres:5432/ahfai
NEXT_PUBLIC_API_URL=http://localhost:8000
```

#### Step 3: Start Application
```bash
./start.sh
```

The script will:
- ✅ Check Docker
- ✅ Validate configuration
- ✅ Start all services
- ✅ Initialize database
- ✅ Download AI model
- ✅ Run health checks

#### Step 4: Access Application
Open your browser to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/api/docs
- **Health Check**: Run `./health-check.sh`

### First Steps
1. **Register**: Create your account
2. **Explore API**: Check http://localhost:8000/api/docs
3. **Chat**: Try the AI chat
4. **Notes**: Create your first note
5. **Reminders**: Set a reminder

---

## 🔧 Common Issues & Solutions

### Docker Not Running
```bash
# Start Docker Desktop (Windows/Mac)
# Or start Docker service (Linux)
sudo systemctl start docker
```

### Port Already in Use
```bash
# PRODUCTION_1: Change port in vite.config.ts
# PRODUCTION_2: Change ports in docker-compose.yml
```

### Ollama Model Not Found
```bash
# Pull the model manually
docker-compose exec ollama ollama pull llama3.1:8b
```

### Database Connection Failed
```bash
# PRODUCTION_1: Reset database
rm -rf db/ahfai.db*
npm run db:push

# PRODUCTION_2: Check .env file
cat .env | grep DATABASE_URL
```

### Application Won't Start
```bash
# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Full restart
docker-compose down
docker-compose up -d
```

---

## 📚 Next Steps

### Learn More
- **[README.md](README.md)** - Full project overview
- **[PRODUCTION/PROJECT_OVERVIEW.md](PRODUCTION/PROJECT_OVERVIEW.md)** - Technical details
- **[FAQ.md](FAQ.md)** - Frequently asked questions
- **[SUPPORT.md](SUPPORT.md)** - Get help

### Explore Features
- **AI Chat** - Intelligent conversations
- **Notes** - Organize your thoughts
- **Reminders** - Never forget important tasks
- **Profile** - Customize your experience
- **Data Export** - Export your data anytime

### Customize
- **Change AI Model** - Use different Ollama models
- **Adjust Settings** - Configure to your needs
- **Add Features** - Contribute to the project

### Deploy to Production
- **[DEPLOYMENT_CHECKLIST.md](PRODUCTION/DEPLOYMENT_CHECKLIST.md)** - Pre-deployment checklist
- **[MAINTENANCE_GUIDE.md](PRODUCTION/MAINTENANCE_GUIDE.md)** - Maintenance procedures
- **[SECURITY.md](SECURITY.md)** - Security best practices

---

## 🎓 Video Tutorials

Coming soon! Subscribe to our YouTube channel.

---

## 💡 Tips & Tricks

### Performance Optimization
- Use SSD storage for better performance
- Allocate more RAM to Docker (8GB+ recommended)
- Use smaller AI models for faster responses

### Privacy Tips
- Regularly export your data
- Use strong passwords
- Enable 2FA (coming soon)
- Review privacy settings

### Productivity Hacks
- Use keyboard shortcuts
- Create note templates
- Set recurring reminders
- Organize with tags (coming soon)

---

## 🤝 Get Involved

### Join the Community
- **GitHub**: Star the repository
- **Discussions**: Ask questions
- **Discord**: Join our community (coming soon)
- **Contribute**: See [CONTRIBUTING.md](CONTRIBUTING.md)

### Share Feedback
- **Bug Reports**: Use our [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
- **Feature Requests**: Use our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
- **General Feedback**: Email hello@ahfai.com

---

## 📞 Need Help?

- **Documentation**: Check [SUPPORT.md](SUPPORT.md)
- **FAQ**: See [FAQ.md](FAQ.md)
- **Email**: hello@ahfai.com
- **GitHub**: Create an issue

---

## ✅ Quick Reference

### PRODUCTION_1 Commands
```bash
# Start
./start.sh

# Health check
./health-check.sh

# View logs
docker-compose logs -f

# Stop
docker-compose down

# Restart
docker-compose restart
```

### PRODUCTION_2 Commands
```bash
# Start
./start.sh

# Health check
./health-check.sh

# View logs
docker-compose logs -f

# Stop
docker-compose down

# Restart
docker-compose restart

# View API docs
open http://localhost:8000/api/docs
```

### Useful Docker Commands
```bash
# View running containers
docker-compose ps

# View container stats
docker stats

# Clean up
docker system prune -a

# Rebuild
docker-compose up -d --build
```

---

**Congratulations! You're now running AhFai!** 🎉

🤖 **Your AI. Your Privacy. Your Quick Start.**
