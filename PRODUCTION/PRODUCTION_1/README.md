# AhFai - Privacy-First AI Assistant

A complete, production-ready AI assistant application built with SvelteKit, featuring local AI processing, secure authentication, and comprehensive data management.

## 🌟 Features

### Core Functionality
- **🔐 Secure Authentication** - User registration and login with bcrypt password hashing
- **🤖 AI Chat** - Local AI processing with Ollama integration
- **📝 Smart Notes** - Create, edit, search, and organize notes
- **⏰ Reminders** - Set and manage reminders with status tracking
- **⚙️ Settings & Privacy** - Profile management, data export, and account control
- **🌓 Dark Mode** - Beautiful light and dark themes

### Technical Features
- **Local-First** - All data stored locally in SQLite
- **Privacy-Focused** - No external data transmission
- **Responsive Design** - Works on all devices
- **Production-Ready** - Comprehensive error handling and validation
- **Type-Safe** - Built with TypeScript throughout
- **Tested** - 34+ tests with 100% pass rate

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Ollama (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PRODUCTION/PRODUCTION_1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npm run db:push
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Installing Ollama (Optional but Recommended)

For AI chat functionality, install Ollama:

```bash
# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.com/install.sh | sh

# Windows
# Download from https://ollama.com/download
```

Then pull a model:
```bash
ollama pull llama3.1:8b
```

## 📖 Usage

### Creating an Account

1. Navigate to `/auth/register`
2. Enter your name, email, and password
3. Password must be at least 8 characters with uppercase, lowercase, and number
4. Click "Create Account"

### Using AI Chat

1. Log in to your account
2. Navigate to `/app/chat`
3. Start a new chat or select an existing one
4. Type your message and press Enter or click Send
5. The AI will respond using your local Ollama installation

### Managing Notes

1. Navigate to `/app/notes`
2. Click "New Note" to create a note
3. Enter title and content
4. Use Ctrl+S to save
5. Search notes using the search bar
6. Click on a note to view or edit it

### Setting Reminders

1. Navigate to `/app/reminders`
2. Create a new reminder with a title and due date
3. View pending, overdue, or completed reminders
4. Mark reminders as complete or delete them

### Exporting Your Data

1. Navigate to `/app/settings`
2. Go to "Privacy & Data" tab
3. Click "Export Data"
4. Your data will be downloaded as a JSON file

## 🏗️ Project Structure

```
PRODUCTION_1/
├── src/
│   ├── lib/
│   │   ├── auth/          # Authentication utilities
│   │   ├── ai/            # AI service wrapper
│   │   └── db/            # Database schema and client
│   ├── routes/
│   │   ├── api/           # API endpoints
│   │   │   ├── auth/      # Authentication APIs
│   │   │   ├── ai/        # AI APIs
│   │   │   ├── chats/     # Chat management APIs
│   │   │   ├── notes/     # Notes APIs
│   │   │   ├── reminders/ # Reminders APIs
│   │   │   └── user/      # User management APIs
│   │   ├── app/           # Protected application pages
│   │   │   ├── chat/      # Chat interface
│   │   │   ├── notes/     # Notes interface
│   │   │   ├── reminders/ # Reminders interface
│   │   │   └── settings/  # Settings interface
│   │   └── auth/          # Authentication pages
│   ├── tests/             # Test files
│   └── hooks.server.ts    # Server hooks for auth
├── drizzle/               # Database migrations
├── db/                    # SQLite database
└── package.json
```

## 🧪 Testing

Run the test suite:

```bash
# Run tests in watch mode
npm run test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run type checking
- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage

### Environment Variables

Create a `.env` file in the root directory:

```env
# Ollama Configuration (optional)
OLLAMA_HOST=http://localhost:11434

# Node Environment
NODE_ENV=development
```

## 🗄️ Database

The application uses SQLite with Drizzle ORM. The database schema includes:

- **users** - User accounts
- **sessions** - Authentication sessions
- **chats** - Chat conversations
- **messages** - Chat messages
- **notes** - User notes
- **reminders** - User reminders

### Database Management

```bash
# View database in Drizzle Studio
npm run db:studio

# Generate new migration
npm run db:generate

# Apply migrations
npm run db:push
```

## 🔒 Security

- **Password Hashing** - bcrypt with 12 salt rounds
- **Session Management** - HTTP-only cookies with 30-day expiration
- **CSRF Protection** - SameSite cookie policy
- **Input Validation** - Comprehensive validation on all inputs
- **SQL Injection Protection** - Parameterized queries via Drizzle ORM
- **User Isolation** - All data scoped to authenticated user

## 🎨 Customization

### Themes

The application supports light and dark modes. Toggle in Settings > Preferences.

### AI Models

Change the AI model by modifying `src/lib/ai/index.ts`:

```typescript
const DEFAULT_MODEL = 'llama3.1:8b'; // Change to your preferred model
```

## 📝 API Documentation

See [API.md](./docs/API.md) for complete API documentation.

## 🤝 Contributing

This is a production application. For contributions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

MIT License

## 🙏 Acknowledgments

- Built with [SvelteKit](https://kit.svelte.dev/)
- AI powered by [Ollama](https://ollama.com/)
- Database with [Drizzle ORM](https://orm.drizzle.team/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check the documentation
- Review the test files for usage examples

---

**Built with ❤️ for privacy and local-first computing**
