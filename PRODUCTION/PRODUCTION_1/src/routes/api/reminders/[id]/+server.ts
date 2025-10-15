import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db, reminders } from '$lib/db';
import { eq, and } from 'drizzle-orm';

// Get specific reminder
export const GET: RequestHandler = async ({ params, locals }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const reminderId = parseInt(params.id);
		if (isNaN(reminderId)) {
			return json({ error: 'Invalid reminder ID' }, { status: 400 });
		}

		// Get reminder and verify ownership
		const reminder = await db
			.select()
			.from(reminders)
			.where(and(eq(reminders.id, reminderId), eq(reminders.userId, locals.user.id)))
			.limit(1);

		if (!reminder[0]) {
			return json({ error: 'Reminder not found' }, { status: 404 });
		}

		// Add status
		const now = new Date();
		const reminderWithStatus = {
			...reminder[0],
			status: reminder[0].completed 
				? 'completed' 
				: reminder[0].dueAt <= now 
					? 'overdue' 
					: 'pending'
		};

		return json({
			success: true,
			reminder: reminderWithStatus
		});
	} catch (error) {
		console.error('Get reminder error:', error);
		return json(
			{ error: 'Failed to get reminder' },
			{ status: 500 }
		);
	}
};

// Update reminder
export const PATCH: RequestHandler = async ({ params, request, locals }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const reminderId = parseInt(params.id);
		if (isNaN(reminderId)) {
			return json({ error: 'Invalid reminder ID' }, { status: 400 });
		}

		const { title, description, dueAt, completed } = await request.json();

		// Validate input
		if (title !== undefined) {
			if (!title || typeof title !== 'string') {
				return json({ error: 'Title is required' }, { status: 400 });
			}
			if (title.length > 200) {
				return json({ error: 'Title too long (max 200 characters)' }, { status: 400 });
			}
		}

		if (description !== undefined && description !== null) {
			if (typeof description !== 'string') {
				return json({ error: 'Description must be a string' }, { status: 400 });
			}
			if (description.length > 1000) {
				return json({ error: 'Description too long (max 1,000 characters)' }, { status: 400 });
			}
		}

		if (dueAt !== undefined) {
			const dueDate = new Date(dueAt);
			if (isNaN(dueDate.getTime())) {
				return json({ error: 'Invalid due date' }, { status: 400 });
			}
		}

		if (completed !== undefined && typeof completed !== 'boolean') {
			return json({ error: 'Completed must be a boolean' }, { status: 400 });
		}

		// Build update object
		const updateData: any = { updatedAt: new Date() };
		if (title !== undefined) updateData.title = title.trim();
		if (description !== undefined) updateData.description = description?.trim() || null;
		if (dueAt !== undefined) updateData.dueAt = new Date(dueAt);
		if (completed !== undefined) updateData.completed = completed;

		// Update reminder and verify ownership
		const updatedReminder = await db
			.update(reminders)
			.set(updateData)
			.where(and(eq(reminders.id, reminderId), eq(reminders.userId, locals.user.id)))
			.returning();

		if (!updatedReminder[0]) {
			return json({ error: 'Reminder not found' }, { status: 404 });
		}

		// Add status
		const now = new Date();
		const reminderWithStatus = {
			...updatedReminder[0],
			status: updatedReminder[0].completed 
				? 'completed' 
				: updatedReminder[0].dueAt <= now 
					? 'overdue' 
					: 'pending'
		};

		return json({
			success: true,
			reminder: reminderWithStatus
		});
	} catch (error) {
		console.error('Update reminder error:', error);
		return json(
			{ error: 'Failed to update reminder' },
			{ status: 500 }
		);
	}
};

// Delete reminder
export const DELETE: RequestHandler = async ({ params, locals }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const reminderId = parseInt(params.id);
		if (isNaN(reminderId)) {
			return json({ error: 'Invalid reminder ID' }, { status: 400 });
		}

		// Delete reminder and verify ownership
		const deletedReminder = await db
			.delete(reminders)
			.where(and(eq(reminders.id, reminderId), eq(reminders.userId, locals.user.id)))
			.returning();

		if (!deletedReminder[0]) {
			return json({ error: 'Reminder not found' }, { status: 404 });
		}

		return json({
			success: true,
			message: 'Reminder deleted successfully'
		});
	} catch (error) {
		console.error('Delete reminder error:', error);
		return json(
			{ error: 'Failed to delete reminder' },
			{ status: 500 }
		);
	}
};
