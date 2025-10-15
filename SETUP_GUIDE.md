# 🚀 AhFai - Complete Setup Guide with Bun

## Prerequisites

### Required Software
1. **Bun** (v1.1.0 or later)
   ```bash
   # Install Bun
   curl -fsSL https://bun.sh/install | bash
   
   # Verify installation
   bun --version
   ```

2. **Git**
   ```bash
   git --version
   ```

3. **Code Editor** (VS Code recommended)

---

## 📦 Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/TrillionUnicorn/AhFai.git
cd AhFai
```

### 2. Install Dependencies with Bun
```bash
# Install all dependencies
bun install

# This will install:
# - Svelte 5.15.0
# - SvelteKit 2.8.5
# - Tailwind CSS 4.0.0-beta.6
# - GSAP 3.12.5
# - Chart.js 4.4.6
# - Playwright 1.48.2
# - And all dev dependencies
```

### 3. Install Playwright Browsers
```bash
# Install all browsers for testing
bunx playwright install

# Or install specific browsers
bunx playwright install chromium
bunx playwright install firefox
bunx playwright install webkit
```

### 4. Set Up Environment Variables
```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your configuration
nano .env  # or use your preferred editor
```

---

## 🏃 Running the Application

### Development Mode
```bash
# Start development server with Bun
bun run dev

# Server will start at http://localhost:5173
# Hot reload enabled
# Open in browser
```

### Production Build
```bash
# Build for production
bun run build

# Preview production build
bun run preview

# Server will start at http://localhost:4173
```

---

## 🧪 Running Tests

### All Tests
```bash
# Run all Playwright tests
bun run test

# Run tests in UI mode (interactive)
bun run test:ui

# Run tests in headed mode (see browser)
bun run test:headed

# Debug tests
bun run test:debug
```

### Specific Test Suites
```bash
# Landing page tests
bunx playwright test landing-page.spec.ts

# App page tests
bunx playwright test app-page.spec.ts

# Pitch deck tests
bunx playwright test pitch-page.spec.ts

# Contact page tests
bunx playwright test contact-page.spec.ts

# Responsive design tests
bunx playwright test responsive.spec.ts
```

### Test Reports
```bash
# View test report
bun run test:report

# Report will open in browser
```

---

## 🎨 Code Quality

### Linting
```bash
# Check code style
bun run lint

# Auto-fix issues
bun run format
```

### Type Checking
```bash
# Run TypeScript type check
bun run check

# Watch mode
bun run check:watch
```

---

## 🐳 Docker Deployment

### Build Docker Image
```bash
# Build image
docker build -t ahfai:latest .

# Build with specific tag
docker build -t ahfai:v1.0.0 .
```

### Run Docker Container
```bash
# Run container
docker run -d \
  -p 3000:3000 \
  --name ahfai \
  --restart unless-stopped \
  ahfai:latest

# View logs
docker logs -f ahfai

# Stop container
docker stop ahfai

# Remove container
docker rm ahfai
```

### Docker Compose (Optional)
```bash
# Create docker-compose.yml first
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 🔧 Troubleshooting

### Issue: Bun not found
```bash
# Add Bun to PATH
export PATH="$HOME/.bun/bin:$PATH"

# Add to shell profile
echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### Issue: Port 5173 already in use
```bash
# Find process using port
lsof -ti:5173

# Kill process
kill -9 $(lsof -ti:5173)

# Or use different port
bun run dev -- --port 3000
```

### Issue: Playwright browsers not installed
```bash
# Install all browsers
bunx playwright install --with-deps

# This installs browsers and system dependencies
```

### Issue: TypeScript errors
```bash
# Clear cache and rebuild
rm -rf .svelte-kit
rm -rf node_modules
bun install
bun run check
```

### Issue: Tailwind styles not loading
```bash
# Restart dev server
# Press Ctrl+C
bun run dev

# Clear browser cache
# Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
```

### Issue: Tests failing
```bash
# Update Playwright
bunx playwright install --with-deps

# Clear test cache
rm -rf playwright-report
rm -rf test-results

# Run tests again
bun run test
```

---

## 📁 Project Structure

```
ahfai/
├── src/
│   ├── lib/
│   │   └── components/          # Reusable components
│   ├── routes/
│   │   ├── (marketing)/         # Marketing pages
│   │   │   ├── +layout.svelte
│   │   │   ├── +page.svelte     # Landing
│   │   │   ├── contact/
│   │   │   └── pitch/
│   │   └── app/                 # Application
│   │       ├── +layout.svelte
│   │       └── +page.svelte
│   ├── app.css                  # Global styles
│   └── app.html                 # HTML template
├── tests/                       # Playwright tests
│   ├── landing-page.spec.ts
│   ├── app-page.spec.ts
│   ├── pitch-page.spec.ts
│   ├── contact-page.spec.ts
│   └── responsive.spec.ts
├── static/                      # Static assets
├── .github/
│   └── workflows/               # CI/CD pipelines
├── Dockerfile                   # Docker configuration
├── bunfig.toml                  # Bun configuration
├── playwright.config.ts         # Playwright config
├── svelte.config.js             # SvelteKit config
├── tailwind.config.js           # Tailwind config
├── vite.config.ts               # Vite config
├── package.json                 # Dependencies
└── README.md                    # Project overview
```

---

## 🚀 Deployment

### VPS Deployment
```bash
# SSH into VPS
ssh user@your-server.com

# Clone repository
git clone https://github.com/TrillionUnicorn/AhFai.git
cd AhFai

# Install Bun on server
curl -fsSL https://bun.sh/install | bash

# Install dependencies
bun install

# Build application
bun run build

# Run with PM2
npm install -g pm2
pm2 start "bun run preview" --name ahfai
pm2 save
pm2 startup

# Configure Nginx
sudo nano /etc/nginx/sites-available/ahfai

# Add configuration:
server {
    listen 80;
    server_name ahfai.com www.ahfai.com;

    location / {
        proxy_pass http://localhost:4173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/ahfai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup SSL
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d ahfai.com -d www.ahfai.com
```

---

## 🔄 Git Workflow

### Create Feature Branch
```bash
# Create and switch to new branch
git checkout -b feature/your-feature-name

# Make changes
# ...

# Stage changes
git add .

# Commit with meaningful message
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/your-feature-name
```

### Create Pull Request
1. Go to GitHub repository
2. Click "New Pull Request"
3. Select your feature branch
4. Fill out PR template
5. Wait for CI/CD checks to pass
6. Request review
7. Merge after approval

---

## 📊 Monitoring

### Check Application Health
```bash
# Check if server is running
curl http://localhost:5173

# Check Docker container
docker ps
docker inspect ahfai

# Check logs
docker logs ahfai
# or
pm2 logs ahfai
```

### Performance Monitoring
```bash
# Run Lighthouse audit
bunx lighthouse http://localhost:5173 --view

# Check bundle size
bun run build
ls -lh build/
```

---

## 🎯 Next Steps

1. ✅ Install Bun and dependencies
2. ✅ Run development server
3. ✅ Run all tests
4. ✅ Build for production
5. ⏳ Deploy to VPS
6. ⏳ Set up monitoring
7. ⏳ Configure analytics
8. ⏳ Launch!

---

## 📞 Support

- **GitHub Issues**: https://github.com/TrillionUnicorn/AhFai/issues
- **Email**: hello@ahfai.com
- **Discord**: https://discord.gg/ahfai

---

**Ready to build?** Follow the steps above and you'll have AhFai running in minutes! 🚀
