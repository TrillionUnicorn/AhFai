import { test, expect } from '@playwright/test';

/**
 * COMPLETE VERIFICATION TEST SUITE
 * This test suite verifies EVERYTHING is working:
 * - All pages load without errors
 * - All sections are visible
 * - All CTAs work
 * - All colors are correct
 * - All UI elements are positioned correctly
 * - All forms work
 * - All animations work
 * - All responsive designs work
 */

const routes = [
	{ path: '/', name: 'Privacy Guardian (MVP-1)', color: 'rgb(139, 92, 246)' }, // purple
	{ path: '/productivity', name: 'Productivity (MVP-2)', color: 'rgb(249, 115, 22)' }, // orange
	{ path: '/student', name: 'Student (MVP-3)', color: 'rgb(16, 185, 129)' }, // green
	{ path: '/enterprise', name: 'Enterprise (MVP-4)', color: 'rgb(30, 64, 175)' }, // blue
	{ path: '/creative', name: 'Creative (MVP-5)', color: 'rgb(168, 85, 247)' }, // purple-pink
	{ path: '/app', name: 'App Page', color: null },
	{ path: '/pitch', name: 'Pitch Deck', color: null },
	{ path: '/contact', name: 'Contact Page', color: null }
];

test.describe('COMPLETE VERIFICATION - All Routes', () => {
	for (const route of routes) {
		test(`${route.name} - Complete Verification`, async ({ page }) => {
			// 1. PAGE LOADS WITHOUT ERRORS
			const errors: string[] = [];
			page.on('console', msg => {
				if (msg.type() === 'error') {
					errors.push(msg.text());
				}
			});
			
			await page.goto(route.path);
			await page.waitForLoadState('networkidle');
			
			// Filter out acceptable errors
			const realErrors = errors.filter(e => 
				!e.includes('favicon') && 
				!e.includes('DevTools') &&
				!e.includes('Chart.js')
			);
			expect(realErrors).toHaveLength(0);
			
			// 2. PAGE TITLE EXISTS
			const title = await page.title();
			expect(title.length).toBeGreaterThan(0);
			
			// 3. NAVIGATION EXISTS AND IS VISIBLE
			const nav = page.locator('nav');
			await expect(nav).toBeVisible();
			
			// 4. NAVIGATION IS FIXED AT TOP
			const navPosition = await nav.evaluate(el => {
				const styles = window.getComputedStyle(el);
				return {
					position: styles.position,
					top: styles.top,
					zIndex: parseInt(styles.zIndex)
				};
			});
			expect(navPosition.position).toBe('fixed');
			expect(navPosition.top).toBe('0px');
			expect(navPosition.zIndex).toBeGreaterThan(40);
			
			// 5. HERO SECTION EXISTS
			const hero = page.locator('section').first();
			await expect(hero).toBeVisible();
			
			// 6. HERO IS FULL HEIGHT
			const heroHeight = await hero.evaluate(el => {
				return window.getComputedStyle(el).minHeight;
			});
			expect(heroHeight).toContain('100vh');
			
			// 7. H1 EXISTS AND IS VISIBLE
			const h1 = page.locator('h1');
			await expect(h1).toBeVisible();
			const h1Text = await h1.textContent();
			expect(h1Text!.length).toBeGreaterThan(0);
			
			// 8. ONLY ONE H1
			const h1Count = await page.locator('h1').count();
			expect(h1Count).toBe(1);
			
			// 9. CTA BUTTONS EXIST
			const ctaButtons = page.getByRole('link', { name: /Get Started|Start|Request|Join|Try|Demo/i });
			const ctaCount = await ctaButtons.count();
			expect(ctaCount).toBeGreaterThan(0);
			
			// 10. FIRST CTA IS CLICKABLE
			const firstCta = ctaButtons.first();
			await expect(firstCta).toBeVisible();
			const href = await firstCta.getAttribute('href');
			expect(href).toBeTruthy();
			
			// 11. FOOTER EXISTS
			const footer = page.locator('footer');
			await expect(footer).toBeVisible();
			
			// 12. NO HORIZONTAL SCROLL
			const hasHorizontalScroll = await page.evaluate(() => {
				return document.documentElement.scrollWidth > document.documentElement.clientWidth;
			});
			expect(hasHorizontalScroll).toBeFalsy();
			
			// 13. BACKGROUND GRADIENT EXISTS (for MVP variants)
			if (route.color) {
				const bodyBg = await page.locator('body').evaluate(el => {
					return window.getComputedStyle(el).background;
				});
				expect(bodyBg).toContain('gradient');
			}
			
			// 14. META DESCRIPTION EXISTS
			const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
			expect(metaDesc).toBeTruthy();
			expect(metaDesc!.length).toBeGreaterThan(50);
			
			// 15. RESPONSIVE ON MOBILE
			await page.setViewportSize({ width: 375, height: 667 });
			await expect(h1).toBeVisible();
			
			const mobileHorizontalScroll = await page.evaluate(() => {
				return document.documentElement.scrollWidth > document.documentElement.clientWidth;
			});
			expect(mobileHorizontalScroll).toBeFalsy();
			
			// Reset viewport
			await page.setViewportSize({ width: 1920, height: 1080 });
		});
	}
});

