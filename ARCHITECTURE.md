# 🏗️ Architecture Documentation

Complete architectural overview of AhFai's two production implementations.

## 📋 Table of Contents

1. [Overview](#overview)
2. [PRODUCTION_1 Architecture](#production_1-architecture)
3. [PRODUCTION_2 Architecture](#production_2-architecture)
4. [Database Design](#database-design)
5. [Security Architecture](#security-architecture)
6. [Deployment Architecture](#deployment-architecture)
7. [Scalability Considerations](#scalability-considerations)

---

## Overview

AhFai provides two complete production implementations with 100% feature parity but different architectural approaches.

### Design Principles

1. **Privacy First**: All data processing happens locally
2. **Security by Design**: Multiple security layers
3. **Modularity**: Clean separation of concerns
4. **Scalability**: Architecture supports growth
5. **Maintainability**: Clear code organization
6. **Testability**: Comprehensive test coverage

---

## PRODUCTION_1 Architecture

### Monolithic Full-Stack Architecture

```
┌─────────────────────────────────────────┐
│         SvelteKit Application           │
├─────────────────────────────────────────┤
│  Frontend (Svelte Components)           │
│  ├── Routes (File-based routing)        │
│  ├── Components (Reusable UI)           │
│  └── Stores (State management)          │
├─────────────────────────────────────────┤
│  Backend (Server Routes)                │
│  ├── API Endpoints (+server.ts)         │
│  ├── Authentication (Sessions)          │
│  └── Business Logic                     │
├─────────────────────────────────────────┤
│  Database Layer                         │
│  ├── Drizzle ORM                        │
│  ├── SQLite Database                    │
│  └── Schema Definitions                 │
├─────────────────────────────────────────┤
│  AI Integration                         │
│  └── Ollama (Local AI)                  │
└─────────────────────────────────────────┘
```

### Technology Stack

**Frontend**:
- Svelte 5 (Reactive UI)
- SvelteKit 2 (Full-stack framework)
- TypeScript (Type safety)
- Tailwind CSS (Styling)

**Backend**:
- SvelteKit Server Routes
- Session-based authentication
- Cookie management

**Database**:
- SQLite (Embedded database)
- Drizzle ORM (Type-safe queries)
- File-based storage

**AI**:
- Ollama (Local AI inference)
- llama3.1:8b model

### Request Flow

```
User Request
    ↓
SvelteKit Router
    ↓
Server Route (+server.ts)
    ↓
Authentication Check
    ↓
Business Logic
    ↓
Database Query (Drizzle)
    ↓
SQLite Database
    ↓
Response to Client
```

### File Structure

```
PRODUCTION_1/
├── src/
│   ├── lib/
│   │   ├── server/
│   │   │   ├── db/          # Database schema & connection
│   │   │   └── auth.ts      # Authentication logic
│   │   ├── ai/              # AI integration
│   │   └── components/      # Reusable components
│   ├── routes/
│   │   ├── +page.svelte     # Pages
│   │   ├── +server.ts       # API endpoints
│   │   └── +layout.svelte   # Layouts
│   └── tests/               # Test files
├── db/                      # SQLite database files
├── docker-compose.yml       # Docker configuration
└── package.json             # Dependencies
```

### Advantages

✅ **Simplicity**: Single codebase, easier to understand  
✅ **Fast Development**: Rapid prototyping and iteration  
✅ **Low Overhead**: Minimal infrastructure requirements  
✅ **Easy Deployment**: Single container deployment  
✅ **Type Safety**: End-to-end TypeScript  

### Best For

- Small to medium deployments
- Rapid development
- Single team projects
- Quick prototypes
- Learning and experimentation

---

## PRODUCTION_2 Architecture

### Microservices Architecture

```
┌──────────────────────────────────────────────────┐
│                  Nginx (Reverse Proxy)           │
└──────────────────┬───────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        ↓                     ↓
┌───────────────┐    ┌────────────────┐
│   Frontend    │    │    Backend     │
│   (Next.js)   │    │   (FastAPI)    │
├───────────────┤    ├────────────────┤
│ React         │    │ Python 3.11    │
│ TypeScript    │    │ Pydantic       │
│ Tailwind CSS  │    │ SQLAlchemy     │
│ JWT Auth      │    │ JWT Auth       │
└───────┬───────┘    └────────┬───────┘
        │                     │
        │            ┌────────┴────────┐
        │            ↓                 ↓
        │    ┌──────────────┐  ┌─────────────┐
        │    │  PostgreSQL  │  │   Ollama    │
        │    │  (Database)  │  │  (Local AI) │
        │    └──────────────┘  └─────────────┘
        │
        └─────────────────────────────────────┐
                                              ↓
                                    ┌──────────────────┐
                                    │  Static Assets   │
                                    │  (CDN Ready)     │
                                    └──────────────────┘
```

### Technology Stack

**Frontend**:
- Next.js 14 (React framework)
- React 18 (UI library)
- TypeScript (Type safety)
- Tailwind CSS (Styling)
- JWT authentication

**Backend**:
- FastAPI (Python web framework)
- Python 3.11
- Pydantic (Data validation)
- SQLAlchemy (ORM)
- JWT authentication

**Database**:
- PostgreSQL 15 (Relational database)
- SQLAlchemy ORM
- Alembic (Migrations)

**Infrastructure**:
- Nginx (Reverse proxy)
- Docker Compose (Orchestration)
- Redis (Future: Caching)

**AI**:
- Ollama (Local AI inference)
- llama3.1:8b model

### Request Flow

```
User Request
    ↓
Nginx (Port 80/443)
    ↓
    ├─→ Frontend (Next.js) → Static Assets
    │       ↓
    │   API Request
    │       ↓
    └─→ Backend (FastAPI)
            ↓
        JWT Validation
            ↓
        Business Logic
            ↓
        Database Query (SQLAlchemy)
            ↓
        PostgreSQL
            ↓
        JSON Response
            ↓
        Frontend Rendering
```

### File Structure

```
PRODUCTION_2/
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   ├── components/      # React components
│   │   ├── lib/             # Utilities
│   │   └── types/           # TypeScript types
│   ├── public/              # Static assets
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── api/             # API routes
│   │   ├── models/          # Database models
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Business logic
│   │   └── core/            # Configuration
│   ├── alembic/             # Database migrations
│   ├── tests/               # Test files
│   └── requirements.txt
├── nginx.conf               # Nginx configuration
├── docker-compose.yml       # Development
└── docker-compose.prod.yml  # Production
```

### Advantages

✅ **Scalability**: Horizontal scaling of services  
✅ **Flexibility**: Independent technology choices  
✅ **Team Separation**: Frontend/backend teams  
✅ **Performance**: Optimized for each layer  
✅ **Production-Ready**: Enterprise-grade architecture  

### Best For

- Enterprise deployments
- Large-scale applications
- Multiple teams
- High traffic scenarios
- Microservices architecture

---

## Database Design

### Entity Relationship Diagram

```
┌─────────────┐
│    Users    │
├─────────────┤
│ id (PK)     │
│ email       │
│ password    │
│ name        │
│ created_at  │
└──────┬──────┘
       │
       │ 1:N
       │
   ┌───┴────────────────┬──────────────┬──────────────┐
   │                    │              │              │
   ↓                    ↓              ↓              ↓
┌──────────┐    ┌──────────┐   ┌──────────┐   ┌──────────┐
│  Chats   │    │  Notes   │   │Reminders │   │ Sessions │
├──────────┤    ├──────────┤   ├──────────┤   ├──────────┤
│ id (PK)  │    │ id (PK)  │   │ id (PK)  │   │ id (PK)  │
│ user_id  │    │ user_id  │   │ user_id  │   │ user_id  │
│ title    │    │ title    │   │ title    │   │ token    │
│ created  │    │ content  │   │ due_date │   │ expires  │
└────┬─────┘    │ created  │   │ status   │   └──────────┘
     │          │ updated  │   │ created  │
     │ 1:N      └──────────┘   └──────────┘
     │
     ↓
┌──────────┐
│ Messages │
├──────────┤
│ id (PK)  │
│ chat_id  │
│ role     │
│ content  │
│ created  │
└──────────┘
```

### Schema Details

**Users Table**:
- Primary authentication entity
- Stores hashed passwords (bcrypt)
- Timestamps for audit trail

**Chats Table**:
- Conversation containers
- Links to user
- Metadata (title, timestamps)

**Messages Table**:
- Individual chat messages
- Role: user/assistant
- Content: message text
- Linked to chat

**Notes Table**:
- User notes storage
- Rich text content
- Search indexing
- Timestamps

**Reminders Table**:
- Task/reminder storage
- Due dates
- Status tracking
- User isolation

**Sessions Table** (PRODUCTION_1 only):
- Session management
- Token storage
- Expiration tracking

---

## Security Architecture

### Multi-Layer Security

```
┌─────────────────────────────────────┐
│  Layer 1: Network Security          │
│  - HTTPS/TLS                        │
│  - Nginx security headers           │
│  - Rate limiting                    │
└─────────────────┬───────────────────┘
                  ↓
┌─────────────────────────────────────┐
│  Layer 2: Authentication            │
│  - Password hashing (bcrypt)        │
│  - Session/JWT tokens               │
│  - Secure cookies                   │
└─────────────────┬───────────────────┘
                  ↓
┌─────────────────────────────────────┐
│  Layer 3: Authorization             │
│  - User data isolation              │
│  - Role-based access (future)       │
│  - Resource ownership checks        │
└─────────────────┬───────────────────┘
                  ↓
┌─────────────────────────────────────┐
│  Layer 4: Input Validation          │
│  - Zod/Pydantic schemas             │
│  - SQL injection prevention         │
│  - XSS protection                   │
└─────────────────┬───────────────────┘
                  ↓
┌─────────────────────────────────────┐
│  Layer 5: Data Protection           │
│  - Encryption at rest               │
│  - Secure data deletion             │
│  - Privacy-first design             │
└─────────────────────────────────────┘
```

### Security Features

**Authentication**:
- bcrypt password hashing (12 rounds)
- Secure session/JWT management
- HTTP-only cookies
- CSRF protection

**Authorization**:
- User data isolation
- Database-level constraints
- API endpoint protection

**Input Validation**:
- Type-safe schemas (Zod/Pydantic)
- SQL injection prevention (ORM)
- XSS protection (output encoding)

**Network Security**:
- HTTPS/TLS encryption
- Security headers (CSP, HSTS, etc.)
- Rate limiting (PRODUCTION_2)

---

## Deployment Architecture

### Development Environment

```
Developer Machine
    ↓
Docker Compose
    ├── Application Container
    ├── Database Container
    └── Ollama Container
```

### Production Environment (PRODUCTION_2)

```
Load Balancer
    ↓
Nginx (Reverse Proxy)
    ├── Frontend Containers (Horizontal Scaling)
    ├── Backend Containers (Horizontal Scaling)
    ├── PostgreSQL (Primary + Replicas)
    └── Ollama (GPU-optimized)
```

---

## Scalability Considerations

### PRODUCTION_1 Scaling

**Vertical Scaling**:
- Increase server resources
- Optimize database queries
- Add caching layer

**Limitations**:
- Single database file
- Monolithic architecture
- Limited horizontal scaling

### PRODUCTION_2 Scaling

**Horizontal Scaling**:
- Multiple frontend instances
- Multiple backend instances
- Database read replicas
- Load balancing

**Future Enhancements**:
- Redis caching
- Message queues
- CDN integration
- Database sharding

---

**Last Updated**: 2024-01-01

🤖 **Your AI. Your Privacy. Your Architecture.**
