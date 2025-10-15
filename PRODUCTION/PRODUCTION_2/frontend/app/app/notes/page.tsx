'use client';

import { useState, useEffect } from 'react';
import { notesAPI } from '@/lib/api';
import toast from 'react-hot-toast';

interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNotes();
  }, [search]);

  const loadNotes = async () => {
    try {
      const data = await notesAPI.list({ search: search || undefined });
      setNotes(data);
    } catch (error) {
      toast.error('Failed to load notes');
    }
  };

  const createNote = () => {
    setSelectedNote(null);
    setTitle('');
    setContent('');
    setIsEditing(true);
  };

  const editNote = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(true);
  };

  const saveNote = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    setLoading(true);
    try {
      if (selectedNote) {
        await notesAPI.update(selectedNote.id, { title, content });
        toast.success('Note updated');
      } else {
        await notesAPI.create({ title, content });
        toast.success('Note created');
      }
      setIsEditing(false);
      setSelectedNote(null);
      setTitle('');
      setContent('');
      await loadNotes();
    } catch (error) {
      toast.error('Failed to save note');
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id: number) => {
    if (!confirm('Delete this note?')) return;

    try {
      await notesAPI.delete(id);
      toast.success('Note deleted');
      if (selectedNote?.id === id) {
        setSelectedNote(null);
        setIsEditing(false);
      }
      await loadNotes();
    } catch (error) {
      toast.error('Failed to delete note');
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setSelectedNote(null);
    setTitle('');
    setContent('');
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Sidebar */}
      <div className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow p-4 overflow-y-auto">
        <div className="mb-4">
          <button
            onClick={createNote}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-3"
          >
            + New Note
          </button>
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-3 rounded-md cursor-pointer ${
                selectedNote?.id === note.id && !isEditing
                  ? 'bg-blue-50 dark:bg-blue-900'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div onClick={() => editNote(note)}>
                <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                  {note.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {note.content}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {new Date(note.updated_at).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id);
                }}
                className="mt-2 text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
          {notes.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              {search ? 'No notes found' : 'No notes yet'}
            </p>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {isEditing ? (
          <div className="h-full flex flex-col">
            <input
              type="text"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold mb-4 px-4 py-2 border dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <textarea
              placeholder="Note content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 px-4 py-2 border dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 border dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={saveNote}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        ) : selectedNote ? (
          <div className="h-full flex flex-col">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {selectedNote.title}
            </h1>
            <div className="flex-1 overflow-y-auto whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {selectedNote.content}
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {new Date(selectedNote.updated_at).toLocaleString()}
              </p>
              <button
                onClick={() => editNote(selectedNote)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Edit
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-xl">Select a note or create a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
