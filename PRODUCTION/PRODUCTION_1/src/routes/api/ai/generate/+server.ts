import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { aiService } from '$lib/ai';

export const POST: RequestHandler = async ({ request, locals }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { prompt, system, model, temperature, maxTokens } = await request.json();

		// Validate input
		if (!prompt || typeof prompt !== 'string') {
			return json({ error: 'Prompt is required' }, { status: 400 });
		}

		if (prompt.length > 10000) {
			return json({ error: 'Prompt too long (max 10,000 characters)' }, { status: 400 });
		}

		// Generate response
		const result = await aiService.generate(prompt, {
			system,
			model,
			temperature: temperature ? parseFloat(temperature) : undefined,
			maxTokens: maxTokens ? parseInt(maxTokens) : undefined
		});

		if (!result.success) {
			return json({ error: result.error }, { status: 500 });
		}

		return json({
			success: true,
			response: result.response
		});
	} catch (error) {
		console.error('AI generation error:', error);
		return json(
			{ error: 'Failed to generate AI response' },
			{ status: 500 }
		);
	}
};
