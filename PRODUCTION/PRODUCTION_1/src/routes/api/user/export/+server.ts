import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db, users, chats, messages, notes, reminders } from '$lib/db';
import { eq } from 'drizzle-orm';

// Export all user data
export const GET: RequestHandler = async ({ locals }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		// Get user profile
		const userProfile = await db
			.select({
				id: users.id,
				email: users.email,
				name: users.name,
				createdAt: users.createdAt,
				updatedAt: users.updatedAt
			})
			.from(users)
			.where(eq(users.id, locals.user.id))
			.limit(1);

		// Get all chats with messages
		const userChats = await db
			.select()
			.from(chats)
			.where(eq(chats.userId, locals.user.id));

		const chatsWithMessages = await Promise.all(
			userChats.map(async (chat) => {
				const chatMessages = await db
					.select()
					.from(messages)
					.where(eq(messages.chatId, chat.id))
					.orderBy(messages.createdAt);

				return {
					...chat,
					messages: chatMessages
				};
			})
		);

		// Get all notes
		const userNotes = await db
			.select()
			.from(notes)
			.where(eq(notes.userId, locals.user.id));

		// Get all reminders
		const userReminders = await db
			.select()
			.from(reminders)
			.where(eq(reminders.userId, locals.user.id));

		// Build export data
		const exportData = {
			exportInfo: {
				exportedAt: new Date().toISOString(),
				version: '1.0',
				application: 'AhFai'
			},
			user: userProfile[0],
			chats: chatsWithMessages,
			notes: userNotes,
			reminders: userReminders,
			statistics: {
				totalChats: chatsWithMessages.length,
				totalMessages: chatsWithMessages.reduce((sum, chat) => sum + chat.messages.length, 0),
				totalNotes: userNotes.length,
				totalReminders: userReminders.length
			}
		};

		return json({
			success: true,
			data: exportData
		});
	} catch (error) {
		console.error('Export data error:', error);
		return json(
			{ error: 'Failed to export data' },
			{ status: 500 }
		);
	}
};
