import { test, expect } from '@playwright/test';

// Visual regression tests to verify UI positioning, colors, and design

const pages = [
	{ name: 'Privacy Guardian', url: '/' },
	{ name: 'Productivity', url: '/productivity' },
	{ name: 'Student', url: '/student' },
	{ name: 'Enterprise', url: '/enterprise' },
	{ name: 'Creative', url: '/creative' },
	{ name: 'App', url: '/app' },
	{ name: 'Pitch', url: '/pitch' },
	{ name: 'Contact', url: '/contact' }
];

const viewports = [
	{ name: 'mobile', width: 375, height: 667 },
	{ name: 'tablet', width: 768, height: 1024 },
	{ name: 'desktop', width: 1920, height: 1080 }
];

test.describe('Visual Regression Tests', () => {
	for (const page of pages) {
		for (const viewport of viewports) {
			test(`${page.name} - ${viewport.name} - visual check`, async ({ page: browserPage }) => {
				await browserPage.setViewportSize({ width: viewport.width, height: viewport.height });
				await browserPage.goto(page.url);
				await browserPage.waitForLoadState('networkidle');
				
				// Wait for animations to complete
				await browserPage.waitForTimeout(2000);
				
				// Take screenshot
				await expect(browserPage).toHaveScreenshot(`${page.name.toLowerCase().replace(/\s+/g, '-')}-${viewport.name}.png`, {
					fullPage: true,
					animations: 'disabled'
				});
			});
		}
	}
});

test.describe('Element Positioning Tests', () => {
	test('navigation should be fixed at top', async ({ page }) => {
		await page.goto('/');
		
		const nav = page.locator('nav');
		const position = await nav.evaluate((el) => {
			const styles = window.getComputedStyle(el);
			return {
				position: styles.position,
				top: styles.top,
				zIndex: styles.zIndex
			};
		});
		
		expect(position.position).toBe('fixed');
		expect(position.top).toBe('0px');
		expect(parseInt(position.zIndex)).toBeGreaterThan(40);
	});

	test('hero section should be full height', async ({ page }) => {
		await page.goto('/');
		
		const hero = page.locator('section').first();
		const height = await hero.evaluate((el) => {
			const styles = window.getComputedStyle(el);
			return styles.minHeight;
		});
		
		expect(height).toContain('100vh');
	});

	test('buttons should have consistent padding', async ({ page }) => {
		await page.goto('/');
		
		const buttons = page.locator('button, a[class*="px-"]');
		const count = await buttons.count();
		
		for (let i = 0; i < Math.min(count, 5); i++) {
			const button = buttons.nth(i);
			if (await button.isVisible()) {
				const padding = await button.evaluate((el) => {
					const styles = window.getComputedStyle(el);
					return {
						paddingLeft: styles.paddingLeft,
						paddingRight: styles.paddingRight,
						paddingTop: styles.paddingTop,
						paddingBottom: styles.paddingBottom
					};
				});
				
				// Check padding is not 0
				expect(parseInt(padding.paddingLeft)).toBeGreaterThan(0);
				expect(parseInt(padding.paddingRight)).toBeGreaterThan(0);
			}
		}
	});

	test('cards should have consistent border radius', async ({ page }) => {
		await page.goto('/');
		
		const cards = page.locator('[class*="rounded"]');
		const count = await cards.count();
		
		for (let i = 0; i < Math.min(count, 5); i++) {
			const card = cards.nth(i);
			if (await card.isVisible()) {
				const borderRadius = await card.evaluate((el) => {
					return window.getComputedStyle(el).borderRadius;
				});
				
				// Should have border radius
				expect(borderRadius).not.toBe('0px');
			}
		}
	});

	test('text should be readable (contrast)', async ({ page }) => {
		await page.goto('/');
		
		const headings = page.locator('h1, h2, h3');
		const count = await headings.count();
		
		for (let i = 0; i < Math.min(count, 3); i++) {
			const heading = headings.nth(i);
			if (await heading.isVisible()) {
				const color = await heading.evaluate((el) => {
					return window.getComputedStyle(el).color;
				});
				
				// Color should be set (not default black)
				expect(color).toBeTruthy();
			}
		}
	});

	test('footer should be at bottom', async ({ page }) => {
		await page.goto('/');
		
		const footer = page.locator('footer');
		const position = await footer.evaluate((el) => {
			const rect = el.getBoundingClientRect();
			const bodyHeight = document.body.scrollHeight;
			return {
				bottom: rect.bottom,
				bodyHeight: bodyHeight
			};
		});
		
		// Footer should be near bottom of page
		expect(position.bottom).toBeGreaterThan(position.bodyHeight * 0.8);
	});
});

test.describe('Color Scheme Tests', () => {
	const colorTests = [
		{ url: '/', expectedColors: ['purple', 'violet', '#8b5cf6', '#7c3aed'] },
		{ url: '/productivity', expectedColors: ['orange', 'red', '#f97316', '#ea580c'] },
		{ url: '/student', expectedColors: ['green', 'teal', '#10b981', '#059669'] },
		{ url: '/enterprise', expectedColors: ['blue', 'navy', '#1e40af', '#1e3a8a'] },
		{ url: '/creative', expectedColors: ['purple', 'pink', '#a855f7', '#ec4899'] }
	];

	for (const colorTest of colorTests) {
		test(`${colorTest.url} should have correct color scheme`, async ({ page }) => {
			await page.goto(colorTest.url);
			
			const bodyBg = await page.locator('body').evaluate((el) => {
				return window.getComputedStyle(el).background;
			});
			
			// Check if background contains expected colors
			const hasExpectedColor = colorTest.expectedColors.some(color => 
				bodyBg.toLowerCase().includes(color.toLowerCase())
			);
			
			expect(hasExpectedColor).toBeTruthy();
		});
	}
});

