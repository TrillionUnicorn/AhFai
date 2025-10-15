<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	async function handleLogout() {
		try {
			const response = await fetch('/api/auth/logout', {
				method: 'POST'
			});

			if (response.ok) {
				goto('/auth/login');
			}
		} catch (error) {
			console.error('Logout error:', error);
		}
	}
</script>

<svelte:head>
	<title>AhFai - Privacy-First AI Assistant</title>
	<meta name="description" content="Your personal AI assistant that respects your privacy" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
	<!-- Navigation -->
	<nav class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
		<div class="container mx-auto px-4">
			<div class="flex justify-between items-center h-16">
				<div class="flex items-center">
					<h1 class="text-xl font-bold text-violet-600 dark:text-violet-400">AhFai</h1>
				</div>
				<div class="flex items-center space-x-4">
					<span class="text-sm text-gray-600 dark:text-gray-300">
						Welcome, {data.user.name}
					</span>
					<a href="/app/settings" class="btn btn-secondary text-sm">
						Settings
					</a>
					<button
						on:click={handleLogout}
						class="btn btn-secondary text-sm"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<div class="container mx-auto px-4 py-8">
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
				Welcome to AhFai
			</h1>
			<p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
				Your Privacy-First AI Assistant
			</p>
		</div>

		{#if mounted}
			<div class="animate-fade-in">
				<!-- Feature Cards -->
				<div class="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
					<!-- Chat Feature -->
					<div class="card hover:shadow-lg transition-shadow">
						<div class="text-center">
							<div class="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
								<svg class="w-6 h-6 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
								</svg>
							</div>
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Chat</h3>
							<p class="text-gray-600 dark:text-gray-400 text-sm">
								Chat with your AI assistant powered by local models
							</p>
							<a href="/app/chat" class="btn btn-primary mt-4 w-full block text-center">
								Start Chatting
							</a>
						</div>
					</div>

					<!-- Notes Feature -->
					<div class="card hover:shadow-lg transition-shadow">
						<div class="text-center">
							<div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
								<svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
								</svg>
							</div>
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Notes</h3>
							<p class="text-gray-600 dark:text-gray-400 text-sm">
								Take notes with AI-powered suggestions and organization
							</p>
							<a href="/app/notes" class="btn btn-primary mt-4 w-full block text-center">
								Take Notes
							</a>
						</div>
					</div>

					<!-- Reminders Feature -->
					<div class="card hover:shadow-lg transition-shadow">
						<div class="text-center">
							<div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
								<svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
								</svg>
							</div>
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Reminders</h3>
							<p class="text-gray-600 dark:text-gray-400 text-sm">
								Set intelligent reminders with natural language
							</p>
							<a href="/app/reminders" class="btn btn-primary mt-4 w-full block text-center">
								Set Reminders
							</a>
						</div>
					</div>
				</div>

				<!-- User Info -->
				<div class="mt-12 max-w-md mx-auto">
					<div class="card">
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Information</h3>
						<div class="space-y-2 text-sm">
							<div class="flex justify-between">
								<span class="text-gray-600 dark:text-gray-400">Name:</span>
								<span class="text-gray-900 dark:text-white">{data.user.name}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-600 dark:text-gray-400">Email:</span>
								<span class="text-gray-900 dark:text-white">{data.user.email}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-600 dark:text-gray-400">Member since:</span>
								<span class="text-gray-900 dark:text-white">
									{new Date(data.user.createdAt).toLocaleDateString()}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.6s ease-out;
	}
</style>
