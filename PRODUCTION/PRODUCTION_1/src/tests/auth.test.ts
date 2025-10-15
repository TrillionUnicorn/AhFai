import { describe, it, expect, beforeEach } from 'vitest';
import { hashPassword, verifyPassword, registerSchema, loginSchema } from '$lib/auth';

describe('Authentication Utilities', () => {
	describe('Password Hashing', () => {
		it('should hash a password', async () => {
			const password = 'TestPassword123';
			const hash = await hashPassword(password);
			
			expect(hash).toBeDefined();
			expect(hash).not.toBe(password);
			expect(hash.length).toBeGreaterThan(0);
		});

		it('should create different hashes for the same password', async () => {
			const password = 'TestPassword123';
			const hash1 = await hashPassword(password);
			const hash2 = await hashPassword(password);
			
			expect(hash1).not.toBe(hash2);
		});

		it('should verify correct password', async () => {
			const password = 'TestPassword123';
			const hash = await hashPassword(password);
			const isValid = await verifyPassword(password, hash);
			
			expect(isValid).toBe(true);
		});

		it('should reject incorrect password', async () => {
			const password = 'TestPassword123';
			const wrongPassword = 'WrongPassword123';
			const hash = await hashPassword(password);
			const isValid = await verifyPassword(wrongPassword, hash);
			
			expect(isValid).toBe(false);
		});
	});

	describe('Registration Validation', () => {
		describe('Email Validation', () => {
			it('should accept valid email', () => {
				const error = registerSchema.email('test@example.com');
				expect(error).toBeNull();
			});

			it('should reject empty email', () => {
				const error = registerSchema.email('');
				expect(error).toBe('Email is required');
			});

			it('should reject invalid email format', () => {
				const error = registerSchema.email('invalid-email');
				expect(error).toBe('Invalid email format');
			});

			it('should reject email without domain', () => {
				const error = registerSchema.email('test@');
				expect(error).toBe('Invalid email format');
			});
		});

		describe('Password Validation', () => {
			it('should accept valid password', () => {
				const error = registerSchema.password('TestPass123');
				expect(error).toBeNull();
			});

			it('should reject short password', () => {
				const error = registerSchema.password('Test1');
				expect(error).toBe('Password must be at least 8 characters');
			});

			it('should reject password without uppercase', () => {
				const error = registerSchema.password('testpass123');
				expect(error).toContain('uppercase');
			});

			it('should reject password without lowercase', () => {
				const error = registerSchema.password('TESTPASS123');
				expect(error).toContain('lowercase');
			});

			it('should reject password without number', () => {
				const error = registerSchema.password('TestPassword');
				expect(error).toContain('number');
			});
		});

		describe('Name Validation', () => {
			it('should accept valid name', () => {
				const error = registerSchema.name('John Doe');
				expect(error).toBeNull();
			});

			it('should reject empty name', () => {
				const error = registerSchema.name('');
				expect(error).toBe('Name must be at least 2 characters');
			});

			it('should reject single character name', () => {
				const error = registerSchema.name('J');
				expect(error).toBe('Name must be at least 2 characters');
			});

			it('should reject too long name', () => {
				const longName = 'a'.repeat(51);
				const error = registerSchema.name(longName);
				expect(error).toBe('Name must be less than 50 characters');
			});
		});
	});

	describe('Login Validation', () => {
		it('should accept valid email', () => {
			const error = loginSchema.email('test@example.com');
			expect(error).toBeNull();
		});

		it('should reject empty email', () => {
			const error = loginSchema.email('');
			expect(error).toBe('Email is required');
		});

		it('should accept any password', () => {
			const error = loginSchema.password('anypassword');
			expect(error).toBeNull();
		});

		it('should reject empty password', () => {
			const error = loginSchema.password('');
			expect(error).toBe('Password is required');
		});
	});
});
