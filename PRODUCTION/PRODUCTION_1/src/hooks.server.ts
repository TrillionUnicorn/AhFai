import type { Handle } from '@sveltejs/kit';
import { validateSession, deleteExpiredSessions } from '$lib/auth';

export const handle: Handle = async ({ event, resolve }) => {
	// Clean up expired sessions periodically (1% chance per request)
	if (Math.random() < 0.01) {
		deleteExpiredSessions().catch(console.error);
	}

	// Get session from cookie
	const sessionId = event.cookies.get('session');

	// Validate session and get user
	const { user, session } = await validateSession(sessionId);

	// Add user and session to locals for use in routes
	event.locals.user = user;
	event.locals.session = session;

	// If session is invalid, clear the cookie
	if (sessionId && !session) {
		event.cookies.delete('session', { path: '/' });
	}

	return resolve(event);
};
