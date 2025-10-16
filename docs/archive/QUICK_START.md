# 🚀 AhFai - Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Clone & Install
```bash
git clone https://github.com/TrillionUnicorn/AhFai.git
cd AhFai
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to: `http://localhost:5173`

**That's it!** 🎉 The app is now running locally.

---

## 📱 Available Pages

| Page | URL | Description |
|------|-----|-------------|
| **Landing** | `/` | Marketing homepage with waitlist |
| **Product** | `/app` | AI chat, notes, reminders |
| **Pitch Deck** | `/pitch` | Investor presentation |
| **Contact** | `/contact` | Contact form |

---

## 🛠️ Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run check            # TypeScript type check
npm run format           # Format code with Prettier

# Docker
docker build -t ahfai .  # Build Docker image
docker run -p 3000:3000 ahfai  # Run container
```

---

## 🎯 Key Features to Test

### Landing Page (/)
- ✅ Scroll down to see parallax effects
- ✅ Fill out the waitlist form
- ✅ Check pricing tiers
- ✅ Read mission & vision

### Product Page (/app)
- ✅ **AI Chat Tab**: Type a message and get AI response
- ✅ **Notes Tab**: Create a note and see AI suggestions
- ✅ **Reminders Tab**: Set a reminder with date/time
- ✅ All data saves to browser LocalStorage

### Pitch Deck (/pitch)
- ✅ View market analysis charts
- ✅ See competitive radar chart
- ✅ Review revenue projections
- ✅ Check investment opportunity

### Contact Page (/contact)
- ✅ Fill out contact form
- ✅ See success message
- ✅ Check social links

---

## 🐛 Troubleshooting

### Issue: Port 5173 already in use
```bash
# Kill the process using port 5173
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### Issue: Tailwind styles not loading
```bash
# Restart dev server
# Press Ctrl+C, then run:
npm run dev
```

### Issue: TypeScript errors
```bash
# Check for errors
npm run check

# If errors persist, delete .svelte-kit and rebuild
rm -rf .svelte-kit
npm run dev
```

### Issue: Dependencies not installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🚀 Production Deployment

### Option 1: Docker (Recommended)
```bash
# Build image
docker build -t ahfai:latest .

# Run container
docker run -d \
  -p 3000:3000 \
  --name ahfai \
  --restart unless-stopped \
  ahfai:latest

# Check logs
docker logs -f ahfai

# Stop container
docker stop ahfai
```

### Option 2: Node.js
```bash
# Build
npm run build

# Run with PM2 (process manager)
npm install -g pm2
pm2 start build/index.js --name ahfai

# Or run directly
node build
```

### Option 3: VPS Deployment
```bash
# SSH into your VPS
ssh user@your-server.com

# Clone repository
git clone https://github.com/TrillionUnicorn/AhFai.git
cd AhFai

# Install dependencies
npm install

# Build
npm run build

# Run with PM2
pm2 start build/index.js --name ahfai
pm2 save
pm2 startup

# Setup Nginx reverse proxy
sudo nano /etc/nginx/sites-available/ahfai

# Add this configuration:
server {
    listen 80;
    server_name ahfai.com www.ahfai.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site and restart Nginx
sudo ln -s /etc/nginx/sites-available/ahfai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d ahfai.com -d www.ahfai.com
```

---

## 🔒 Environment Variables

Create `.env` file (copy from `.env.example`):

```bash
# Required for production
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Optional (for future features)
# DATABASE_URL=postgresql://...
# REDIS_URL=redis://...
# OPENAI_API_KEY=sk-...
```

---

## 📊 Health Check

Once deployed, verify the application is running:

```bash
# Check if server is responding
curl http://localhost:3000

# Check Docker container health
docker ps
docker inspect ahfai | grep Health

# Check logs
docker logs ahfai
# or
pm2 logs ahfai
```

---

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#8b5cf6',  // Change this
        // ...
      }
    }
  }
}
```

### Change Content
- **Landing page**: `src/routes/(marketing)/+page.svelte`
- **Product page**: `src/routes/app/+page.svelte`
- **Pitch deck**: `src/routes/(marketing)/pitch/+page.svelte`
- **Contact**: `src/routes/(marketing)/contact/+page.svelte`

### Add New Page
```bash
# Create new route
mkdir -p src/routes/new-page
touch src/routes/new-page/+page.svelte

# Add content to +page.svelte
# Access at http://localhost:5173/new-page
```

---

## 📚 Resources

- **Svelte 5 Docs**: https://svelte.dev/docs/svelte/overview
- **SvelteKit Docs**: https://kit.svelte.dev/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **GSAP**: https://greensock.com/docs/
- **Chart.js**: https://www.chartjs.org/docs/

---

## 🆘 Getting Help

- **GitHub Issues**: https://github.com/TrillionUnicorn/AhFai/issues
- **Email**: hello@ahfai.com
- **Discord**: https://discord.gg/ahfai

---

## ✅ Checklist Before Launch

- [ ] Test all pages on mobile, tablet, desktop
- [ ] Verify all forms work correctly
- [ ] Check AI chat responses
- [ ] Test notes and reminders persistence
- [ ] Review pitch deck data accuracy
- [ ] Verify all links work
- [ ] Test contact form submission
- [ ] Check console for errors
- [ ] Run Lighthouse audit (target 90+)
- [ ] Set up analytics (optional)
- [ ] Configure custom domain
- [ ] Set up SSL certificate
- [ ] Configure backup strategy
- [ ] Set up monitoring/alerts
- [ ] Test Docker deployment
- [ ] Verify CI/CD pipeline
- [ ] Update README with live URL
- [ ] Announce launch! 🎉

---

**Ready to launch?** Follow the deployment steps above and you'll be live in minutes! 🚀

**Questions?** Check `COMPLETION_REPORT.md` for detailed information about all features.
