import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db, chats, messages } from '$lib/db';
import { eq, desc } from 'drizzle-orm';

// Get all chats for user
export const GET: RequestHandler = async ({ locals }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const userChats = await db
			.select()
			.from(chats)
			.where(eq(chats.userId, locals.user.id))
			.orderBy(desc(chats.updatedAt));

		return json({
			success: true,
			chats: userChats
		});
	} catch (error) {
		console.error('Get chats error:', error);
		return json(
			{ error: 'Failed to get chats' },
			{ status: 500 }
		);
	}
};

// Create new chat
export const POST: RequestHandler = async ({ request, locals }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { title } = await request.json();

		if (!title || typeof title !== 'string') {
			return json({ error: 'Title is required' }, { status: 400 });
		}

		if (title.length > 100) {
			return json({ error: 'Title too long (max 100 characters)' }, { status: 400 });
		}

		const newChat = await db.insert(chats).values({
			userId: locals.user.id,
			title: title.trim()
		}).returning();

		return json({
			success: true,
			chat: newChat[0]
		});
	} catch (error) {
		console.error('Create chat error:', error);
		return json(
			{ error: 'Failed to create chat' },
			{ status: 500 }
		);
	}
};
