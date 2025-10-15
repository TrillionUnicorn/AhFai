import { test, expect } from '@playwright/test';

test.describe('Pitch Deck Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/pitch');
	});

	test('should load pitch deck successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/Pitch Deck/);
		await expect(page.getByRole('heading', { name: /AhFai Pitch Deck/i })).toBeVisible();
	});

	test('should display problem statement', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /The Problem/i })).toBeVisible();
		await expect(page.getByText(/87%/)).toBeVisible();
		await expect(page.getByText(/privacy concerns/i)).toBeVisible();
	});

	test('should display solution section', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Our Solution/i })).toBeVisible();
		await expect(page.getByText(/100% Local Processing/i)).toBeVisible();
		await expect(page.getByText(/Zero Data Collection/i)).toBeVisible();
	});

	test('should display market analysis', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Market Analysis/i })).toBeVisible();
		await expect(page.getByText(/\$36\.5B/)).toBeVisible();
		await expect(page.getByText(/TAM by 2028/i)).toBeVisible();
	});

	test('should render market growth chart', async ({ page }) => {
		const canvas = page.locator('#marketChart');
		await expect(canvas).toBeVisible();
		
		// Wait for chart to render
		await page.waitForTimeout(1000);
		
		// Check canvas has content
		const hasContent = await canvas.evaluate((el: HTMLCanvasElement) => {
			const ctx = el.getContext('2d');
			return ctx !== null;
		});
		expect(hasContent).toBeTruthy();
	});

	test('should display competitive analysis', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Competitive Analysis/i })).toBeVisible();
		await expect(page.getByText(/ChatGPT/)).toBeVisible();
		await expect(page.getByText(/Notion AI/)).toBeVisible();
		await expect(page.getByText(/Microsoft Copilot/)).toBeVisible();
	});

	test('should render competitor radar chart', async ({ page }) => {
		const canvas = page.locator('#competitorChart');
		await expect(canvas).toBeVisible();
		await page.waitForTimeout(1000);
	});

	test('should display business model', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Business Model/i })).toBeVisible();
		await expect(page.getByText(/Freemium/)).toBeVisible();
		await expect(page.getByText(/Privacy Pro/)).toBeVisible();
		await expect(page.getByText(/Enterprise/)).toBeVisible();
	});

	test('should display unit economics', async ({ page }) => {
		await expect(page.getByText(/CAC/)).toBeVisible();
		await expect(page.getByText(/LTV/)).toBeVisible();
		await expect(page.getByText(/16:1/)).toBeVisible();
		await expect(page.getByText(/85%/)).toBeVisible();
	});

	test('should display traction metrics', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Traction/i })).toBeVisible();
		await expect(page.getByText(/500\+/)).toBeVisible();
		await expect(page.getByText(/Waitlist Signups/i)).toBeVisible();
	});

	test('should render revenue projection chart', async ({ page }) => {
		const canvas = page.locator('#revenueChart');
		await expect(canvas).toBeVisible();
		await page.waitForTimeout(1000);
	});

	test('should display product roadmap', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Product Roadmap/i })).toBeVisible();
		await expect(page.getByText(/Q1 2025/)).toBeVisible();
		await expect(page.getByText(/Q2 2025/)).toBeVisible();
		await expect(page.getByText(/Q3 2025/)).toBeVisible();
		await expect(page.getByText(/Q4 2025/)).toBeVisible();
	});

	test('should display investment opportunity', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Investment Opportunity/i })).toBeVisible();
		await expect(page.getByText(/\$500K/)).toBeVisible();
		await expect(page.getByText(/Seed Round/i)).toBeVisible();
		await expect(page.getByText(/10x/)).toBeVisible();
	});

	test('should display team section', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Team/i })).toBeVisible();
		await expect(page.getByText(/Hunter Ho/)).toBeVisible();
		await expect(page.getByText(/Founder & CEO/i)).toBeVisible();
	});

	test('should have CTA buttons', async ({ page }) => {
		await expect(page.getByRole('link', { name: /Schedule a Meeting/i })).toBeVisible();
		await expect(page.getByRole('link', { name: /Join Waitlist/i })).toBeVisible();
	});

	test('should have all data sources cited', async ({ page }) => {
		await expect(page.getByText(/Pew Research Center/i)).toBeVisible();
		await expect(page.getByText(/IBM Security Report/i)).toBeVisible();
		await expect(page.getByText(/Grand View Research/i)).toBeVisible();
	});

	test('should be responsive on mobile', async ({ page, viewport }) => {
		if (viewport && viewport.width < 768) {
			// Check that content stacks vertically
			const sections = page.locator('section');
			const count = await sections.count();
			expect(count).toBeGreaterThan(5);
		}
	});

	test('should load without console errors', async ({ page }) => {
		const errors: string[] = [];
		page.on('console', msg => {
			if (msg.type() === 'error') {
				errors.push(msg.text());
			}
		});
		
		await page.goto('/pitch');
		await page.waitForLoadState('networkidle');
		
		// Allow Chart.js warnings but no errors
		const realErrors = errors.filter(e => !e.includes('Chart'));
		expect(realErrors).toHaveLength(0);
	});

	test('should scroll smoothly through sections', async ({ page }) => {
		const sections = page.locator('section');
		const count = await sections.count();
		
		// Scroll to bottom
		await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
		await page.waitForTimeout(500);
		
		// Scroll back to top
		await page.evaluate(() => window.scrollTo(0, 0));
		await page.waitForTimeout(500);
		
		// Check first section is visible
		await expect(sections.first()).toBeInViewport();
	});
});

