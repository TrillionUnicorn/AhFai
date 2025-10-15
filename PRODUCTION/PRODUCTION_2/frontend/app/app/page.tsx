'use client';

import { useState, useEffect, useRef } from 'react';
import { chatAPI, aiAPI } from '@/lib/api';
import toast from 'react-hot-toast';

interface Message {
  id: number;
  role: string;
  content: string;
  created_at: string;
}

interface Chat {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadChats();
    checkAIStatus();
  }, []);

  useEffect(() => {
    if (currentChat) {
      loadMessages(currentChat);
    }
  }, [currentChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const checkAIStatus = async () => {
    try {
      const status = await aiAPI.status();
      setAiStatus(status);
    } catch (error) {
      console.error('Failed to check AI status:', error);
    }
  };

  const loadChats = async () => {
    try {
      const data = await chatAPI.list();
      setChats(data);
    } catch (error) {
      toast.error('Failed to load chats');
    }
  };

  const loadMessages = async (chatId: number) => {
    try {
      const data = await chatAPI.get(chatId);
      setMessages(data.messages || []);
    } catch (error) {
      toast.error('Failed to load messages');
    }
  };

  const createNewChat = async () => {
    try {
      const chat = await chatAPI.create({ title: 'New Chat' });
      setChats([chat, ...chats]);
      setCurrentChat(chat.id);
      setMessages([]);
    } catch (error) {
      toast.error('Failed to create chat');
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!aiStatus?.available) {
      toast.error('AI service is not available. Please ensure Ollama is running.');
      return;
    }

    const userMessage = input;
    setInput('');
    setLoading(true);

    try {
      const response = await aiAPI.chat({
        message: userMessage,
        chat_id: currentChat || undefined,
      });

      if (response.success) {
        if (!currentChat && response.chat_id) {
          setCurrentChat(response.chat_id);
          await loadChats();
        }
        await loadMessages(response.chat_id);
      } else {
        toast.error(response.error || 'Failed to get AI response');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const deleteChat = async (chatId: number) => {
    if (!confirm('Delete this chat?')) return;
    
    try {
      await chatAPI.delete(chatId);
      setChats(chats.filter(c => c.id !== chatId));
      if (currentChat === chatId) {
        setCurrentChat(null);
        setMessages([]);
      }
      toast.success('Chat deleted');
    } catch (error) {
      toast.error('Failed to delete chat');
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 rounded-lg shadow p-4 overflow-y-auto">
        <button
          onClick={createNewChat}
          className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + New Chat
        </button>
        
        {!aiStatus?.available && (
          <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-md text-sm text-yellow-800 dark:text-yellow-200">
            ⚠️ AI offline
          </div>
        )}

        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-3 rounded-md cursor-pointer flex justify-between items-center ${
                currentChat === chat.id
                  ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div onClick={() => setCurrentChat(chat.id)} className="flex-1 truncate">
                {chat.title}
              </div>
              <button
                onClick={() => deleteChat(chat.id)}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col">
        {currentChat || messages.length > 0 ? (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="border-t dark:border-gray-700 p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={loading}
                  className="flex-1 px-4 py-2 border dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-xl">Select a chat or create a new one to start</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
