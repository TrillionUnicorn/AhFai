// MVP Variant Configuration
export const variants = {
	'privacy': {
		id: 'privacy',
		name: 'Privacy Guardian',
		tagline: 'Your Privacy-First AI Personal Assistant',
		description: 'Maximum privacy and security focus',
		theme: {
			primary: '#8b5cf6',
			secondary: '#7c3aed',
			accent: '#6d28d9',
			gradient: 'from-violet-500 to-purple-600'
		},
		target: 'Privacy-conscious professionals, journalists, lawyers',
		pricing: {
			free: 0,
			pro: 9.99,
			enterprise: 99.99
		}
	},
	'productivity': {
		id: 'productivity',
		name: 'Productivity Powerhouse',
		tagline: 'Supercharge Your Productivity with AI',
		description: 'Maximum productivity and efficiency focus',
		theme: {
			primary: '#f97316',
			secondary: '#ea580c',
			accent: '#c2410c',
			gradient: 'from-orange-500 to-red-600'
		},
		target: 'Entrepreneurs, startups, busy professionals',
		pricing: {
			free: 0,
			pro: 12.99,
			enterprise: 149.99
		}
	},
	'student': {
		id: 'student',
		name: 'Student & Learner Edition',
		tagline: 'Your AI Study Buddy',
		description: 'Education and learning focus',
		theme: {
			primary: '#10b981',
			secondary: '#059669',
			accent: '#047857',
			gradient: 'from-green-500 to-teal-600'
		},
		target: 'Students, researchers, lifelong learners',
		pricing: {
			free: 0,
			pro: 4.99,
			enterprise: 49.99
		}
	},
	'enterprise': {
		id: 'enterprise',
		name: 'Enterprise & Team Edition',
		tagline: 'Enterprise-Grade AI for Your Team',
		description: 'Business and collaboration focus',
		theme: {
			primary: '#1e40af',
			secondary: '#1e3a8a',
			accent: '#1e293b',
			gradient: 'from-blue-900 to-slate-800'
		},
		target: 'Teams, enterprises, organizations',
		pricing: {
			free: 0,
			pro: 49.99,
			enterprise: 499.99
		}
	},
	'creative': {
		id: 'creative',
		name: 'Creative & Content Creator Edition',
		tagline: 'Unleash Your Creativity with AI',
		description: 'Creativity and content creation focus',
		theme: {
			primary: '#a855f7',
			secondary: '#9333ea',
			accent: '#7e22ce',
			gradient: 'from-purple-500 via-pink-500 to-cyan-500'
		},
		target: 'Writers, designers, content creators, marketers',
		pricing: {
			free: 0,
			pro: 19.99,
			enterprise: 199.99
		}
	}
} as const;

export type VariantId = keyof typeof variants;

export function getVariant(id: VariantId) {
	return variants[id];
}

export function getAllVariants() {
	return Object.values(variants);
}

