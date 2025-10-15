import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { aiService } from '$lib/ai';
import { db, chats, messages } from '$lib/db';
import { eq, desc } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request, locals }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { message, chatId, model, temperature, maxTokens } = await request.json();

		// Validate input
		if (!message || typeof message !== 'string') {
			return json({ error: 'Message is required' }, { status: 400 });
		}

		if (message.length > 10000) {
			return json({ error: 'Message too long (max 10,000 characters)' }, { status: 400 });
		}

		let currentChatId = chatId;

		// Create new chat if none provided
		if (!currentChatId) {
			const newChat = await db.insert(chats).values({
				userId: locals.user.id,
				title: message.slice(0, 50) + (message.length > 50 ? '...' : '')
			}).returning();
			currentChatId = newChat[0].id;
		}

		// Verify chat belongs to user
		const chat = await db
			.select()
			.from(chats)
			.where(eq(chats.id, currentChatId))
			.limit(1);

		if (!chat[0] || chat[0].userId !== locals.user.id) {
			return json({ error: 'Chat not found' }, { status: 404 });
		}

		// Get recent chat history (last 10 messages)
		const chatHistory = await db
			.select()
			.from(messages)
			.where(eq(messages.chatId, currentChatId))
			.orderBy(desc(messages.createdAt))
			.limit(10);

		// Reverse to get chronological order
		chatHistory.reverse();

		// Build conversation context
		const conversationMessages = chatHistory.map(msg => ({
			role: msg.role as 'user' | 'assistant',
			content: msg.content
		}));

		// Add current user message
		conversationMessages.push({
			role: 'user' as const,
			content: message
		});

		// Save user message to database
		await db.insert(messages).values({
			chatId: currentChatId,
			role: 'user',
			content: message
		});

		// Generate AI response
		const result = await aiService.chat(conversationMessages, {
			model,
			temperature: temperature ? parseFloat(temperature) : undefined,
			maxTokens: maxTokens ? parseInt(maxTokens) : undefined
		});

		if (!result.success) {
			return json({ error: result.error }, { status: 500 });
		}

		// Save AI response to database
		await db.insert(messages).values({
			chatId: currentChatId,
			role: 'assistant',
			content: result.response!
		});

		// Update chat timestamp
		await db
			.update(chats)
			.set({ updatedAt: new Date() })
			.where(eq(chats.id, currentChatId));

		return json({
			success: true,
			response: result.response,
			chatId: currentChatId
		});
	} catch (error) {
		console.error('AI chat error:', error);
		return json(
			{ error: 'Failed to process chat message' },
			{ status: 500 }
		);
	}
};
