'use client';

import { useState, useEffect } from 'react';
import { remindersAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

interface Reminder {
  id: number;
  title: string;
  description?: string;
  due_at: string;
  completed: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReminders();
  }, [filter]);

  const loadReminders = async () => {
    try {
      const data = await remindersAPI.list({ status: filter || undefined });
      setReminders(data);
    } catch (error) {
      toast.error('Failed to load reminders');
    }
  };

  const openModal = (reminder?: Reminder) => {
    if (reminder) {
      setEditingReminder(reminder);
      setTitle(reminder.title);
      setDescription(reminder.description || '');
      setDueDate(format(new Date(reminder.due_at), "yyyy-MM-dd'T'HH:mm"));
    } else {
      setEditingReminder(null);
      setTitle('');
      setDescription('');
      setDueDate('');
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingReminder(null);
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  const saveReminder = async () => {
    if (!title.trim() || !dueDate) {
      toast.error('Title and due date are required');
      return;
    }

    setLoading(true);
    try {
      if (editingReminder) {
        await remindersAPI.update(editingReminder.id, {
          title,
          description,
          due_at: new Date(dueDate).toISOString(),
        });
        toast.success('Reminder updated');
      } else {
        await remindersAPI.create({
          title,
          description,
          due_at: new Date(dueDate).toISOString(),
        });
        toast.success('Reminder created');
      }
      closeModal();
      await loadReminders();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to save reminder');
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (reminder: Reminder) => {
    try {
      await remindersAPI.update(reminder.id, {
        completed: !reminder.completed,
      });
      await loadReminders();
      toast.success(reminder.completed ? 'Marked as incomplete' : 'Marked as complete');
    } catch (error) {
      toast.error('Failed to update reminder');
    }
  };

  const deleteReminder = async (id: number) => {
    if (!confirm('Delete this reminder?')) return;

    try {
      await remindersAPI.delete(id);
      toast.success('Reminder deleted');
      await loadReminders();
    } catch (error) {
      toast.error('Failed to delete reminder');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'overdue':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default:
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reminders</h1>
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            + New Reminder
          </button>
        </div>

        {/* Filters */}
        <div className="flex space-x-2 mb-6">
          {['', 'pending', 'overdue', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-md ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {f || 'All'}
            </button>
          ))}
        </div>

        {/* Reminders List */}
        <div className="space-y-3">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <input
                    type="checkbox"
                    checked={reminder.completed}
                    onChange={() => toggleComplete(reminder)}
                    className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <h3
                      className={`font-semibold text-gray-900 dark:text-white ${
                        reminder.completed ? 'line-through text-gray-500' : ''
                      }`}
                    >
                      {reminder.title}
                    </h3>
                    {reminder.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {reminder.description}
                      </p>
                    )}
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        📅 {format(new Date(reminder.due_at), 'PPp')}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(reminder.status)}`}>
                        {reminder.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openModal(reminder)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteReminder(reminder.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {reminders.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <div className="text-6xl mb-4">⏰</div>
              <p className="text-xl">No reminders found</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {editingReminder ? 'Edit Reminder' : 'New Reminder'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Reminder title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Reminder description"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Due Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 border dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={saveReminder}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
