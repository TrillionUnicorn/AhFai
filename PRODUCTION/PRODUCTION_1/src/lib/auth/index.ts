import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { db, users, sessions, type User, type Session } from '../db';
import { eq, and, gt } from 'drizzle-orm';

// Password hashing
export async function hashPassword(password: string): Promise<string> {
	const saltRounds = 12;
	return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
	return bcrypt.compare(password, hash);
}

// Session management
export async function createSession(userId: number): Promise<string> {
	const sessionId = uuidv4();
	const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

	await db.insert(sessions).values({
		id: sessionId,
		userId,
		expiresAt
	});

	return sessionId;
}

export async function getSession(sessionId: string): Promise<Session | null> {
	const session = await db
		.select()
		.from(sessions)
		.where(and(eq(sessions.id, sessionId), gt(sessions.expiresAt, new Date())))
		.limit(1);

	return session[0] || null;
}

export async function deleteSession(sessionId: string): Promise<void> {
	await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export async function deleteExpiredSessions(): Promise<void> {
	await db.delete(sessions).where(gt(new Date(), sessions.expiresAt));
}

// User management
export async function createUser(email: string, password: string, name: string): Promise<User> {
	const hashedPassword = await hashPassword(password);

	const result = await db
		.insert(users)
		.values({
			email,
			password: hashedPassword,
			name
		})
		.returning();

	return result[0];
}

export async function getUserByEmail(email: string): Promise<User | null> {
	const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
	return user[0] || null;
}

export async function getUserById(id: number): Promise<User | null> {
	const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
	return user[0] || null;
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
	const user = await getUserByEmail(email);
	if (!user) return null;

	const isValid = await verifyPassword(password, user.password);
	if (!isValid) return null;

	return user;
}

// Session validation for requests
export async function validateSession(sessionId: string | undefined): Promise<{
	user: User | null;
	session: Session | null;
}> {
	if (!sessionId) {
		return { user: null, session: null };
	}

	const session = await getSession(sessionId);
	if (!session) {
		return { user: null, session: null };
	}

	const user = await getUserById(session.userId);
	if (!user) {
		// Clean up orphaned session
		await deleteSession(sessionId);
		return { user: null, session: null };
	}

	return { user, session };
}

// Validation schemas
export const registerSchema = {
	email: (email: string) => {
		if (!email || email.length < 3) return 'Email is required';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format';
		return null;
	},
	password: (password: string) => {
		if (!password || password.length < 8) return 'Password must be at least 8 characters';
		if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
			return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
		}
		return null;
	},
	name: (name: string) => {
		if (!name || name.length < 2) return 'Name must be at least 2 characters';
		if (name.length > 50) return 'Name must be less than 50 characters';
		return null;
	}
};

export const loginSchema = {
	email: (email: string) => {
		if (!email) return 'Email is required';
		return null;
	},
	password: (password: string) => {
		if (!password) return 'Password is required';
		return null;
	}
};

// Types
export interface AuthResult {
	success: boolean;
	user?: User;
	error?: string;
	sessionId?: string;
}

export interface ValidationErrors {
	email?: string;
	password?: string;
	name?: string;
	general?: string;
}