test.describe('COMPLETE VERIFICATION - MVP Variants Specific', () => {
	const mvpVariants = [
		{ 
			path: '/', 
			name: 'Privacy Guardian',
			headline: /Privacy-First AI/i,
			features: ['100% Privacy', 'Lightning Fast', 'Intelligent'],
			pricing: ['$0', '$9.99', '$99.99']
		},
		{ 
			path: '/productivity', 
			name: 'Productivity',
			headline: /Supercharge Your Productivity/i,
			features: ['Task Automation', 'Productivity Analytics', 'Focus'],
			pricing: ['$0', '$12.99', '$149.99']
		},
		{ 
			path: '/student', 
			name: 'Student',
			headline: /AI Study Buddy/i,
			features: ['AI Flashcards', 'Research Assistant', 'Study Analytics'],
			pricing: ['$0', '$4.99', '$49.99']
		},
		{ 
			path: '/enterprise', 
			name: 'Enterprise',
			headline: /Enterprise-Grade AI/i,
			features: ['Team Collaboration', 'Admin Dashboard', 'Enterprise Security'],
			pricing: ['$0', '$49.99', 'Custom']
		},
		{ 
			path: '/creative', 
			name: 'Creative',
			headline: /Unleash Your Creativity/i,
			features: ['Content Generation', 'Idea Brainstorming', 'Content Calendar'],
			pricing: ['$0', '$19.99', '$39.99']
		}
	];
	
	for (const variant of mvpVariants) {
		test(`${variant.name} - Specific Features`, async ({ page }) => {
			await page.goto(variant.path);
			await page.waitForLoadState('networkidle');
			
			// 1. CORRECT HEADLINE
			await expect(page.getByRole('heading', { name: variant.headline })).toBeVisible();
			
			// 2. ALL FEATURES VISIBLE
			for (const feature of variant.features) {
				await expect(page.getByText(new RegExp(feature, 'i'))).toBeVisible();
			}
			
			// 3. ALL PRICING TIERS VISIBLE
			for (const price of variant.pricing) {
				if (price !== 'Custom') {
					await expect(page.getByText(price)).toBeVisible();
				} else {
					await expect(page.getByText(/Custom/i)).toBeVisible();
				}
			}
			
			// 4. FORM EXISTS
			const form = page.locator('form');
			await expect(form).toBeVisible();
			
			// 5. FORM HAS INPUTS
			const inputs = form.locator('input[type="text"], input[type="email"]');
			const inputCount = await inputs.count();
			expect(inputCount).toBeGreaterThanOrEqual(2);
			
			// 6. FORM SUBMISSION WORKS
			const nameInput = page.locator('input[type="text"]').first();
			const emailInput = page.locator('input[type="email"]').first();
			const submitButton = page.locator('button[type="submit"]').first();
			
			await nameInput.fill('Test User');
			await emailInput.fill('test@example.com');
			await submitButton.click();
			
			// Wait for success message
			await expect(page.getByText(/Welcome|Success|Thank you|aboard/i)).toBeVisible({ timeout: 5000 });
			
			// 7. ANIMATED STATS EXIST
			await page.goto(variant.path); // Reload to see animations
			await page.waitForTimeout(1000);
			
			const stats = page.locator('div').filter({ hasText: /\d+[K%+]/ });
			const statsCount = await stats.count();
			expect(statsCount).toBeGreaterThan(0);
			
			// 8. SECTIONS EXIST
			await expect(page.locator('section').filter({ hasText: /Features/i })).toBeVisible();
			await expect(page.locator('section').filter({ hasText: /Pricing/i })).toBeVisible();
		});
	}
});

