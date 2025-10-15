import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteSession } from '$lib/auth';

export const POST: RequestHandler = async ({ cookies }) => {
	try {
		const sessionId = cookies.get('session');

		if (sessionId) {
			await deleteSession(sessionId);
		}

		// Clear session cookie
		cookies.delete('session', { path: '/' });

		return json({
			success: true,
			message: 'Logged out successfully'
		});
	} catch (error) {
		console.error('Logout error:', error);
		return json(
			{ success: false, error: 'An error occurred during logout' },
			{ status: 500 }
		);
	}
};
