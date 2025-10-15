import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db, notes } from '$lib/db';
import { eq, and } from 'drizzle-orm';

// Get specific note
export const GET: RequestHandler = async ({ params, locals }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const noteId = parseInt(params.id);
		if (isNaN(noteId)) {
			return json({ error: 'Invalid note ID' }, { status: 400 });
		}

		// Get note and verify ownership
		const note = await db
			.select()
			.from(notes)
			.where(and(eq(notes.id, noteId), eq(notes.userId, locals.user.id)))
			.limit(1);

		if (!note[0]) {
			return json({ error: 'Note not found' }, { status: 404 });
		}

		return json({
			success: true,
			note: note[0]
		});
	} catch (error) {
		console.error('Get note error:', error);
		return json(
			{ error: 'Failed to get note' },
			{ status: 500 }
		);
	}
};

// Update note
export const PATCH: RequestHandler = async ({ params, request, locals }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const noteId = parseInt(params.id);
		if (isNaN(noteId)) {
			return json({ error: 'Invalid note ID' }, { status: 400 });
		}

		const { title, content } = await request.json();

		// Validate input
		if (title !== undefined) {
			if (!title || typeof title !== 'string') {
				return json({ error: 'Title is required' }, { status: 400 });
			}
			if (title.length > 200) {
				return json({ error: 'Title too long (max 200 characters)' }, { status: 400 });
			}
		}

		if (content !== undefined) {
			if (!content || typeof content !== 'string') {
				return json({ error: 'Content is required' }, { status: 400 });
			}
			if (content.length > 50000) {
				return json({ error: 'Content too long (max 50,000 characters)' }, { status: 400 });
			}
		}

		// Build update object
		const updateData: any = { updatedAt: new Date() };
		if (title !== undefined) updateData.title = title.trim();
		if (content !== undefined) updateData.content = content.trim();

		// Update note and verify ownership
		const updatedNote = await db
			.update(notes)
			.set(updateData)
			.where(and(eq(notes.id, noteId), eq(notes.userId, locals.user.id)))
			.returning();

		if (!updatedNote[0]) {
			return json({ error: 'Note not found' }, { status: 404 });
		}

		return json({
			success: true,
			note: updatedNote[0]
		});
	} catch (error) {
		console.error('Update note error:', error);
		return json(
			{ error: 'Failed to update note' },
			{ status: 500 }
		);
	}
};

// Delete note
export const DELETE: RequestHandler = async ({ params, locals }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const noteId = parseInt(params.id);
		if (isNaN(noteId)) {
			return json({ error: 'Invalid note ID' }, { status: 400 });
		}

		// Delete note and verify ownership
		const deletedNote = await db
			.delete(notes)
			.where(and(eq(notes.id, noteId), eq(notes.userId, locals.user.id)))
			.returning();

		if (!deletedNote[0]) {
			return json({ error: 'Note not found' }, { status: 404 });
		}

		return json({
			success: true,
			message: 'Note deleted successfully'
		});
	} catch (error) {
		console.error('Delete note error:', error);
		return json(
			{ error: 'Failed to delete note' },
			{ status: 500 }
		);
	}
};
