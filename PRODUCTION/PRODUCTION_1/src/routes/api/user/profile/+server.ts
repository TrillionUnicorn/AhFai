import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db, users } from '$lib/db';
import { eq } from 'drizzle-orm';
import { hashPassword, verifyPassword } from '$lib/auth';

// Get user profile
export const GET: RequestHandler = async ({ locals }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const user = await db
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

		if (!user[0]) {
			return json({ error: 'User not found' }, { status: 404 });
		}

		return json({
			success: true,
			user: user[0]
		});
	} catch (error) {
		console.error('Get profile error:', error);
		return json(
			{ error: 'Failed to get profile' },
			{ status: 500 }
		);
	}
};

// Update user profile
export const PATCH: RequestHandler = async ({ request, locals }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { name, email, currentPassword, newPassword } = await request.json();

		// Validate input
		if (name !== undefined) {
			if (!name || typeof name !== 'string') {
				return json({ error: 'Name is required' }, { status: 400 });
			}
			if (name.length < 2 || name.length > 50) {
				return json({ error: 'Name must be between 2 and 50 characters' }, { status: 400 });
			}
		}

		if (email !== undefined) {
			if (!email || typeof email !== 'string') {
				return json({ error: 'Email is required' }, { status: 400 });
			}
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
				return json({ error: 'Invalid email format' }, { status: 400 });
			}

			// Check if email is already taken by another user
			const existingUser = await db
				.select()
				.from(users)
				.where(eq(users.email, email))
				.limit(1);

			if (existingUser[0] && existingUser[0].id !== locals.user.id) {
				return json({ error: 'Email already taken' }, { status: 400 });
			}
		}

		// Handle password change
		if (newPassword !== undefined) {
			if (!currentPassword) {
				return json({ error: 'Current password is required to change password' }, { status: 400 });
			}

			// Verify current password
			const currentUser = await db
				.select()
				.from(users)
				.where(eq(users.id, locals.user.id))
				.limit(1);

			if (!currentUser[0]) {
				return json({ error: 'User not found' }, { status: 404 });
			}

			const isCurrentPasswordValid = await verifyPassword(currentPassword, currentUser[0].password);
			if (!isCurrentPasswordValid) {
				return json({ error: 'Current password is incorrect' }, { status: 400 });
			}

			// Validate new password
			if (newPassword.length < 8) {
				return json({ error: 'New password must be at least 8 characters' }, { status: 400 });
			}
			if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
				return json({ 
					error: 'New password must contain at least one uppercase letter, one lowercase letter, and one number' 
				}, { status: 400 });
			}
		}

		// Build update object
		const updateData: any = { updatedAt: new Date() };
		if (name !== undefined) updateData.name = name.trim();
		if (email !== undefined) updateData.email = email.trim();
		if (newPassword !== undefined) updateData.password = await hashPassword(newPassword);

		// Update user
		const updatedUser = await db
			.update(users)
			.set(updateData)
			.where(eq(users.id, locals.user.id))
			.returning({
				id: users.id,
				email: users.email,
				name: users.name,
				createdAt: users.createdAt,
				updatedAt: users.updatedAt
			});

		if (!updatedUser[0]) {
			return json({ error: 'Failed to update profile' }, { status: 500 });
		}

		return json({
			success: true,
			user: updatedUser[0],
			message: 'Profile updated successfully'
		});
	} catch (error) {
		console.error('Update profile error:', error);
		return json(
			{ error: 'Failed to update profile' },
			{ status: 500 }
		);
	}
};
