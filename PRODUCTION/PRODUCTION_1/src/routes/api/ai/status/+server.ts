import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { aiService } from '$lib/ai';

export const GET: RequestHandler = async ({ locals }) => {
	// Check authentication
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const status = await aiService.getStatus();
		return json(status);
	} catch (error) {
		console.error('AI status error:', error);
		return json(
			{ 
				available: false, 
				models: [], 
				currentModel: '', 
				error: 'Failed to get AI status' 
			},
			{ status: 500 }
		);
	}
};
