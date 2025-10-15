import { Ollama } from 'ollama';

// Initialize Ollama client
const ollama = new Ollama({
	host: process.env.OLLAMA_HOST || 'http://localhost:11434'
});

// Default model configuration
const DEFAULT_MODEL = 'llama3.1:8b';
const FALLBACK_MODEL = 'llama3.1:7b';

// AI Service class
export class AIService {
	private model: string;

	constructor(model: string = DEFAULT_MODEL) {
		this.model = model;
	}

	// Check if Ollama is available
	async isAvailable(): Promise<boolean> {
		try {
			await ollama.list();
			return true;
		} catch (error) {
			console.error('Ollama not available:', error);
			return false;
		}
	}

	// Check if a specific model is available
	async isModelAvailable(model: string): Promise<boolean> {
		try {
			const models = await ollama.list();
			return models.models.some(m => m.name.includes(model));
		} catch (error) {
			console.error('Error checking model availability:', error);
			return false;
		}
	}

	// Get available models
	async getAvailableModels(): Promise<string[]> {
		try {
			const models = await ollama.list();
			return models.models.map(m => m.name);
		} catch (error) {
			console.error('Error getting models:', error);
			return [];
		}
	}

	// Pull a model if not available
	async ensureModel(model: string): Promise<boolean> {
		try {
			const isAvailable = await this.isModelAvailable(model);
			if (isAvailable) return true;

			console.log(`Pulling model: ${model}`);
			await ollama.pull({ model });
			return true;
		} catch (error) {
			console.error(`Error pulling model ${model}:`, error);
			return false;
		}
	}

	// Generate a single response
	async generate(prompt: string, options: {
		model?: string;
		system?: string;
		temperature?: number;
		maxTokens?: number;
	} = {}): Promise<{
		success: boolean;
		response?: string;
		error?: string;
	}> {
		try {
			const model = options.model || this.model;
			
			// Ensure model is available
			const modelAvailable = await this.ensureModel(model);
			if (!modelAvailable) {
				// Try fallback model
				const fallbackAvailable = await this.ensureModel(FALLBACK_MODEL);
				if (!fallbackAvailable) {
					return {
						success: false,
						error: 'No AI models available. Please install Ollama and pull a model.'
					};
				}
			}

			const response = await ollama.generate({
				model: modelAvailable ? model : FALLBACK_MODEL,
				prompt,
				system: options.system,
				options: {
					temperature: options.temperature || 0.7,
					num_predict: options.maxTokens || 2048
				}
			});

			return {
				success: true,
				response: response.response
			};
		} catch (error) {
			console.error('AI generation error:', error);
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown AI error'
			};
		}
	}

	// Generate streaming response
	async generateStream(prompt: string, options: {
		model?: string;
		system?: string;
		temperature?: number;
		maxTokens?: number;
		onToken?: (token: string) => void;
	} = {}): Promise<{
		success: boolean;
		response?: string;
		error?: string;
	}> {
		try {
			const model = options.model || this.model;
			
			// Ensure model is available
			const modelAvailable = await this.ensureModel(model);
			if (!modelAvailable) {
				const fallbackAvailable = await this.ensureModel(FALLBACK_MODEL);
				if (!fallbackAvailable) {
					return {
						success: false,
						error: 'No AI models available. Please install Ollama and pull a model.'
					};
				}
			}

			let fullResponse = '';
			const stream = await ollama.generate({
				model: modelAvailable ? model : FALLBACK_MODEL,
				prompt,
				system: options.system,
				stream: true,
				options: {
					temperature: options.temperature || 0.7,
					num_predict: options.maxTokens || 2048
				}
			});

			for await (const chunk of stream) {
				if (chunk.response) {
					fullResponse += chunk.response;
					if (options.onToken) {
						options.onToken(chunk.response);
					}
				}
			}

			return {
				success: true,
				response: fullResponse
			};
		} catch (error) {
			console.error('AI streaming error:', error);
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown AI error'
			};
		}
	}

	// Chat with conversation history
	async chat(messages: Array<{
		role: 'user' | 'assistant' | 'system';
		content: string;
	}>, options: {
		model?: string;
		temperature?: number;
		maxTokens?: number;
	} = {}): Promise<{
		success: boolean;
		response?: string;
		error?: string;
	}> {
		try {
			const model = options.model || this.model;
			
			// Ensure model is available
			const modelAvailable = await this.ensureModel(model);
			if (!modelAvailable) {
				const fallbackAvailable = await this.ensureModel(FALLBACK_MODEL);
				if (!fallbackAvailable) {
					return {
						success: false,
						error: 'No AI models available. Please install Ollama and pull a model.'
					};
				}
			}

			const response = await ollama.chat({
				model: modelAvailable ? model : FALLBACK_MODEL,
				messages: messages.map(msg => ({
					role: msg.role,
					content: msg.content
				})),
				options: {
					temperature: options.temperature || 0.7,
					num_predict: options.maxTokens || 2048
				}
			});

			return {
				success: true,
				response: response.message.content
			};
		} catch (error) {
			console.error('AI chat error:', error);
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown AI error'
			};
		}
	}

	// Get system status
	async getStatus(): Promise<{
		available: boolean;
		models: string[];
		currentModel: string;
		error?: string;
	}> {
		try {
			const available = await this.isAvailable();
			if (!available) {
				return {
					available: false,
					models: [],
					currentModel: this.model,
					error: 'Ollama service not available'
				};
			}

			const models = await this.getAvailableModels();
			return {
				available: true,
				models,
				currentModel: this.model
			};
		} catch (error) {
			return {
				available: false,
				models: [],
				currentModel: this.model,
				error: error instanceof Error ? error.message : 'Unknown error'
			};
		}
	}
}

// Export singleton instance
export const aiService = new AIService();

// Export types
export interface ChatMessage {
	role: 'user' | 'assistant' | 'system';
	content: string;
}

export interface AIResponse {
	success: boolean;
	response?: string;
	error?: string;
}

export interface AIStatus {
	available: boolean;
	models: string[];
	currentModel: string;
	error?: string;
}
