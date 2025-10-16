# Frequently Asked Questions (FAQ)

## 🤔 General Questions

### What is AhFai?
AhFai is a privacy-first AI personal assistant that processes everything locally on your device. Unlike cloud-based assistants, your data never leaves your control.

### Why should I use AhFai instead of ChatGPT, Siri, or Alexa?
- **100% Privacy**: All processing happens on your device
- **No Data Collection**: We literally cannot access your data
- **Works Offline**: Full functionality without internet
- **Open Source**: Transparent and auditable code
- **No Subscription Required**: Free tier available forever

### Which version should I use?

**PRODUCTION_1 (SvelteKit + SQLite)**:
- ✅ Best for: Quick setup, small-medium deployments
- ✅ Simpler architecture
- ✅ Single database file
- ✅ Faster initial setup

**PRODUCTION_2 (Next.js + FastAPI + PostgreSQL)**:
- ✅ Best for: Enterprise deployments, scalability
- ✅ Microservices architecture
- ✅ Better for horizontal scaling
- ✅ More robust for large datasets

See [COMPARISON.md](PRODUCTION/COMPARISON.md) for detailed comparison.

### Is AhFai really free?
Yes! The core features are free forever. We offer premium tiers for advanced features:
- **Free**: Basic AI, notes, reminders
- **Privacy Pro ($9.99/mo)**: Advanced AI models, unlimited features
- **Business ($29.99/mo)**: Team collaboration
- **Enterprise ($99.99/mo)**: Custom deployment, SSO

See [OPEN_SOURCE_PRICING_STRATEGY.md](PRODUCTION/OPEN_SOURCE_PRICING_STRATEGY.md) for details.

## 🔒 Privacy & Security

### How does local processing work?
AhFai uses Ollama to run AI models directly on your device. Your conversations, notes, and data are stored in a local database that only you can access.

### Can you see my data?
No. Absolutely not. Your data is stored locally on your device. We have no servers collecting or storing your personal information.

### Is my data encrypted?
Yes. All data is encrypted at rest using industry-standard encryption. Your passwords are hashed using bcrypt with 12 rounds.

### What about GDPR/CCPA compliance?
Since we don't collect any data, we're automatically compliant with GDPR, CCPA, and other privacy regulations. Your data never leaves your device.

### Can I export my data?
Yes! You can export all your data in JSON format at any time from the settings page.

### What happens if I delete my account?
All your local data is permanently deleted. Since we don't have cloud backups, this action is irreversible.

## 🚀 Getting Started

### What are the system requirements?

**Minimum**:
- 4GB RAM
- 2 CPU cores
- 10GB free disk space
- Docker installed

**Recommended**:
- 8GB+ RAM
- 4+ CPU cores
- 20GB+ free disk space
- SSD storage

### How do I install AhFai?

**PRODUCTION_1**:
```bash
git clone https://github.com/TrillionUnicorn/AhFai.git
cd AhFai/PRODUCTION/PRODUCTION_1
./start.sh
```

**PRODUCTION_2**:
```bash
git clone https://github.com/TrillionUnicorn/AhFai.git
cd AhFai/PRODUCTION/PRODUCTION_2
cp .env.example .env
# Edit .env
./start.sh
```

### Do I need internet to use AhFai?
After initial setup and AI model download, AhFai works completely offline. You only need internet for:
- Initial installation
- Downloading AI models
- Software updates

### Which AI models are supported?
Currently supported:
- llama3.1:8b (recommended)
- llama2:7b
- mistral:7b
- codellama:7b

You can use any model supported by Ollama.

## 💻 Technical Questions

### What technologies does AhFai use?

**PRODUCTION_1**:
- SvelteKit (full-stack framework)
- SQLite (database)
- Drizzle ORM
- Ollama (local AI)
- Docker

**PRODUCTION_2**:
- Next.js 14 (frontend)
- FastAPI (backend)
- PostgreSQL (database)
- SQLAlchemy (ORM)
- Ollama (local AI)
- Docker + Nginx

### Can I use a different database?
Yes! The code is modular. You can adapt it to use:
- MySQL
- MariaDB
- MongoDB
- Any database supported by Drizzle/SQLAlchemy

### Can I deploy to the cloud?
Yes! While AhFai is designed for local use, you can deploy to:
- AWS
- Google Cloud
- Azure
- DigitalOcean
- Your own VPS

