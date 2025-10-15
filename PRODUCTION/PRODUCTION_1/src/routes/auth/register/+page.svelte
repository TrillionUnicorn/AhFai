<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let name = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let loading = false;
	let errors: Record<string, string> = {};
	let message = '';

	// Redirect if already logged in
	onMount(() => {
		if ($page.data.user) {
			goto('/app');
		}
	});

	async function handleRegister() {
		loading = true;
		errors = {};
		message = '';

		// Client-side validation
		if (password !== confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
			loading = false;
			return;
		}

		try {
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, email, password })
			});

			const result = await response.json();

			if (result.success) {
				message = result.message;
				// Redirect to app after successful registration
				setTimeout(() => {
					goto('/app');
				}, 1000);
			} else {
				errors = result.errors || {};
			}
		} catch (error) {
			errors.general = 'Network error. Please try again.';
		} finally {
			loading = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleRegister();
		}
	}
</script>

<svelte:head>
	<title>Sign Up - AhFai</title>
	<meta name="description" content="Create your AhFai account" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
	<div class="max-w-md w-full">
		<!-- Logo and Header -->
		<div class="text-center mb-8">
			<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h1>
			<p class="text-gray-600 dark:text-gray-400">Join AhFai and start your privacy-first AI journey</p>
		</div>

		<!-- Register Form -->
		<div class="card">
			<form on:submit|preventDefault={handleRegister} class="space-y-6">
				<!-- Name Field -->
				<div>
					<label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Full Name
					</label>
					<input
						id="name"
						type="text"
						bind:value={name}
						on:keydown={handleKeydown}
						class="input {errors.name ? 'border-red-500' : ''}"
						placeholder="Enter your full name"
						required
						disabled={loading}
					/>
					{#if errors.name}
						<p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
					{/if}
				</div>

				<!-- Email Field -->
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Email Address
					</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						on:keydown={handleKeydown}
						class="input {errors.email ? 'border-red-500' : ''}"
						placeholder="Enter your email"
						required
						disabled={loading}
					/>
					{#if errors.email}
						<p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
					{/if}
				</div>

				<!-- Password Field -->
				<div>
					<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Password
					</label>
					<input
						id="password"
						type="password"
						bind:value={password}
						on:keydown={handleKeydown}
						class="input {errors.password ? 'border-red-500' : ''}"
						placeholder="Create a strong password"
						required
						disabled={loading}
					/>
					{#if errors.password}
						<p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
					{/if}
					<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
						Must be at least 8 characters with uppercase, lowercase, and number
					</p>
				</div>

				<!-- Confirm Password Field -->
				<div>
					<label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Confirm Password
					</label>
					<input
						id="confirmPassword"
						type="password"
						bind:value={confirmPassword}
						on:keydown={handleKeydown}
						class="input {errors.confirmPassword ? 'border-red-500' : ''}"
						placeholder="Confirm your password"
						required
						disabled={loading}
					/>
					{#if errors.confirmPassword}
						<p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
					{/if}
				</div>

				<!-- General Error -->
				{#if errors.general}
					<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
						<p class="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
					</div>
				{/if}

				<!-- Success Message -->
				{#if message}
					<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
						<p class="text-sm text-green-600 dark:text-green-400">{message}</p>
					</div>
				{/if}

				<!-- Submit Button -->
				<button
					type="submit"
					disabled={loading}
					class="btn btn-primary w-full {loading ? 'opacity-50 cursor-not-allowed' : ''}"
				>
					{#if loading}
						<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						Creating Account...
					{:else}
						Create Account
					{/if}
				</button>
			</form>

			<!-- Login Link -->
			<div class="mt-6 text-center">
				<p class="text-sm text-gray-600 dark:text-gray-400">
					Already have an account?
					<a href="/auth/login" class="font-medium text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300">
						Sign in
					</a>
				</p>
			</div>
		</div>

		<!-- Back to Home -->
		<div class="mt-6 text-center">
			<a href="/" class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
				← Back to Home
			</a>
		</div>
	</div>
</div>
