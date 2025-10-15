# AhFai - Production Version 2

A complete, production-ready AI assistant application built with **Next.js 14** (frontend) and **FastAPI** (backend), featuring local AI processing, secure authentication, and comprehensive data management.

## 🌟 Features

### Core Functionality
- **🔐 Secure Authentication** - JWT-based authentication with bcrypt password hashing
- **🤖 AI Chat** - Local AI processing with Ollama integration
- **📝 Smart Notes** - Create, edit, search, and organize notes
- **⏰ Reminders** - Set and manage reminders with status tracking
- **⚙️ Settings & Privacy** - Profile management, data export, and account control
- **🌓 Dark Mode** - Beautiful light and dark themes

### Technical Features
- **Microservices Architecture** - Separate frontend and backend services
- **PostgreSQL Database** - Production-grade relational database
- **RESTful API** - Complete REST API with OpenAPI documentation
- **Type-Safe** - TypeScript frontend, Python backend with type hints
- **Scalable** - Horizontal scaling ready
- **Production-Ready** - Comprehensive error handling and validation

## 🏗️ Architecture

```
PRODUCTION_2/
├── frontend/          # Next.js 14 application
│   ├── app/          # App router pages
│   ├── contexts/     # React contexts
│   ├── lib/          # API client and utilities
│   └── middleware.ts # Route protection
├── backend/          # FastAPI application
│   ├── app/
│   │   ├── routers/  # API endpoints
│   │   ├── models.py # Database models
│   │   ├── schemas.py# Pydantic schemas
│   │   ├── auth.py   # Authentication
│   │   └── main.py   # FastAPI app
│   └── alembic/      # Database migrations
└── docker-compose.yml# Docker orchestration
```

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- (Optional) Node.js 18+ and Python 3.11+ for local development

### Installation with Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PRODUCTION/PRODUCTION_2
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start all services**
   ```bash
   docker-compose up -d
   ```

4. **Pull AI model**
   ```bash
   docker-compose exec ollama ollama pull llama3.1:8b
   ```

5. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`
   - API Docs: `http://localhost:8000/api/docs`

### Local Development Setup

#### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up database
# Make sure PostgreSQL is running
createdb ahfai

# Run migrations
alembic upgrade head

# Start server
uvicorn app.main:app --reload
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📖 Usage

### Creating an Account

1. Navigate to `http://localhost:3000`
2. Click "Sign up"
3. Enter your name, email, and password
4. Password must be at least 8 characters with uppercase, lowercase, and number

### Using AI Chat

1. Log in to your account
2. Click "Chat" in the navigation
3. Click "New Chat" to start a conversation
4. Type your message and press Send
5. The AI will respond using your local Ollama installation

### Managing Notes

1. Navigate to "Notes"
2. Click "New Note"
3. Enter title and content
4. Click "Save"
5. Use the search bar to find notes

### Setting Reminders

1. Navigate to "Reminders"
2. Click "New Reminder"
3. Enter title, description, and due date
4. Click "Save"
5. Filter by status (pending, overdue, completed)

### Exporting Your Data

1. Navigate to "Settings"
2. Go to "Privacy & Data" tab
3. Click "Export Data"
4. Your data will be downloaded as a JSON file

## 🔧 Development

### Backend Development

```bash
# Run tests
pytest

# Format code
black app/

# Type checking
mypy app/

# Generate migration
alembic revision --autogenerate -m "description"

# Apply migration
alembic upgrade head
```

### Frontend Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check
```

## 🗄️ Database

The application uses PostgreSQL with SQLAlchemy ORM. The database schema includes:

- **users** - User accounts
- **chats** - Chat conversations
- **messages** - Chat messages
- **notes** - User notes
- **reminders** - User reminders

### Database Management

```bash
# Access database
docker-compose exec postgres psql -U ahfai -d ahfai

# Backup database
docker-compose exec postgres pg_dump -U ahfai ahfai > backup.sql

# Restore database
docker-compose exec -T postgres psql -U ahfai ahfai < backup.sql
```

## 🔒 Security

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt with 12 salt rounds
- **CORS Protection** - Configured allowed origins
- **Input Validation** - Pydantic schemas for all inputs
- **SQL Injection Protection** - Parameterized queries via SQLAlchemy
- **User Isolation** - All data scoped to authenticated user

## 📝 API Documentation

The backend provides interactive API documentation:

- **Swagger UI**: `http://localhost:8000/api/docs`
- **ReDoc**: `http://localhost:8000/api/redoc`
- **OpenAPI JSON**: `http://localhost:8000/api/openapi.json`

### Main Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/chats` - List chats
- `POST /api/ai/chat` - Chat with AI
- `GET /api/notes` - List notes
- `GET /api/reminders` - List reminders
- `GET /api/users/me` - Get profile
- `GET /api/users/me/export` - Export data

## 🐳 Docker Commands

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

# Remove all data
docker-compose down -v
```

## 🌐 Deployment

### Production Deployment

1. **Update environment variables**
   ```bash
   # Set strong SECRET_KEY
   # Update ALLOWED_ORIGINS
   # Configure production database
   ```

2. **Build and deploy**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **Set up reverse proxy** (nginx/Caddy)
4. **Configure SSL** (Let's Encrypt)
5. **Set up monitoring**
6. **Configure backups**

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest
pytest --cov=app tests/
```

### Frontend Tests

```bash
cd frontend
npm test
npm run test:coverage
```

## 📊 Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **date-fns** - Date formatting

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Relational database
- **Pydantic** - Data validation
- **python-jose** - JWT tokens
- **passlib** - Password hashing
- **Ollama** - Local AI integration

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Alembic** - Database migrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

MIT License

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [FastAPI](https://fastapi.tiangolo.com/)
- AI by [Ollama](https://ollama.com/)
- Database with [PostgreSQL](https://www.postgresql.org/)

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check the API documentation
- Review the deployment guide

---

**Built with ❤️ for privacy and local-first computing**
