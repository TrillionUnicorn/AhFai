# Support

Need help with AhFai? We're here to assist you!

## 📚 Documentation

Before reaching out, please check our comprehensive documentation:

- **[README.md](README.md)** - Project overview and quick start
- **[PRODUCTION/PROJECT_OVERVIEW.md](PRODUCTION/PROJECT_OVERVIEW.md)** - Technical details
- **[PRODUCTION/DEPLOYMENT_CHECKLIST.md](PRODUCTION/DEPLOYMENT_CHECKLIST.md)** - Deployment guide
- **[PRODUCTION/MAINTENANCE_GUIDE.md](PRODUCTION/MAINTENANCE_GUIDE.md)** - Maintenance procedures
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute
- **[SECURITY.md](SECURITY.md)** - Security policy

## 🐛 Bug Reports

Found a bug? Please help us fix it!

1. **Check existing issues** - Search [GitHub Issues](https://github.com/TrillionUnicorn/AhFai/issues) first
2. **Create a bug report** - Use our [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
3. **Provide details** - Include steps to reproduce, expected behavior, and screenshots
4. **Be patient** - We'll respond as soon as possible

**Important**: Do NOT include sensitive data in bug reports!

## 💡 Feature Requests

Have an idea for a new feature?

1. **Check existing requests** - Search [GitHub Issues](https://github.com/TrillionUnicorn/AhFai/issues)
2. **Create a feature request** - Use our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
3. **Explain the use case** - Help us understand why this feature is needed
4. **Discuss** - Engage with the community in the discussion

## ❓ Questions & Discussions

Have questions or want to discuss ideas?

- **GitHub Discussions** - [Start a discussion](https://github.com/TrillionUnicorn/AhFai/discussions)
- **Discord** - Join our community (coming soon)
- **Email** - hello@ahfai.com

## 🚀 Getting Started Help

### PRODUCTION_1 (SvelteKit + SQLite)

**Quick Start**:
```bash
cd PRODUCTION/PRODUCTION_1
./start.sh
```

**Common Issues**:
- **Port already in use**: Change port in `vite.config.ts`
- **Database errors**: Run `npm run db:push` to reset database
- **Ollama not found**: Install Ollama from https://ollama.ai

**Documentation**: See [PRODUCTION/PRODUCTION_1/README.md](PRODUCTION/PRODUCTION_1/README.md)

### PRODUCTION_2 (Next.js + FastAPI + PostgreSQL)

**Quick Start**:
```bash
cd PRODUCTION/PRODUCTION_2
cp .env.example .env
# Edit .env with your configuration
./start.sh
```

**Common Issues**:
- **Docker not running**: Start Docker Desktop
- **Port conflicts**: Change ports in docker-compose.yml
- **Database connection failed**: Check PostgreSQL credentials in .env
- **Ollama not found**: Install Ollama from https://ollama.ai

**Documentation**: See [PRODUCTION/PRODUCTION_2/README.md](PRODUCTION/PRODUCTION_2/README.md)

## 🔧 Troubleshooting

### General Issues

#### Application won't start
```bash
# Check Docker is running
docker info

# Restart services
docker-compose restart

# View logs
docker-compose logs -f
```

#### Database issues
```bash
# PRODUCTION_1: Reset database
cd PRODUCTION/PRODUCTION_1
rm -rf db/ahfai.db*
npm run db:push

# PRODUCTION_2: Reset database
cd PRODUCTION/PRODUCTION_2
docker-compose down -v
docker-compose up -d
```

#### AI not responding
```bash
# Check Ollama is running
curl http://localhost:11434/api/tags

# Pull AI model
docker-compose exec ollama ollama pull llama3.1:8b

# Restart Ollama
docker-compose restart ollama
```

### Platform-Specific Issues

#### Windows
- Use PowerShell or Git Bash for scripts
- Ensure Docker Desktop is running
- Check Windows Defender isn't blocking ports

#### macOS
- Grant Docker Desktop necessary permissions
- Check firewall settings
- Use Terminal for scripts

#### Linux
- Ensure Docker is installed and running
- Add user to docker group: `sudo usermod -aG docker $USER`
- Check SELinux/AppArmor settings

## 📞 Contact Support

### For General Questions
- **Email**: hello@ahfai.com
- **GitHub Discussions**: [Ask a question](https://github.com/TrillionUnicorn/AhFai/discussions)

### For Security Issues
- **Email**: security@ahfai.com
- **See**: [SECURITY.md](SECURITY.md) for reporting procedures

**DO NOT** report security vulnerabilities in public issues!

### For Business Inquiries
- **Email**: business@ahfai.com
- **LinkedIn**: [AhFai](https://linkedin.com/company/ahfai)

## 🕐 Response Times

We aim to respond to:
- **Critical bugs**: Within 24 hours
- **General bugs**: Within 3-5 business days
- **Feature requests**: Within 1 week
- **Questions**: Within 2-3 business days
- **Security issues**: Within 48 hours

## 🤝 Community Support

Our community is here to help!

- **GitHub Discussions** - Ask questions and share knowledge
- **Discord** - Real-time chat with other users (coming soon)
- **Stack Overflow** - Tag questions with `ahfai`

## 📖 Additional Resources

### Video Tutorials
- Coming soon!

### Blog Posts
- Coming soon!

### Case Studies
- Coming soon!

## 🌟 Premium Support

Need dedicated support? We offer premium support plans:

- **Priority Support** - Faster response times
- **Dedicated Support** - Assigned support engineer
- **Custom Development** - Tailored features and integrations
- **Training & Onboarding** - Team training sessions

Contact business@ahfai.com for details.

## 🙏 Thank You

Thank you for using AhFai! Your feedback helps us improve.

If you find AhFai helpful:
- ⭐ Star us on [GitHub](https://github.com/TrillionUnicorn/AhFai)
- 📢 Share with others
- 🤝 Contribute to the project
- 💬 Join our community

---

**Last Updated**: 2024-01-01

🤖 **Your AI. Your Privacy. Your Support.**
