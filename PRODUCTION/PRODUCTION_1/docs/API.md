# API Documentation

Complete API reference for AhFai application.

## Base URL

All API endpoints are relative to the application root: `http://localhost:5173/api`

## Authentication

Most endpoints require authentication via session cookies. The session cookie is automatically set upon successful login/registration.

### Headers

```
Content-Type: application/json
Cookie: session=<session-id>
```

---

## Authentication Endpoints

### Register User

Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Validation:**
- `name`: 2-50 characters
- `email`: Valid email format, unique
- `password`: Minimum 8 characters, must contain uppercase, lowercase, and number

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Account created successfully"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "errors": {
    "email": "Email already registered",
    "password": "Password must contain at least one uppercase letter..."
  }
}
```

### Login

Authenticate and create a session.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Logged in successfully"
}
```

**Error Response (401):**
```json
{
  "success": false,
  "errors": {
    "general": "Invalid email or password"
  }
}
```

### Logout

End the current session.

**Endpoint:** `POST /api/auth/logout`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## AI Endpoints

### Get AI Status

Check if AI service is available and list models.

**Endpoint:** `GET /api/ai/status`

**Authentication:** Required

**Success Response (200):**
```json
{
  "available": true,
  "models": ["llama3.1:8b", "llama3.1:7b"],
  "currentModel": "llama3.1:8b"
}
```

### Generate AI Response

Generate a single AI response.

**Endpoint:** `POST /api/ai/generate`

**Authentication:** Required

**Request Body:**
```json
{
  "prompt": "What is the capital of France?",
  "system": "You are a helpful assistant",
  "model": "llama3.1:8b",
  "temperature": 0.7,
  "maxTokens": 2048
}
```

**Success Response (200):**
```json
{
  "success": true,
  "response": "The capital of France is Paris."
}
```

### Chat with AI

Send a message in a conversation context.

**Endpoint:** `POST /api/ai/chat`

**Authentication:** Required

**Request Body:**
```json
{
  "message": "Hello, how are you?",
  "chatId": 1,
  "model": "llama3.1:8b",
  "temperature": 0.7,
  "maxTokens": 2048
}
```

**Success Response (200):**
```json
{
  "success": true,
  "response": "Hello! I'm doing well, thank you for asking...",
  "chatId": 1
}
```

---

## Chat Management Endpoints

### List Chats

Get all chats for the authenticated user.

**Endpoint:** `GET /api/chats`

**Authentication:** Required

**Success Response (200):**
```json
{
  "success": true,
  "chats": [
    {
      "id": 1,
      "userId": 1,
      "title": "General Discussion",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T01:00:00.000Z"
    }
  ]
}
```

### Create Chat

Create a new chat.

**Endpoint:** `POST /api/chats`

**Authentication:** Required