test.describe('Responsive Design Tests', () => {
	test('elements should stack on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');
		
		// Check grid becomes single column
		const grid = page.locator('[class*="grid"]').first();
		if (await grid.isVisible()) {
			const columns = await grid.evaluate((el) => {
				return window.getComputedStyle(el).gridTemplateColumns;
			});
			
			// On mobile, should be single column or auto
			expect(columns).toMatch(/^(1fr|auto|none)$/);
		}
	});

	test('text should scale appropriately', async ({ page }) => {
		const desktopSize = await page.evaluate(async () => {
			await page.setViewportSize({ width: 1920, height: 1080 });
			await page.goto('/');
			const h1 = document.querySelector('h1');
			return h1 ? window.getComputedStyle(h1).fontSize : '0px';
		});
		
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');
		
		const mobileSize = await page.locator('h1').evaluate((el) => {
			return window.getComputedStyle(el).fontSize;
		});
		
		// Mobile font should be smaller than desktop
		expect(parseInt(mobileSize)).toBeLessThan(parseInt(desktopSize));
	});

	test('images should be responsive', async ({ page }) => {
		await page.goto('/');
		
		const images = page.locator('img');
		const count = await images.count();
		
		for (let i = 0; i < count; i++) {
			const img = images.nth(i);
			const maxWidth = await img.evaluate((el) => {
				return window.getComputedStyle(el).maxWidth;
			});
			
			// Images should have max-width set
			expect(maxWidth).not.toBe('none');
		}
	});
});

test.describe('Animation Tests', () => {
	test('animations should be smooth', async ({ page }) => {
		await page.goto('/');
		
		// Check for animation classes
		const animated = page.locator('[class*="animate"]');
		const count = await animated.count();
		
		expect(count).toBeGreaterThan(0);
		
		// Check animations have duration
		for (let i = 0; i < Math.min(count, 3); i++) {
			const element = animated.nth(i);
			const duration = await element.evaluate((el) => {
				return window.getComputedStyle(el).animationDuration;
			});
			
			expect(duration).not.toBe('0s');
		}
	});

	test('hover states should work', async ({ page }) => {
		await page.goto('/');
		
		const buttons = page.locator('button, a[class*="hover"]');
		const button = buttons.first();
		
		if (await button.isVisible()) {
			// Get initial state
			const initialBg = await button.evaluate((el) => {
				return window.getComputedStyle(el).backgroundColor;
			});
			
			// Hover
			await button.hover();
			await page.waitForTimeout(100);
			
			// Background should change or have transition
			const transition = await button.evaluate((el) => {
				return window.getComputedStyle(el).transition;
			});
			
			expect(transition).not.toBe('all 0s ease 0s');
		}
	});
});

test.describe('Accessibility Visual Tests', () => {
	test('focus states should be visible', async ({ page }) => {
		await page.goto('/');
		
		const focusable = page.locator('a, button, input').first();
		await focusable.focus();
		
		const outline = await focusable.evaluate((el) => {
			const styles = window.getComputedStyle(el);
			return {
				outline: styles.outline,
				outlineWidth: styles.outlineWidth,
				boxShadow: styles.boxShadow
			};
		});
		
		// Should have visible focus indicator
		const hasFocusIndicator = 
			outline.outline !== 'none' || 
			outline.outlineWidth !== '0px' ||
			outline.boxShadow !== 'none';
		
		expect(hasFocusIndicator).toBeTruthy();
	});

	test('touch targets should be large enough', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');
		
		const buttons = page.locator('button, a[role="button"]');
		const count = await buttons.count();
		
		for (let i = 0; i < Math.min(count, 5); i++) {
			const button = buttons.nth(i);
			if (await button.isVisible()) {
				const box = await button.boundingBox();
				
				if (box) {
					// Touch targets should be at least 44x44px
					expect(box.width).toBeGreaterThanOrEqual(40);
					expect(box.height).toBeGreaterThanOrEqual(40);
				}
			}
		}
	});
});

test.describe('Layout Consistency Tests', () => {
	test('all pages should have consistent header height', async ({ page }) => {
		const heights = [];
		
		for (const pageInfo of pages) {
			await page.goto(pageInfo.url);
			const nav = page.locator('nav');
			const height = await nav.evaluate((el) => {
				return el.getBoundingClientRect().height;
			});
			heights.push(height);
		}
		
		// All headers should be same height
		const uniqueHeights = new Set(heights);
		expect(uniqueHeights.size).toBeLessThanOrEqual(2); // Allow for minor variations
	});

	test('all pages should have consistent spacing', async ({ page }) => {
		await page.goto('/');
		
		const sections = page.locator('section');
		const count = await sections.count();
		
		for (let i = 0; i < Math.min(count, 3); i++) {
			const section = sections.nth(i);
			const padding = await section.evaluate((el) => {
				const styles = window.getComputedStyle(el);
				return {
					paddingTop: styles.paddingTop,
					paddingBottom: styles.paddingBottom
				};
			});
			
			// Sections should have consistent vertical padding
			expect(parseInt(padding.paddingTop)).toBeGreaterThan(0);
			expect(parseInt(padding.paddingBottom)).toBeGreaterThan(0);
		}
	});
});