See [DEPLOYMENT.md](PRODUCTION/PRODUCTION_1/docs/DEPLOYMENT.md) for guides.

### How do I update AhFai?
```bash
git pull origin main
docker-compose down
docker-compose up -d --build
```

### Can I customize the AI model?
Yes! You can:
- Use different Ollama models
- Fine-tune models on your data (locally)
- Adjust model parameters
- Create custom prompts

## 🤝 Contributing

### How can I contribute?
See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines. You can:
- Fix bugs
- Add features
- Improve documentation
- Write tests
- Help other users

### I found a bug. What should I do?
1. Check if it's already reported in [GitHub Issues](https://github.com/TrillionUnicorn/AhFai/issues)
2. If not, create a new issue using our [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
3. Include steps to reproduce, expected behavior, and screenshots

### I have a feature idea. How do I suggest it?
Create a feature request using our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md).

### Do you accept pull requests?
Yes! We welcome contributions. Please:
1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Fork the repository
3. Create a feature branch
4. Make your changes
5. Submit a pull request

## 🔧 Troubleshooting

### The application won't start
```bash
# Check Docker is running
docker info

# Check logs
docker-compose logs -f

# Restart services
docker-compose restart
```

### AI responses are slow
- Ensure you have enough RAM (8GB+ recommended)
- Use a smaller AI model (llama2:7b instead of llama3.1:8b)
- Close other applications
- Check CPU usage

### Database connection failed
```bash
# PRODUCTION_1: Reset database
rm -rf db/ahfai.db*
npm run db:push

# PRODUCTION_2: Check .env file
cat .env | grep DATABASE_URL
```

### Port already in use
Change the port in:
- PRODUCTION_1: `vite.config.ts`
- PRODUCTION_2: `docker-compose.yml`

### Ollama not found
```bash
# Install Ollama
curl https://ollama.ai/install.sh | sh

# Or use Docker
docker-compose up -d ollama
```

## 📱 Platform Support

### Does AhFai work on mobile?
Currently, AhFai is a web application that works on mobile browsers. Native mobile apps are planned for Q3 2024.

### What browsers are supported?
- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser with JavaScript enabled

### Can I use AhFai on multiple devices?
Yes, but each device runs independently. Cloud sync is planned for future releases.

## 💰 Pricing & Business

### Is there a free trial?
The free tier is available forever - no trial needed!

### What payment methods do you accept?
- Credit/Debit cards
- PayPal
- Cryptocurrency (coming soon)

### Can I cancel anytime?
Yes! Cancel anytime with no penalties. Your data remains on your device.

### Do you offer discounts?
- **Students**: 50% off (with valid student ID)
- **Non-profits**: 50% off
- **Annual plans**: 20% off
- **Early adopters**: Special pricing (check website)

### Is there a refund policy?
Yes! 30-day money-back guarantee, no questions asked.

## 🌍 Community

### How can I get help?
- **GitHub Discussions**: Ask questions
- **Discord**: Real-time chat (coming soon)
- **Email**: hello@ahfai.com
- **Documentation**: Comprehensive guides

### Where can I follow updates?
- **GitHub**: Star the repository
- **Twitter**: @AhFai (coming soon)
- **LinkedIn**: AhFai Company Page
- **Blog**: ahfai.com/blog (coming soon)

### Can I use AhFai for commercial purposes?
Yes! AhFai is licensed under MIT License. You can use it for:
- Personal use
- Commercial use
- Modification
- Distribution

See [LICENSE](LICENSE) for details.

## 🔮 Future Plans

### What's on the roadmap?
See [ROADMAP.md](ROADMAP.md) for detailed plans:
- Mobile apps (Q3 2024)
- Advanced AI models (Q2 2024)
- Team collaboration (Q4 2024)
- AR/VR integration (Q1 2025)

### Will AhFai always be open source?
Yes! The core features will always be open source. Premium features may be proprietary but the foundation remains open.

### Can I request a feature?
Absolutely! Use our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md).

## 📞 Still Have Questions?

- **Email**: hello@ahfai.com
- **GitHub Discussions**: [Ask a question](https://github.com/TrillionUnicorn/AhFai/discussions)
- **Support**: See [SUPPORT.md](SUPPORT.md)

---

**Last Updated**: 2024-01-01

🤖 **Your AI. Your Privacy. Your Questions Answered.**
