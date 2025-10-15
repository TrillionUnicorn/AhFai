import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AIService } from '$lib/ai';

describe('AI Service', () => {
	let aiService: AIService;

	beforeEach(() => {
		aiService = new AIService();
	});

	describe('Initialization', () => {
		it('should create AI service instance', () => {
			expect(aiService).toBeDefined();
			expect(aiService).toBeInstanceOf(AIService);
		});
	});

	describe('Status Checking', () => {
		it('should return status object', async () => {
			const status = await aiService.getStatus();
			
			expect(status).toBeDefined();
			expect(status).toHaveProperty('available');
			expect(status).toHaveProperty('models');
			expect(status).toHaveProperty('currentModel');
		});

		it('should handle unavailable service gracefully', async () => {
			const status = await aiService.getStatus();
			
			// Service might not be available in test environment
			expect(typeof status.available).toBe('boolean');
			if (!status.available) {
				expect(status.error).toBeDefined();
			}
		});
	});

	describe('Model Management', () => {
		it('should check model availability', async () => {
			const isAvailable = await aiService.isModelAvailable('test-model');
			expect(typeof isAvailable).toBe('boolean');
		});

		it('should get available models', async () => {
			const models = await aiService.getAvailableModels();
			expect(Array.isArray(models)).toBe(true);
		});
	});

	describe('Generation', () => {
		it('should return proper response structure for generate', async () => {
			const result = await aiService.generate('test prompt');
			
			expect(result).toBeDefined();
			expect(result).toHaveProperty('success');
			expect(typeof result.success).toBe('boolean');
			
			if (result.success) {
				expect(result).toHaveProperty('response');
			} else {
				expect(result).toHaveProperty('error');
			}
		});

		it('should handle empty prompt', async () => {
			const result = await aiService.generate('');
			expect(result).toBeDefined();
			expect(result).toHaveProperty('success');
		});

		it('should accept generation options', async () => {
			const result = await aiService.generate('test', {
				temperature: 0.5,
				maxTokens: 100
			});
			
			expect(result).toBeDefined();
			expect(result).toHaveProperty('success');
		});
	});

	describe('Chat', () => {
		it('should return proper response structure for chat', async () => {
			const messages = [
				{ role: 'user' as const, content: 'Hello' }
			];
			
			const result = await aiService.chat(messages);
			
			expect(result).toBeDefined();
			expect(result).toHaveProperty('success');
			expect(typeof result.success).toBe('boolean');
		});

		it('should handle conversation history', async () => {
			const messages = [
				{ role: 'user' as const, content: 'Hello' },
				{ role: 'assistant' as const, content: 'Hi there!' },
				{ role: 'user' as const, content: 'How are you?' }
			];
			
			const result = await aiService.chat(messages);
			expect(result).toBeDefined();
		});

		it('should accept chat options', async () => {
			const messages = [{ role: 'user' as const, content: 'test' }];
			const result = await aiService.chat(messages, {
				temperature: 0.7,
				maxTokens: 200
			});
			
			expect(result).toBeDefined();
		});
	});

	describe('Error Handling', () => {
		it('should handle service unavailability', async () => {
			const result = await aiService.generate('test');
			
			if (!result.success) {
				expect(result.error).toBeDefined();
				expect(typeof result.error).toBe('string');
			}
		});

		it('should provide meaningful error messages', async () => {
			const result = await aiService.generate('test');
			
			if (!result.success) {
				expect(result.error).toBeTruthy();
				expect(result.error!.length).toBeGreaterThan(0);
			}
		});
	});
});
