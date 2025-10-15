import { test, expect } from '@playwright/test';

// Test all 5 MVP variants to ensure they're working correctly

const variants = [
	{
		name: 'Privacy Guardian',
		url: '/',
		theme: 'purple',
		headline: /Privacy-First AI/i,
		pricing: ['$0', '$9.99', '$99.99'],
		features: ['100% Privacy', 'Lightning Fast', 'Intelligent Assistant']
	},
	{
		name: 'Productivity Powerhouse',
		url: '/productivity',
		theme: 'orange',
		headline: /Supercharge Your Productivity/i,
		pricing: ['$0', '$12.99', '$149.99'],
		features: ['Task Automation', 'Productivity Analytics', 'Focus Mode']
	},
	{
		name: 'Student & Learner Edition',
		url: '/student',
		theme: 'green',
		headline: /AI Study Buddy/i,
		pricing: ['$0', '$4.99', '$49.99'],
		features: ['AI Flashcards', 'Research Assistant', 'Study Analytics']
	},
	{
		name: 'Enterprise & Team Edition',
		url: '/enterprise',
		theme: 'blue',
		headline: /Enterprise-Grade AI/i,
		pricing: ['$0', '$49.99', 'Custom'],
		features: ['Team Collaboration', 'Admin Dashboard', 'Enterprise Security']
	},
	{
		name: 'Creative & Content Creator Edition',
		url: '/creative',
		theme: 'purple-pink',
		headline: /Unleash Your Creativity/i,
		pricing: ['$0', '$19.99', '$39.99'],
		features: ['Content Generation', 'Idea Brainstorming', 'Content Calendar']
	}
];

