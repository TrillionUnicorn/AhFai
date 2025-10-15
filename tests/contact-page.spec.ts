import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/contact');
	});

	test('should load contact page successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/Contact/);
		await expect(page.getByRole('heading', { name: /Get in Touch/i })).toBeVisible();
	});

	test('should display contact form', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Send us a message/i })).toBeVisible();
		await expect(page.getByLabel(/Name/i)).toBeVisible();
		await expect(page.getByLabel(/Email/i)).toBeVisible();
		await expect(page.getByLabel(/Subject/i)).toBeVisible();
		await expect(page.getByLabel(/Message/i)).toBeVisible();
	});

	test('should submit contact form successfully', async ({ page }) => {
		await page.getByLabel(/Name/i).fill('John Doe');
		await page.getByLabel(/Email/i).fill('john@example.com');
		await page.getByLabel(/Subject/i).fill('Test Subject');
		await page.getByLabel(/Message/i).fill('This is a test message');
		
		await page.getByRole('button', { name: /Send Message/i }).click();
		
		// Check for success message
		await expect(page.getByText(/Message Sent!/i)).toBeVisible({ timeout: 5000 });
	});

	test('should validate required fields', async ({ page }) => {
		const submitButton = page.getByRole('button', { name: /Send Message/i });
		await submitButton.click();
		
		// HTML5 validation should prevent submission
		const nameInput = page.getByLabel(/Name/i);
		const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
		expect(isInvalid).toBeTruthy();
	});

	test('should validate email format', async ({ page }) => {
		await page.getByLabel(/Email/i).fill('invalid-email');
		
		const emailInput = page.getByLabel(/Email/i);
		const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
		expect(isInvalid).toBeTruthy();
	});

	test('should display contact information', async ({ page }) => {
		await expect(page.getByText(/Contact Information/i)).toBeVisible();
		await expect(page.getByText(/hello@ahfai\.com/i)).toBeVisible();
		await expect(page.getByText(/Remote-first company/i)).toBeVisible();
		await expect(page.getByText(/Within 24 hours/i)).toBeVisible();
	});

	test('should display social media links', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Follow Us/i })).toBeVisible();
		await expect(page.getByRole('link', { name: /Twitter/i })).toBeVisible();
		await expect(page.getByRole('link', { name: /LinkedIn/i })).toBeVisible();
		await expect(page.getByRole('link', { name: /GitHub/i })).toBeVisible();
		await expect(page.getByRole('link', { name: /Discord/i })).toBeVisible();
	});

	test('should display founder information', async ({ page }) => {
		await expect(page.getByText(/Meet the Founder/i)).toBeVisible();
		await expect(page.getByText(/Hunter Ho/)).toBeVisible();
		await expect(page.getByText(/Founder & CEO/i)).toBeVisible();
	});

	test('should have working social media links', async ({ page }) => {
		const githubLink = page.getByRole('link', { name: /GitHub/i });
		await expect(githubLink).toHaveAttribute('href', /github\.com/);
		
		const linkedinLink = page.getByRole('link', { name: /LinkedIn/i });
		await expect(linkedinLink).toHaveAttribute('href', /linkedin\.com/);
	});

	test('should show loading state when submitting', async ({ page }) => {
		await page.getByLabel(/Name/i).fill('Test User');
		await page.getByLabel(/Email/i).fill('test@example.com');
		await page.getByLabel(/Subject/i).fill('Test');
		await page.getByLabel(/Message/i).fill('Test message');
		
		await page.getByRole('button', { name: /Send Message/i }).click();
		
		// Check for loading state
		await expect(page.getByText(/Sending.../i)).toBeVisible({ timeout: 1000 });
	});

	test('should reset form after successful submission', async ({ page }) => {
		await page.getByLabel(/Name/i).fill('Test User');
		await page.getByLabel(/Email/i).fill('test@example.com');
		await page.getByLabel(/Subject/i).fill('Test');
		await page.getByLabel(/Message/i).fill('Test message');
		
		await page.getByRole('button', { name: /Send Message/i }).click();
		
		// Wait for success message
		await expect(page.getByText(/Message Sent!/i)).toBeVisible({ timeout: 5000 });
		
		// Wait for form to reset (3 seconds as per code)
		await page.waitForTimeout(3500);
		
		// Check form is reset
		await expect(page.getByLabel(/Name/i)).toHaveValue('');
	});

	test('should be responsive on mobile', async ({ page, viewport }) => {
		if (viewport && viewport.width < 768) {
			// Check that form and contact info stack vertically
			const form = page.locator('form');
			const contactInfo = page.getByText(/Contact Information/i);
			
			await expect(form).toBeVisible();
			await expect(contactInfo).toBeVisible();
		}
	});

	test('should load without console errors', async ({ page }) => {
		const errors: string[] = [];
		page.on('console', msg => {
			if (msg.type() === 'error') {
				errors.push(msg.text());
			}
		});
		
		await page.goto('/contact');
		await page.waitForLoadState('networkidle');
		
		expect(errors).toHaveLength(0);
	});

	test('should have proper form accessibility', async ({ page }) => {
		// Check all inputs have labels
		const nameInput = page.getByLabel(/Name/i);
		const emailInput = page.getByLabel(/Email/i);
		const subjectInput = page.getByLabel(/Subject/i);
		const messageInput = page.getByLabel(/Message/i);
		
		await expect(nameInput).toBeVisible();
		await expect(emailInput).toBeVisible();
		await expect(subjectInput).toBeVisible();
		await expect(messageInput).toBeVisible();
	});
});