test.describe('COMPLETE VERIFICATION - Color Accuracy', () => {
	const colorTests = [
		{ path: '/', name: 'Privacy', expectedInBg: ['purple', 'violet', '#8b5cf6'] },
		{ path: '/productivity', name: 'Productivity', expectedInBg: ['orange', 'red', '#f97316'] },
		{ path: '/student', name: 'Student', expectedInBg: ['green', 'teal', '#10b981'] },
		{ path: '/enterprise', name: 'Enterprise', expectedInBg: ['blue', 'navy', '#1e40af'] },
		{ path: '/creative', name: 'Creative', expectedInBg: ['purple', 'pink', '#a855f7'] }
	];
	
	for (const colorTest of colorTests) {
		test(`${colorTest.name} - Color Verification`, async ({ page }) => {
			await page.goto(colorTest.path);
			await page.waitForLoadState('networkidle');
			
			const bodyBg = await page.locator('body').evaluate(el => {
				return window.getComputedStyle(el).background.toLowerCase();
			});
			
			// Check if background contains expected colors
			const hasExpectedColor = colorTest.expectedInBg.some(color => 
				bodyBg.includes(color.toLowerCase())
			);
			
			expect(hasExpectedColor).toBeTruthy();
		});
	}
});

test.describe('COMPLETE VERIFICATION - UI Positioning', () => {
	test('All pages - UI elements positioned correctly', async ({ page }) => {
		for (const route of routes) {
			await page.goto(route.path);
			await page.waitForLoadState('networkidle');
			
			// 1. NAVIGATION HEIGHT CONSISTENT
			const nav = page.locator('nav');
			const navHeight = await nav.evaluate(el => el.getBoundingClientRect().height);
			expect(navHeight).toBeGreaterThan(50);
			expect(navHeight).toBeLessThan(100);
			
			// 2. BUTTONS HAVE PADDING
			const buttons = page.locator('button, a[class*="px-"]').first();
			if (await buttons.isVisible()) {
				const padding = await buttons.evaluate(el => {
					const styles = window.getComputedStyle(el);
					return {
						left: parseInt(styles.paddingLeft),
						right: parseInt(styles.paddingRight)
					};
				});
				expect(padding.left).toBeGreaterThan(0);
				expect(padding.right).toBeGreaterThan(0);
			}
			
			// 3. SECTIONS HAVE SPACING
			const sections = page.locator('section');
			const firstSection = sections.first();
			if (await firstSection.isVisible()) {
				const padding = await firstSection.evaluate(el => {
					const styles = window.getComputedStyle(el);
					return {
						top: parseInt(styles.paddingTop),
						bottom: parseInt(styles.paddingBottom)
					};
				});
				// Sections should have some vertical padding
				expect(padding.top + padding.bottom).toBeGreaterThan(0);
			}
		}
	});
});

test.describe('COMPLETE VERIFICATION - Accessibility', () => {
	test('All pages - Accessibility checks', async ({ page }) => {
		for (const route of routes) {
			await page.goto(route.path);
			await page.waitForLoadState('networkidle');
			
			// 1. FOCUS VISIBLE
			const focusable = page.locator('a, button, input').first();
			await focusable.focus();
			
			const outline = await focusable.evaluate(el => {
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
			
			// 2. LINKS HAVE TEXT OR ARIA-LABEL
			const links = page.locator('a');
			const linkCount = await links.count();
			
			for (let i = 0; i < Math.min(linkCount, 10); i++) {
				const link = links.nth(i);
				const text = await link.textContent();
				const ariaLabel = await link.getAttribute('aria-label');
				expect(text || ariaLabel).toBeTruthy();
			}
		}
	});
});

