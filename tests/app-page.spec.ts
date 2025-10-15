import { test, expect } from '@playwright/test';

test.describe('App Page - Product Features', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/app');
	});

	test('should load app page successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/AhFai App/);
		await expect(page.getByText(/Welcome to AhFai/i)).toBeVisible();
	});

	test('should display privacy indicator', async ({ page }) => {
		await expect(page.getByText(/All data processed locally/i)).toBeVisible();
	});

	test('should have three tabs', async ({ page }) => {
		await expect(page.getByRole('button', { name: /AI Chat/i })).toBeVisible();
		await expect(page.getByRole('button', { name: /Notes/i })).toBeVisible();
		await expect(page.getByRole('button', { name: /Reminders/i })).toBeVisible();
	});

	test.describe('AI Chat Tab', () => {
		test('should display welcome message', async ({ page }) => {
			await expect(page.getByText(/Hi! I'm AhFai/i)).toBeVisible();
		});

		test('should send and receive messages', async ({ page }) => {
			const input = page.getByPlaceholder(/Ask me anything/i);
			const sendButton = page.getByRole('button', { name: /Send/i });
			
			await input.fill('Hello, how are you?');
			await sendButton.click();
			
			// Check user message appears
			await expect(page.getByText('Hello, how are you?')).toBeVisible();
			
			// Wait for AI response
			await expect(page.locator('.animate-bounce')).toBeVisible({ timeout: 2000 });
			
			// Check AI response appears
			await page.waitForTimeout(2000);
			const messages = page.locator('[class*="text-white"]').filter({ hasText: /.+/ });
			const count = await messages.count();
			expect(count).toBeGreaterThan(1);
		});

		test('should support Enter key to send', async ({ page }) => {
			const input = page.getByPlaceholder(/Ask me anything/i);
			
			await input.fill('Test message');
			await input.press('Enter');
			
			await expect(page.getByText('Test message')).toBeVisible();
		});

		test('should disable send button when input is empty', async ({ page }) => {
			const sendButton = page.getByRole('button', { name: /Send/i });
			await expect(sendButton).toBeDisabled();
		});
	});

	test.describe('Notes Tab', () => {
		test.beforeEach(async ({ page }) => {
			await page.getByRole('button', { name: /Notes/i }).click();
		});

		test('should display notes interface', async ({ page }) => {
			await expect(page.getByText(/Create New Note/i)).toBeVisible();
			await expect(page.getByText(/Your Notes/i)).toBeVisible();
		});

		test('should create a new note', async ({ page }) => {
			await page.getByLabel(/Title/i).fill('Test Note');
			await page.getByLabel(/Content/i).fill('This is a test note content');
			
			await page.getByRole('button', { name: /Create Note/i }).click();
			
			// Check note appears in list
			await expect(page.getByText('Test Note')).toBeVisible();
			await expect(page.getByText(/This is a test note/i)).toBeVisible();
		});

		test('should display AI suggestion for note', async ({ page }) => {
			await page.getByLabel(/Title/i).fill('Meeting Notes');
			await page.getByLabel(/Content/i).fill('Had a meeting today about the project');
			
			await page.getByRole('button', { name: /Create Note/i }).click();
			
			// Check for AI suggestion
			await expect(page.getByText(/💡 Suggestion:/i)).toBeVisible();
		});

		test('should delete a note', async ({ page }) => {
			// Create a note first
			await page.getByLabel(/Title/i).fill('Note to Delete');
			await page.getByLabel(/Content/i).fill('This will be deleted');
			await page.getByRole('button', { name: /Create Note/i }).click();
			
			// Delete the note
			const deleteButton = page.locator('button').filter({ has: page.locator('svg[class*="w-5"]') }).first();
			await deleteButton.click();
			
			// Check note is removed
			await expect(page.getByText('Note to Delete')).not.toBeVisible();
		});

		test('should persist notes in localStorage', async ({ page, context }) => {
			// Create a note
			await page.getByLabel(/Title/i).fill('Persistent Note');
			await page.getByLabel(/Content/i).fill('This should persist');
			await page.getByRole('button', { name: /Create Note/i }).click();
			
			// Reload page
			await page.reload();
			await page.getByRole('button', { name: /Notes/i }).click();
			
			// Check note still exists
			await expect(page.getByText('Persistent Note')).toBeVisible();
		});

		test('should show empty state when no notes', async ({ page, context }) => {
			// Clear localStorage
			await context.clearCookies();
			await page.evaluate(() => localStorage.clear());
			await page.reload();
			await page.getByRole('button', { name: /Notes/i }).click();
			
			await expect(page.getByText(/No notes yet/i)).toBeVisible();
		});
	});

	test.describe('Reminders Tab', () => {
		test.beforeEach(async ({ page }) => {
			await page.getByRole('button', { name: /Reminders/i }).click();
		});

		test('should display reminders interface', async ({ page }) => {
			await expect(page.getByText(/Create New Reminder/i)).toBeVisible();
			await expect(page.getByText(/Your Reminders/i)).toBeVisible();
		});

		test('should create a new reminder', async ({ page }) => {
			await page.getByLabel(/What do you want to be reminded/i).fill('Call mom');
			
			// Set datetime
			const tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			const datetimeString = tomorrow.toISOString().slice(0, 16);
			await page.getByLabel(/When/i).fill(datetimeString);
			
			await page.getByRole('button', { name: /Create Reminder/i }).click();
			
			// Check reminder appears
			await expect(page.getByText('Call mom')).toBeVisible();
		});

		test('should toggle reminder completion', async ({ page }) => {
			// Create a reminder first
			await page.getByLabel(/What do you want to be reminded/i).fill('Test Task');
			const tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			await page.getByLabel(/When/i).fill(tomorrow.toISOString().slice(0, 16));
			await page.getByRole('button', { name: /Create Reminder/i }).click();
			
			// Toggle completion
			const checkbox = page.locator('button').filter({ has: page.locator('div[class*="border-2"]') }).first();
			await checkbox.click();
			
			// Check for completed state
			await expect(page.locator('p').filter({ hasText: 'Test Task' })).toHaveClass(/line-through/);
		});

		test('should delete a reminder', async ({ page }) => {
			// Create a reminder
			await page.getByLabel(/What do you want to be reminded/i).fill('Reminder to Delete');
			const tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			await page.getByLabel(/When/i).fill(tomorrow.toISOString().slice(0, 16));
			await page.getByRole('button', { name: /Create Reminder/i }).click();
			
			// Delete it
			const deleteButton = page.locator('button').filter({ has: page.locator('svg[class*="w-5"]') }).last();
			await deleteButton.click();
			
			// Check it's removed
			await expect(page.getByText('Reminder to Delete')).not.toBeVisible();
		});

		test('should show empty state when no reminders', async ({ page, context }) => {
			await context.clearCookies();
			await page.evaluate(() => localStorage.clear());
			await page.reload();
			await page.getByRole('button', { name: /Reminders/i }).click();
			
			await expect(page.getByText(/No reminders yet/i)).toBeVisible();
		});
	});

	test('should be responsive on mobile', async ({ page, viewport }) => {
		if (viewport && viewport.width < 768) {
			// Check tabs are stacked vertically or in a scrollable container
			const tabs = page.locator('button').filter({ hasText: /AI Chat|Notes|Reminders/ });
			await expect(tabs.first()).toBeVisible();
		}
	});

	test('should load without console errors', async ({ page }) => {
		const errors: string[] = [];
		page.on('console', msg => {
			if (msg.type() === 'error') {
				errors.push(msg.text());
			}
		});
		
		await page.goto('/app');
		await page.waitForLoadState('networkidle');
		
		expect(errors).toHaveLength(0);
	});
});

