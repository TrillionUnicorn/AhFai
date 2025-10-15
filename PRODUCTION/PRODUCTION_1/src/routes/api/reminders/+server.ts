import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db, reminders } from '$lib/db';
import { eq, desc, gte, lte, and } from 'drizzle-orm';

// Get all reminders for user with optional filters
export const GET: RequestHandler = async ({ url, locals }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const status = url.searchParams.get('status'); // 'pending', 'completed', 'overdue'
		const limit = parseInt(url.searchParams.get('limit') || '50');
		const offset = parseInt(url.searchParams.get('offset') || '0');

		let query = db
			.select()
			.from(reminders)
			.where(eq(reminders.userId, locals.user.id));

		// Add status filter
		const now = new Date();
		if (status === 'pending') {
			query = query.where(
				and(
					eq(reminders.completed, false),
					gte(reminders.dueAt, now)
				)
			);
		} else if (status === 'completed') {
			query = query.where(eq(reminders.completed, true));
		} else if (status === 'overdue') {
			query = query.where(
				and(
					eq(reminders.completed, false),
					lte(reminders.dueAt, now)
				)
			);
		}

		const userReminders = await query
			.orderBy(reminders.dueAt)
			.limit(Math.min(limit, 100)) // Cap at 100
			.offset(offset);

		// Add status to each reminder
		const remindersWithStatus = userReminders.map(reminder => ({
			...reminder,
			status: reminder.completed 
				? 'completed' 
				: reminder.dueAt <= now 
					? 'overdue' 
					: 'pending'
		}));

		return json({
			success: true,
			reminders: remindersWithStatus,
			pagination: {
				limit,
				offset,
				hasMore: userReminders.length === limit
			}
		});
	} catch (error) {
		console.error('Get reminders error:', error);
		return json(
			{ error: 'Failed to get reminders' },
			{ status: 500 }
		);
	}
};

// Create new reminder
export const POST: RequestHandler = async ({ request, locals }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { title, description, dueAt } = await request.json();

		// Validate input
		if (!title || typeof title !== 'string') {
			return json({ error: 'Title is required' }, { status: 400 });
		}

		if (!dueAt) {
			return json({ error: 'Due date is required' }, { status: 400 });
		}

		if (title.length > 200) {
			return json({ error: 'Title too long (max 200 characters)' }, { status: 400 });
		}

		if (description && description.length > 1000) {
			return json({ error: 'Description too long (max 1,000 characters)' }, { status: 400 });
		}

		// Parse and validate due date
		const dueDate = new Date(dueAt);
		if (isNaN(dueDate.getTime())) {
			return json({ error: 'Invalid due date' }, { status: 400 });
		}

		// Check if due date is in the past (allow up to 1 minute in the past for clock skew)
		const now = new Date();
		if (dueDate < new Date(now.getTime() - 60000)) {
			return json({ error: 'Due date cannot be in the past' }, { status: 400 });
		}

		const newReminder = await db.insert(reminders).values({
			userId: locals.user.id,
			title: title.trim(),
			description: description?.trim() || null,
			dueAt: dueDate
		}).returning();

		return json({
			success: true,
			reminder: {
				...newReminder[0],
				status: 'pending'
			}
		});
	} catch (error) {
		console.error('Create reminder error:', error);
		return json(
			{ error: 'Failed to create reminder' },
			{ status: 500 }
		);
	}
};