**Request Body:**
```json
{
  "title": "New Chat"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "chat": {
    "id": 2,
    "userId": 1,
    "title": "New Chat",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get Chat with Messages

Get a specific chat with all messages.

**Endpoint:** `GET /api/chats/[id]`

**Authentication:** Required

**Success Response (200):**
```json
{
  "success": true,
  "chat": {
    "id": 1,
    "userId": 1,
    "title": "General Discussion",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T01:00:00.000Z"
  },
  "messages": [
    {
      "id": 1,
      "chatId": 1,
      "role": "user",
      "content": "Hello",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": 2,
      "chatId": 1,
      "role": "assistant",
      "content": "Hi there!",
      "createdAt": "2024-01-01T00:00:01.000Z"
    }
  ]
}
```

### Update Chat

Update chat title.

**Endpoint:** `PATCH /api/chats/[id]`

**Authentication:** Required

**Request Body:**
```json
{
  "title": "Updated Title"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "chat": {
    "id": 1,
    "userId": 1,
    "title": "Updated Title",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T02:00:00.000Z"
  }
}
```

### Delete Chat

Delete a chat and all its messages.

**Endpoint:** `DELETE /api/chats/[id]`

**Authentication:** Required

**Success Response (200):**
```json
{
  "success": true,
  "message": "Chat deleted successfully"
}
```

---

## Notes Endpoints

### List Notes

Get all notes with optional search.

**Endpoint:** `GET /api/notes?search=query&limit=50&offset=0`

**Authentication:** Required

**Query Parameters:**
- `search` (optional): Search term for title/content
- `limit` (optional): Max results (default: 50, max: 100)
- `offset` (optional): Pagination offset (default: 0)

**Success Response (200):**
```json
{
  "success": true,
  "notes": [
    {
      "id": 1,
      "userId": 1,
      "title": "My Note",
      "content": "Note content here...",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "limit": 50,
    "offset": 0,
    "hasMore": false
  }
}
```

### Create Note

Create a new note.

**Endpoint:** `POST /api/notes`

**Authentication:** Required

**Request Body:**
```json
{
  "title": "My New Note",
  "content": "This is the content of my note."
}
```

**Validation:**
- `title`: Required, max 200 characters
- `content`: Required, max 50,000 characters

**Success Response (200):**
```json
{
  "success": true,
  "note": {
    "id": 2,
    "userId": 1,
    "title": "My New Note",
    "content": "This is the content of my note.",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get Note

Get a specific note.

**Endpoint:** `GET /api/notes/[id]`

**Authentication:** Required

**Success Response (200):**
```json
{
  "success": true,
  "note": {
    "id": 1,
    "userId": 1,
    "title": "My Note",
    "content": "Note content here...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Update Note

Update a note's title and/or content.

**Endpoint:** `PATCH /api/notes/[id]`

**Authentication:** Required

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "note": {
    "id": 1,
    "userId": 1,
    "title": "Updated Title",
    "content": "Updated content",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T01:00:00.000Z"
  }
}
```

### Delete Note

Delete a note.

**Endpoint:** `DELETE /api/notes/[id]`

**Authentication:** Required

**Success Response (200):**
```json
{
  "success": true,
  "message": "Note deleted successfully"
}
```

---

## Reminders Endpoints

### List Reminders

Get all reminders with optional status filter.

**Endpoint:** `GET /api/reminders?status=pending&limit=50&offset=0`

**Authentication:** Required

**Query Parameters:**
- `status` (optional): Filter by status (`pending`, `completed`, `overdue`)
- `limit` (optional): Max results (default: 50, max: 100)
- `offset` (optional): Pagination offset (default: 0)

**Success Response (200):**
```json
{
  "success": true,
  "reminders": [
    {
      "id": 1,
      "userId": 1,
      "title": "Meeting",
      "description": "Team meeting at 2pm",
      "dueAt": "2024-01-01T14:00:00.000Z",
      "completed": false,
      "status": "pending",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "limit": 50,
    "offset": 0,
    "hasMore": false
  }
}
```

### Create Reminder

Create a new reminder.

**Endpoint:** `POST /api/reminders`

**Authentication:** Required

**Request Body:**
```json
{
  "title": "Meeting",
  "description": "Team meeting at 2pm",
  "dueAt": "2024-01-01T14:00:00.000Z"
}
```

**Validation:**
- `title`: Required, max 200 characters
- `description`: Optional, max 1,000 characters
- `dueAt`: Required, must be in the future

**Success Response (200):**
```json
{
  "success": true,
  "reminder": {
    "id": 2,
    "userId": 1,
    "title": "Meeting",
    "description": "Team meeting at 2pm",
    "dueAt": "2024-01-01T14:00:00.000Z",
    "completed": false,
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get Reminder

Get a specific reminder.

**Endpoint:** `GET /api/reminders/[id]`

**Authentication:** Required

**Success Response (200):**
```json
{
  "success": true,
  "reminder": {
    "id": 1,
    "userId": 1,
    "title": "Meeting",
    "description": "Team meeting at 2pm",
    "dueAt": "2024-01-01T14:00:00.000Z",
    "completed": false,
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Update Reminder

Update a reminder.

**Endpoint:** `PATCH /api/reminders/[id]`

**Authentication:** Required

**Request Body:**
```json
{
  "title": "Updated Meeting",
  "description": "Updated description",
  "dueAt": "2024-01-01T15:00:00.000Z",
  "completed": true
}
```

**Success Response (200):**
```json
{
  "success": true,
  "reminder": {
    "id": 1,
    "userId": 1,
    "title": "Updated Meeting",
    "description": "Updated description",
    "dueAt": "2024-01-01T15:00:00.000Z",
    "completed": true,
    "status": "completed",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T01:00:00.000Z"
  }
}
```

### Delete Reminder

Delete a reminder.

**Endpoint:** `DELETE /api/reminders/[id]`

**Authentication:** Required

**Success Response (200):**
```json
{
  "success": true,
  "message": "Reminder deleted successfully"
}
```

---

## User Management Endpoints

### Get Profile

Get current user's profile.

**Endpoint:** `GET /api/user/profile`

**Authentication:** Required

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Update Profile

Update user profile and/or password.

**Endpoint:** `PATCH /api/user/profile`

**Authentication:** Required

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "currentPassword": "OldPass123",
  "newPassword": "NewPass123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "john.smith@example.com",
    "name": "John Smith",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T01:00:00.000Z"
  },
  "message": "Profile updated successfully"
}
```

### Export Data

Export all user data.

**Endpoint:** `GET /api/user/export`

**Authentication:** Required

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "exportInfo": {
      "exportedAt": "2024-01-01T00:00:00.000Z",
      "version": "1.0",
      "application": "AhFai"
    },
    "user": { ... },
    "chats": [ ... ],
    "notes": [ ... ],
    "reminders": [ ... ],
    "statistics": {
      "totalChats": 5,
      "totalMessages": 42,
      "totalNotes": 10,
      "totalReminders": 3
    }
  }
}
```

### Delete Account

Permanently delete user account and all data.

**Endpoint:** `DELETE /api/user/delete`

**Authentication:** Required

**Request Body:**
```json
{
  "password": "CurrentPass123",
  "confirmation": "DELETE"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Invalid input",
  "errors": {
    "field": "Error message"
  }
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. This should be added for production deployment.

## CORS

CORS is not configured. The API is designed to be consumed by the same-origin frontend application.

---

**Last Updated:** 2024-01-01
