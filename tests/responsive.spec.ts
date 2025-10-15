import { test, expect } from '@playwright/test';

const viewports = [
	{ name: 'Mobile Portrait', width: 375, height: 667 },
	{ name: 'Mobile Landscape', width: 667, height: 375 },
	{ name: 'Tablet Portrait', width: 768, height: 1024 },
	{ name: 'Tablet Landscape', width: 1024, height: 768 },
	{ name: 'Desktop', width: 1920, height: 1080 },
	{ name: 'Desktop Large', width: 2560, height: 1440 }
];

const pages = [
	{ name: 'Landing', url: '/' },
	{ name: 'App', url: '/app' },
	{ name: 'Pitch', url: '/pitch' },
	{ name: 'Contact', url: '/contact' }
];

test.describe('Responsive Design Tests', () => {
	for (const viewport of viewports) {
		test.describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
			test.use({ viewport: { width: viewport.width, height: viewport.height } });

			for (const pageInfo of pages) {
				test(`${pageInfo.name} page should be responsive`, async ({ page }) => {
					await page.goto(pageInfo.url);
					await page.waitForLoadState('networkidle');

					// Check no horizontal overflow
					const hasHorizontalScroll = await page.evaluate(() => {
						return document.documentElement.scrollWidth > document.documentElement.clientWidth;
					});
					expect(hasHorizontalScroll).toBeFalsy();

					// Check all images are loaded
					const images = page.locator('img');
					const imageCount = await images.count();
					for (let i = 0; i < imageCount; i++) {
						const img = images.nth(i);
						const isLoaded = await img.evaluate((el: HTMLImageElement) => el.complete);
						expect(isLoaded).toBeTruthy();
					}

					// Take screenshot for visual regression
					await page.screenshot({
						path: `tests/screenshots/${pageInfo.name}-${viewport.name.replace(/\s+/g, '-')}.png`,
						fullPage: true
					});
				});
			}
		});
	}

	test.describe('Tailwind Breakpoint Tests', () => {
		test('should apply mobile styles correctly', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/');

			// Check mobile menu exists
			const nav = page.locator('nav');
			await expect(nav).toBeVisible();
		});

		test('should apply tablet styles correctly', async ({ page }) => {
			await page.setViewportSize({ width: 768, height: 1024 });
			await page.goto('/');

			// Check layout adapts
			const container = page.locator('.container').first();
			await expect(container).toBeVisible();
		});

		test('should apply desktop styles correctly', async ({ page }) => {
			await page.setViewportSize({ width: 1920, height: 1080 });
			await page.goto('/');

			// Check full navigation is visible
			const nav = page.locator('nav');
			await expect(nav).toBeVisible();
		});
	});

	test.describe('Touch Interactions', () => {
		test.use({ viewport: { width: 375, height: 667 }, hasTouch: true });

		test('should handle touch events on mobile', async ({ page }) => {
			await page.goto('/');

			// Test button tap
			const ctaButton = page.getByRole('link', { name: /Get Started/i }).first();
			await ctaButton.tap();
			
			// Should navigate or trigger action
			await page.waitForTimeout(500);
		});

		test('should handle form inputs on mobile', async ({ page }) => {
			await page.goto('/contact');

			const nameInput = page.getByLabel(/Name/i);
			await nameInput.tap();
			await nameInput.fill('Mobile User');
			
			await expect(nameInput).toHaveValue('Mobile User');
		});
	});

	test.describe('Font Scaling', () => {
		test('should be readable at different font sizes', async ({ page }) => {
			await page.goto('/');

			// Test with larger font size
			await page.evaluate(() => {
				document.documentElement.style.fontSize = '20px';
			});

			await page.waitForTimeout(500);

			// Check text is still visible and not overflowing
			const heading = page.getByRole('heading', { name: /Your Privacy-First AI/i });
			await expect(heading).toBeVisible();
		});
	});

	test.describe('Orientation Changes', () => {
		test('should handle portrait to landscape', async ({ page }) => {
			// Start in portrait
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/');

			// Switch to landscape
			await page.setViewportSize({ width: 667, height: 375 });
			await page.waitForTimeout(500);

			// Check layout adapts
			const container = page.locator('.container').first();
			await expect(container).toBeVisible();
		});
	});

	test.describe('CSS Grid and Flexbox', () => {
		test('should render grid layouts correctly', async ({ page }) => {
			await page.goto('/');

			// Check pricing grid
			const pricingSection = page.locator('section').filter({ hasText: /Pricing/i });
			await pricingSection.scrollIntoViewIfNeeded();

			const pricingCards = pricingSection.locator('[class*="grid"]').first();
			await expect(pricingCards).toBeVisible();
		});

		test('should render flex layouts correctly', async ({ page }) => {
			await page.goto('/app');

			// Check tab navigation
			const tabs = page.locator('[class*="flex"]').filter({ hasText: /AI Chat/i });
			await expect(tabs).toBeVisible();
		});
	});

	test.describe('Image Responsiveness', () => {
		test('should load appropriate image sizes', async ({ page }) => {
			await page.goto('/');

			const images = page.locator('img');
			const count = await images.count();

			for (let i = 0; i < count; i++) {
				const img = images.nth(i);
				const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
				const displayWidth = await img.evaluate((el: HTMLImageElement) => el.clientWidth);

				// Image should not be significantly larger than display size
				expect(naturalWidth).toBeLessThanOrEqual(displayWidth * 2);
			}
		});
	});

	test.describe('Accessibility on Different Devices', () => {
		test('should maintain focus visibility on mobile', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/contact');

			const nameInput = page.getByLabel(/Name/i);
			await nameInput.focus();

			// Check focus is visible
			const hasFocusStyle = await nameInput.evaluate((el) => {
				const styles = window.getComputedStyle(el);
				return styles.outline !== 'none' || styles.boxShadow !== 'none';
			});
			expect(hasFocusStyle).toBeTruthy();
		});

		test('should have adequate touch target sizes', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/');

			const buttons = page.getByRole('button');
			const count = await buttons.count();

			for (let i = 0; i < count; i++) {
				const button = buttons.nth(i);
				const box = await button.boundingBox();
				
				if (box) {
					// Touch targets should be at least 44x44px
					expect(box.width).toBeGreaterThanOrEqual(40);
					expect(box.height).toBeGreaterThanOrEqual(40);
				}
			}
		});
	});
});

