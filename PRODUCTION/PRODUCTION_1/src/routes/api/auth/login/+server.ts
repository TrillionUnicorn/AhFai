import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { authenticateUser, createSession, loginSchema } from '$lib/auth';
import type { ValidationErrors } from '$lib/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { email, password } = await request.json();

		// Validate input
		const errors: ValidationErrors = {};
		
		const emailError = loginSchema.email(email);
		if (emailError) errors.email = emailError;
		
		const passwordError = loginSchema.password(password);
		if (passwordError) errors.password = passwordError;

		if (Object.keys(errors).length > 0) {
			return json({ success: false, errors }, { status: 400 });
		}

		// Authenticate user
		const user = await authenticateUser(email, password);
		if (!user) {
			return json(
				{ success: false, errors: { general: 'Invalid email or password' } },
				{ status: 401 }
			);
		}

		// Create session
		const sessionId = await createSession(user.id);

		// Set session cookie
		cookies.set('session', sessionId, {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 30 * 24 * 60 * 60 // 30 days
		});

		// Return user data (without password)
		const { password: _, ...userWithoutPassword } = user;

		return json({
			success: true,
			user: userWithoutPassword,
			message: 'Logged in successfully'
		});
	} catch (error) {
		console.error('Login error:', error);
		return json(
			{ success: false, errors: { general: 'An error occurred during login' } },
			{ status: 500 }
		);
	}
};
