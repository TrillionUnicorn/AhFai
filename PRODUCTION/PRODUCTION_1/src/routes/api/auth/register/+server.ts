import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createUser, getUserByEmail, createSession, registerSchema } from '$lib/auth';
import type { ValidationErrors } from '$lib/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { email, password, name } = await request.json();

		// Validate input
		const errors: ValidationErrors = {};
		
		const emailError = registerSchema.email(email);
		if (emailError) errors.email = emailError;
		
		const passwordError = registerSchema.password(password);
		if (passwordError) errors.password = passwordError;
		
		const nameError = registerSchema.name(name);
		if (nameError) errors.name = nameError;

		if (Object.keys(errors).length > 0) {
			return json({ success: false, errors }, { status: 400 });
		}

		// Check if user already exists
		const existingUser = await getUserByEmail(email);
		if (existingUser) {
			return json(
				{ success: false, errors: { email: 'Email already registered' } },
				{ status: 400 }
			);
		}

		// Create user
		const user = await createUser(email, password, name);

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
			message: 'Account created successfully'
		});
	} catch (error) {
		console.error('Registration error:', error);
		return json(
			{ success: false, errors: { general: 'An error occurred during registration' } },
			{ status: 500 }
		);
	}
};
