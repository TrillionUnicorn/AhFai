import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      Cookies.remove('token');
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (data: { name: string; email: string; password: string }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  
  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    if (response.data.access_token) {
      Cookies.set('token', response.data.access_token, { expires: 30 });
    }
    return response.data;
  },
  
  logout: () => {
    Cookies.remove('token');
  },
};

// User API
export const userAPI = {
  getProfile: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
  
  updateProfile: async (data: any) => {
    const response = await api.patch('/users/me', data);
    return response.data;
  },
  
  exportData: async () => {
    const response = await api.get('/users/me/export');
    return response.data;
  },
  
  deleteAccount: async (password: string) => {
    const response = await api.delete('/users/me', { params: { password } });
    return response.data;
  },
};

// Chat API
export const chatAPI = {
  list: async () => {
    const response = await api.get('/chats');
    return response.data;
  },
  
  create: async (data: { title: string }) => {
    const response = await api.post('/chats', data);
    return response.data;
  },
  
  get: async (id: number) => {
    const response = await api.get(`/chats/${id}`);
    return response.data;
  },
  
  update: async (id: number, data: { title: string }) => {
    const response = await api.patch(`/chats/${id}`, data);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`/chats/${id}`);
    return response.data;
  },
};

// AI API
export const aiAPI = {
  status: async () => {
    const response = await api.get('/ai/status');
    return response.data;
  },
  
  generate: async (data: {
    prompt: string;
    system?: string;
    model?: string;
    temperature?: number;
    max_tokens?: number;
  }) => {
    const response = await api.post('/ai/generate', data);
    return response.data;
  },
  
  chat: async (data: {
    message: string;
    chat_id?: number;
    model?: string;
    temperature?: number;
    max_tokens?: number;
  }) => {
    const response = await api.post('/ai/chat', data);
    return response.data;
  },
};

// Notes API
export const notesAPI = {
  list: async (params?: { search?: string; limit?: number; offset?: number }) => {
    const response = await api.get('/notes', { params });
    return response.data;
  },
  
  create: async (data: { title: string; content: string }) => {
    const response = await api.post('/notes', data);
    return response.data;
  },
  
  get: async (id: number) => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },
  
  update: async (id: number, data: { title?: string; content?: string }) => {
    const response = await api.patch(`/notes/${id}`, data);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  },
};

// Reminders API
export const remindersAPI = {
  list: async (params?: { status?: string; limit?: number; offset?: number }) => {
    const response = await api.get('/reminders', { params });
    return response.data;
  },
  
  create: async (data: {
    title: string;
    description?: string;
    due_at: string;
  }) => {
    const response = await api.post('/reminders', data);
    return response.data;
  },
  
  get: async (id: number) => {
    const response = await api.get(`/reminders/${id}`);
    return response.data;
  },
  
  update: async (id: number, data: {
    title?: string;
    description?: string;
    due_at?: string;
    completed?: boolean;
  }) => {
    const response = await api.patch(`/reminders/${id}`, data);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`/reminders/${id}`);
    return response.data;
  },
};

export default api;
