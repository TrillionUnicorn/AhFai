import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db, notes } from '$lib/db';
import { eq, desc, like, or } from 'drizzle-orm';

// Get all notes for user with optional search
export const GET: RequestHandler = async ({ url, locals }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const search = url.searchParams.get('search');
		const limit = parseInt(url.searchParams.get('limit') || '50');
		const offset = parseInt(url.searchParams.get('offset') || '0');

		let query = db
			.select()
			.from(notes)
			.where(eq(notes.userId, locals.user.id));

		// Add search filter if provided
		if (search && search.trim()) {
			const searchTerm = `%${search.trim()}%`;
			query = query.where(
				or(
					like(notes.title, searchTerm),
					like(notes.content, searchTerm)
				)
			);
		}

		const userNotes = await query
			.orderBy(desc(notes.updatedAt))
			.limit(Math.min(limit, 100)) // Cap at 100
			.offset(offset);

		return json({
			success: true,
			notes: userNotes,
			pagination: {
				limit,
				offset,
				hasMore: userNotes.length === limit
			}
		});
	} catch (error) {
		console.error('Get notes error:', error);
		return json(
			{ error: 'Failed to get notes' },
			{ status: 500 }
		);
	}
};

// Create new note
export const POST: RequestHandler = async ({ request, locals }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { title, content } = await request.json();

		// Validate input
		if (!title || typeof title !== 'string') {
			return json({ error: 'Title is required' }, { status: 400 });
		}

		if (!content || typeof content !== 'string') {
			return json({ error: 'Content is required' }, { status: 400 });
		}

		if (title.length > 200) {
			return json({ error: 'Title too long (max 200 characters)' }, { status: 400 });
		}

		if (content.length > 50000) {
			return json({ error: 'Content too long (max 50,000 characters)' }, { status: 400 });
		}

		const newNote = await db.insert(notes).values({
			userId: locals.user.id,
			title: title.trim(),
			content: content.trim()
		}).returning();

		return json({
			success: true,
			note: newNote[0]
		});
	} catch (error) {
		console.error('Create note error:', error);
		return json(
			{ error: 'Failed to create note' },
			{ status: 500 }
		);
	}
};
