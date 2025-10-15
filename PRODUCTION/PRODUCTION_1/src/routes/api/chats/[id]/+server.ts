import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db, chats, messages } from '$lib/db';
import { eq, and } from 'drizzle-orm';

// Get specific chat with messages
export const GET: RequestHandler = async ({ params, locals }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const chatId = parseInt(params.id);
		if (isNaN(chatId)) {
			return json({ error: 'Invalid chat ID' }, { status: 400 });
		}

		// Get chat and verify ownership
		const chat = await db
			.select()
			.from(chats)
			.where(and(eq(chats.id, chatId), eq(chats.userId, locals.user.id)))
			.limit(1);

		if (!chat[0]) {
			return json({ error: 'Chat not found' }, { status: 404 });
		}

		// Get chat messages
		const chatMessages = await db
			.select()
			.from(messages)
			.where(eq(messages.chatId, chatId))
			.orderBy(messages.createdAt);

		return json({
			success: true,
			chat: chat[0],
			messages: chatMessages
		});
	} catch (error) {
		console.error('Get chat error:', error);
		return json(
			{ error: 'Failed to get chat' },
			{ status: 500 }
		);
	}
};

// Update chat title
export const PATCH: RequestHandler = async ({ params, request, locals }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const chatId = parseInt(params.id);
		if (isNaN(chatId)) {
			return json({ error: 'Invalid chat ID' }, { status: 400 });
		}

		const { title } = await request.json();

		if (!title || typeof title !== 'string') {
			return json({ error: 'Title is required' }, { status: 400 });
		}

		if (title.length > 100) {
			return json({ error: 'Title too long (max 100 characters)' }, { status: 400 });
		}

		// Update chat and verify ownership
		const updatedChat = await db
			.update(chats)
			.set({ 
				title: title.trim(),
				updatedAt: new Date()
			})
			.where(and(eq(chats.id, chatId), eq(chats.userId, locals.user.id)))
			.returning();

		if (!updatedChat[0]) {
			return json({ error: 'Chat not found' }, { status: 404 });
		}

		return json({
			success: true,
			chat: updatedChat[0]
		});
	} catch (error) {
		console.error('Update chat error:', error);
		return json(
			{ error: 'Failed to update chat' },
			{ status: 500 }
		);
	}
};

// Delete chat
export const DELETE: RequestHandler = async ({ params, locals }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const chatId = parseInt(params.id);
		if (isNaN(chatId)) {
			return json({ error: 'Invalid chat ID' }, { status: 400 });
		}

		// Delete chat and verify ownership (messages will be deleted via cascade)
		const deletedChat = await db
			.delete(chats)
			.where(and(eq(chats.id, chatId), eq(chats.userId, locals.user.id)))
			.returning();

		if (!deletedChat[0]) {
			return json({ error: 'Chat not found' }, { status: 404 });
		}

		return json({
			success: true,
			message: 'Chat deleted successfully'
		});
	} catch (error) {
		console.error('Delete chat error:', error);
		return json(
			{ error: 'Failed to delete chat' },
			{ status: 500 }
		);
	}
};