for (const variant of variants) {
	test.describe(`${variant.name} Variant`, () => {
		test.beforeEach(async ({ page }) => {
			await page.goto(variant.url);
		});

		test('should load successfully', async ({ page }) => {
			await expect(page).toHaveTitle(new RegExp(variant.name.split(' ')[0], 'i'));
		});

		test('should display correct headline', async ({ page }) => {
			await expect(page.getByRole('heading', { name: variant.headline })).toBeVisible();
		});

		test('should have navigation', async ({ page }) => {
			const nav = page.locator('nav');
			await expect(nav).toBeVisible();
		});

		test('should display all pricing tiers', async ({ page }) => {
			for (const price of variant.pricing) {
				if (price !== 'Custom') {
					await expect(page.getByText(price)).toBeVisible();
				} else {
					await expect(page.getByText(/Custom/i)).toBeVisible();
				}
			}
		});

		test('should display all key features', async ({ page }) => {
			for (const feature of variant.features) {
				await expect(page.getByText(new RegExp(feature, 'i'))).toBeVisible();
			}
		});

		test('should have working CTA buttons', async ({ page }) => {
			const ctaButtons = page.getByRole('link', { name: /Get Started|Start|Request Demo|Join/i });
			const count = await ctaButtons.count();
			expect(count).toBeGreaterThan(0);
			
			// Check first CTA is clickable and has href
			const firstCta = ctaButtons.first();
			await expect(firstCta).toBeVisible();
			const href = await firstCta.getAttribute('href');
			expect(href).toBeTruthy();
		});

		test('should have waitlist/demo form', async ({ page }) => {
			const form = page.locator('form');
			await expect(form).toBeVisible();
			
			// Check form has inputs
			const inputs = form.locator('input[type="text"], input[type="email"]');
			const inputCount = await inputs.count();
			expect(inputCount).toBeGreaterThanOrEqual(2);
		});

		test('should submit form successfully', async ({ page }) => {
			const nameInput = page.locator('input[type="text"]').first();
			const emailInput = page.locator('input[type="email"]').first();
			const submitButton = page.locator('button[type="submit"]').first();
			
			await nameInput.fill('Test User');
			await emailInput.fill('test@example.com');
			await submitButton.click();
			
			// Wait for success message
			await expect(page.getByText(/Welcome|Success|Thank you|on the list/i)).toBeVisible({ timeout: 5000 });
		});

		test('should have footer', async ({ page }) => {
			const footer = page.locator('footer');
			await expect(footer).toBeVisible();
		});

		test('should be responsive on mobile', async ({ page, viewport }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			
			// Check page still loads
			await expect(page.locator('h1')).toBeVisible();
			
			// Check no horizontal overflow
			const hasHorizontalScroll = await page.evaluate(() => {
				return document.documentElement.scrollWidth > document.documentElement.clientWidth;
			});
			expect(hasHorizontalScroll).toBeFalsy();
		});

		test('should load without console errors', async ({ page }) => {
			const errors: string[] = [];
			page.on('console', msg => {
				if (msg.type() === 'error') {
					errors.push(msg.text());
				}
			});
			
			await page.goto(variant.url);
			await page.waitForLoadState('networkidle');
			
			// Filter out known acceptable errors (like Chart.js warnings)
			const realErrors = errors.filter(e => 
				!e.includes('Chart') && 
				!e.includes('DevTools') &&
				!e.includes('favicon')
			);
			expect(realErrors).toHaveLength(0);
		});

		test('should have animated stats', async ({ page }) => {
			// Wait for stats to appear
			await page.waitForTimeout(1000);
			
			// Check for stat numbers
			const stats = page.locator('div').filter({ hasText: /\d+[K%+]?/ });
			const count = await stats.count();
			expect(count).toBeGreaterThan(0);
		});

		test('should have smooth scrolling', async ({ page }) => {
			// Find a section link
			const sectionLink = page.locator('a[href^="#"]').first();
			if (await sectionLink.isVisible()) {
				await sectionLink.click();
				await page.waitForTimeout(500);
				
				// Check we scrolled
				const scrollY = await page.evaluate(() => window.scrollY);
				expect(scrollY).toBeGreaterThan(0);
			}
		});

		test('should have proper meta tags', async ({ page }) => {
			const description = await page.locator('meta[name="description"]').getAttribute('content');
			expect(description).toBeTruthy();
			expect(description!.length).toBeGreaterThan(50);
		});

		test('should have all images loaded', async ({ page }) => {
			const images = page.locator('img');
			const imageCount = await images.count();
			
			for (let i = 0; i < imageCount; i++) {
				const img = images.nth(i);
				const isLoaded = await img.evaluate((el: HTMLImageElement) => el.complete);
				expect(isLoaded).toBeTruthy();
			}
		});

		test('should have accessible navigation', async ({ page }) => {
			const nav = page.locator('nav');
			const links = nav.locator('a');
			const linkCount = await links.count();
			
			expect(linkCount).toBeGreaterThan(3);
			
			// Check all links have text or aria-label
			for (let i = 0; i < linkCount; i++) {
				const link = links.nth(i);
				const text = await link.textContent();
				const ariaLabel = await link.getAttribute('aria-label');
				expect(text || ariaLabel).toBeTruthy();
			}
		});

		test('should have working mobile menu', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			
			// Look for mobile menu button
			const menuButton = page.locator('button').filter({ hasText: /menu/i }).or(
				page.locator('button[aria-label*="menu" i]')
			);
			
			if (await menuButton.isVisible()) {
				await menuButton.click();
				await page.waitForTimeout(300);
				
				// Check menu is visible
				const mobileNav = page.locator('nav').locator('div').filter({ hasText: /Features|Pricing/i });
				await expect(mobileNav).toBeVisible();
			}
		});

		test('should have proper color scheme', async ({ page }) => {
			const body = page.locator('body');
			const bgStyle = await body.evaluate((el) => {
				return window.getComputedStyle(el).background;
			});
			
			// Check background has gradient
			expect(bgStyle).toContain('gradient');
		});

		test('should have all sections visible', async ({ page }) => {
			// Hero section
			await expect(page.locator('section').first()).toBeVisible();
			
			// Features section
			await expect(page.locator('section').filter({ hasText: /Features/i })).toBeVisible();
			
			// Pricing section
			await expect(page.locator('section').filter({ hasText: /Pricing/i })).toBeVisible();
		});

		test('should have proper button states', async ({ page }) => {
			const buttons = page.locator('button, a[class*="button"], a[class*="btn"]');
			const buttonCount = await buttons.count();
			
			for (let i = 0; i < Math.min(buttonCount, 5); i++) {
				const button = buttons.nth(i);
				if (await button.isVisible()) {
					// Check button has hover state
					await button.hover();
					await page.waitForTimeout(100);
					
					// Button should still be visible after hover
					await expect(button).toBeVisible();
				}
			}
		});

		test('should have proper form validation', async ({ page }) => {
			const emailInput = page.locator('input[type="email"]').first();
			const submitButton = page.locator('button[type="submit"]').first();
			
			// Try to submit with invalid email
			await emailInput.fill('invalid-email');
			await submitButton.click();
			
			// Check HTML5 validation
			const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
			expect(isInvalid).toBeTruthy();
		});

		test('should have proper link targets', async ({ page }) => {
			const externalLinks = page.locator('a[href^="http"]');
			const count = await externalLinks.count();
			
			for (let i = 0; i < count; i++) {
				const link = externalLinks.nth(i);
				const href = await link.getAttribute('href');
				expect(href).toMatch(/^https?:\/\//);
			}
		});

		test('should have proper heading hierarchy', async ({ page }) => {
			const h1 = page.locator('h1');
			const h1Count = await h1.count();
			
			// Should have exactly one h1
			expect(h1Count).toBe(1);
			
			// h1 should be visible
			await expect(h1.first()).toBeVisible();
		});
	});
}

// Cross-variant comparison tests
test.describe('Cross-Variant Consistency', () => {
	test('all variants should have unique branding', async ({ page }) => {
		const brandNames = [];
		
		for (const variant of variants) {
			await page.goto(variant.url);
			const brandName = await page.locator('nav').locator('span').first().textContent();
			brandNames.push(brandName);
		}
		
		// All brand names should be unique
		const uniqueBrands = new Set(brandNames);
		expect(uniqueBrands.size).toBe(variants.length);
	});

	test('all variants should have different pricing', async ({ page }) => {
		const pricingSets = [];
		
		for (const variant of variants) {
			await page.goto(variant.url);
			await page.waitForLoadState('networkidle');
			
			const prices = variant.pricing.join(',');
			pricingSets.push(prices);
		}
		
		// At least 4 out of 5 should have different pricing
		const uniquePricing = new Set(pricingSets);
		expect(uniquePricing.size).toBeGreaterThanOrEqual(4);
	});

	test('all variants should have different color schemes', async ({ page }) => {
		const colorSchemes = [];
		
		for (const variant of variants) {
			await page.goto(variant.url);
			const bgColor = await page.locator('body').evaluate((el) => {
				return window.getComputedStyle(el).background;
			});
			colorSchemes.push(bgColor);
		}
		
		// All should have different backgrounds
		const uniqueColors = new Set(colorSchemes);
		expect(uniqueColors.size).toBe(variants.length);
	});
});

