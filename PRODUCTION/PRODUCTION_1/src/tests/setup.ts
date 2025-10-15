import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/svelte';

// Cleanup after each test
afterEach(() => {
	cleanup();
});

// Mock environment variables
process.env.NODE_ENV = 'test';
process.env.OLLAMA_HOST = 'http://localhost:11434';
