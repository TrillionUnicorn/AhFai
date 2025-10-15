import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db, users, sessions } from '$lib/db';
import { eq } from 'drizzle-orm';
import { verifyPassword } from '$lib/auth';

// Delete user account
export const DELETE: RequestHandler = async ({ request, locals, cookies }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { password, confirmation } = await request.json();

		// Validate input
		if (!password) {
			return json({ error: 'Password is required' }, { status: 400 });
		}

		if (confirmation !== 'DELETE') {
			return json({ error: 'Please type DELETE to confirm account deletion' }, { status: 400 });
		}

		// Get current user with password
		const currentUser = await db
			.select()
			.from(users)
			.where(eq(users.id, locals.user.id))
			.limit(1);

		if (!currentUser[0]) {
			return json({ error: 'User not found' }, { status: 404 });
		}

		// Verify password
		const isPasswordValid = await verifyPassword(password, currentUser[0].password);
		if (!isPasswordValid) {
			return json({ error: 'Incorrect password' }, { status: 400 });
		}

		// Delete user (this will cascade delete all related data)
		await db.delete(users).where(eq(users.id, locals.user.id));

		// Clear session cookie
		cookies.delete('session', { path: '/' });

		return json({
			success: true,
			message: 'Account deleted successfully'
		});
	} catch (error) {
		console.error('Delete account error:', error);
		return json(
			{ error: 'Failed to delete account' },
			{ status: 500 }
		);
	}
};
