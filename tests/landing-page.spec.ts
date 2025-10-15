import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should load successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/AhFai/);
	});

	test('should display hero section', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Your Privacy-First AI/i })).toBeVisible();
		await expect(page.getByText(/100% Local Processing/i)).toBeVisible();
	});

	test('should have working navigation', async ({ page }) => {
		const nav = page.locator('nav');
		await expect(nav).toBeVisible();
		
		// Check navigation links
		await expect(nav.getByRole('link', { name: /Features/i })).toBeVisible();
		await expect(nav.getByRole('link', { name: /Pricing/i })).toBeVisible();
		await expect(nav.getByRole('link', { name: /Contact/i })).toBeVisible();
	});

	test('should display Why Us section', async ({ page }) => {
		await expect(page.getByText(/Why Choose AhFai/i)).toBeVisible();
		await expect(page.getByText(/100% Privacy Guaranteed/i)).toBeVisible();
		await expect(page.getByText(/Lightning Fast/i)).toBeVisible();
		await expect(page.getByText(/Intelligent Assistant/i)).toBeVisible();
	});

	test('should display How It Works section', async ({ page }) => {
		await expect(page.getByText(/How It Works/i)).toBeVisible();
		await expect(page.getByText(/Download & Install/i)).toBeVisible();
		await expect(page.getByText(/Start Chatting/i)).toBeVisible();
		await expect(page.getByText(/Stay Private/i)).toBeVisible();
	});

	test('should display pricing section with 3 tiers', async ({ page }) => {
		await expect(page.getByText(/Simple, Transparent Pricing/i)).toBeVisible();
		
		// Check all pricing tiers
		await expect(page.getByRole('heading', { name: /^Free$/i })).toBeVisible();
		await expect(page.getByRole('heading', { name: /Privacy Pro/i })).toBeVisible();
		await expect(page.getByRole('heading', { name: /Enterprise/i })).toBeVisible();
		
		// Check prices
		await expect(page.getByText(/\$0/)).toBeVisible();
		await expect(page.getByText(/\$9\.99/)).toBeVisible();
		await expect(page.getByText(/\$99\.99/)).toBeVisible();
	});

	test('should display mission section', async ({ page }) => {
		await expect(page.getByText(/Our Mission/i)).toBeVisible();
		await expect(page.getByText(/democratize AI assistance/i)).toBeVisible();
	});

	test('should have waitlist form', async ({ page }) => {
		const form = page.locator('form').filter({ hasText: /Join Waitlist/i });
		await expect(form).toBeVisible();
		
		// Check form fields
		await expect(form.getByLabel(/Name/i)).toBeVisible();
		await expect(form.getByLabel(/Email/i)).toBeVisible();
		await expect(form.getByRole('button', { name: /Join Waitlist/i })).toBeVisible();
	});

	test('should submit waitlist form successfully', async ({ page }) => {
		// Fill out the form
		await page.getByLabel(/Name/i).fill('Test User');
		await page.getByLabel(/Email/i).fill('test@example.com');
		
		// Submit
		await page.getByRole('button', { name: /Join Waitlist/i }).click();
		
		// Check for success message
		await expect(page.getByText(/You're on the list!/i)).toBeVisible({ timeout: 5000 });
	});

	test('should have footer with links', async ({ page }) => {
		const footer = page.locator('footer');
		await expect(footer).toBeVisible();
		
		// Check footer links
		await expect(footer.getByRole('link', { name: /Privacy Policy/i })).toBeVisible();
		await expect(footer.getByRole('link', { name: /Terms/i })).toBeVisible();
	});

	test('should be responsive on mobile', async ({ page, viewport }) => {
		if (viewport && viewport.width < 768) {
			// Check mobile menu button exists
			const menuButton = page.getByRole('button', { name: /menu/i });
			await expect(menuButton).toBeVisible();
		}
	});

	test('should have smooth scrolling to sections', async ({ page }) => {
		// Click on a navigation link
		await page.getByRole('link', { name: /Pricing/i }).click();
		
		// Wait for scroll
		await page.waitForTimeout(1000);
		
		// Check if pricing section is in viewport
		const pricingSection = page.getByText(/Simple, Transparent Pricing/i);
		await expect(pricingSection).toBeInViewport();
	});

	test('should load without console errors', async ({ page }) => {
		const errors: string[] = [];
		page.on('console', msg => {
			if (msg.type() === 'error') {
				errors.push(msg.text());
			}
		});
		
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		
		expect(errors).toHaveLength(0);
	});

	test('should have proper meta tags', async ({ page }) => {
		await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
	});

	test('should have all CTA buttons working', async ({ page }) => {
		const ctaButtons = page.getByRole('link', { name: /Get Started|Try Free|Join Waitlist/i });
		const count = await ctaButtons.count();
		expect(count).toBeGreaterThan(0);
		
		// Check first CTA is clickable
		await expect(ctaButtons.first()).toBeVisible();
	});
});

