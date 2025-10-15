<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	// State
	let activeTab = 'profile';
	let loading = false;
	let saving = false;
	let exporting = false;
	let deleting = false;

	// Profile form
	let profileForm = {
		name: data.user.name,
		email: data.user.email,
		currentPassword: '',
		newPassword: '',
		confirmPassword: ''
	};

	// Delete account form
	let deleteForm = {
		password: '',
		confirmation: ''
	};

	// Messages
	let message = '';
	let error = '';

	// Theme
	let darkMode = false;

	onMount(() => {
		// Check for dark mode preference
		darkMode = document.documentElement.classList.contains('dark') || 
			window.matchMedia('(prefers-color-scheme: dark)').matches;
	});

	async function updateProfile() {
		if (profileForm.newPassword && profileForm.newPassword !== profileForm.confirmPassword) {
			error = 'New passwords do not match';
			return;
		}

		saving = true;
		error = '';
		message = '';

		try {
			const updateData: any = {
				name: profileForm.name,
				email: profileForm.email
			};

			if (profileForm.newPassword) {
				updateData.currentPassword = profileForm.currentPassword;
				updateData.newPassword = profileForm.newPassword;
			}

			const response = await fetch('/api/user/profile', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updateData)
			});

			const result = await response.json();

			if (result.success) {
				message = result.message;
				profileForm.currentPassword = '';
				profileForm.newPassword = '';
				profileForm.confirmPassword = '';
			} else {
				error = result.error;
			}
		} catch (err) {
			error = 'Failed to update profile';
		} finally {
			saving = false;
		}
	}

	async function exportData() {
		exporting = true;
		try {
			const response = await fetch('/api/user/export');
			const result = await response.json();

			if (result.success) {
				// Create and download file
				const blob = new Blob([JSON.stringify(result.data, null, 2)], {
					type: 'application/json'
				});
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `ahfai-data-export-${new Date().toISOString().split('T')[0]}.json`;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				URL.revokeObjectURL(url);

				message = 'Data exported successfully';
			} else {
				error = 'Failed to export data';
			}
		} catch (err) {
			error = 'Failed to export data';
		} finally {
			exporting = false;
		}
	}

	async function deleteAccount() {
		if (deleteForm.confirmation !== 'DELETE') {
			error = 'Please type DELETE to confirm';
			return;
		}

		if (!deleteForm.password) {
			error = 'Password is required';
			return;
		}

		deleting = true;
		error = '';

		try {
			const response = await fetch('/api/user/delete', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					password: deleteForm.password,
					confirmation: deleteForm.confirmation
				})
			});

			const result = await response.json();

			if (result.success) {
				alert('Account deleted successfully. You will be redirected to the login page.');
				goto('/auth/login');
			} else {
				error = result.error;
			}
		} catch (err) {
			error = 'Failed to delete account';
		} finally {
			deleting = false;
		}
	}

	function toggleTheme() {
		darkMode = !darkMode;
		if (darkMode) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}

	async function logout() {
		try {
			const response = await fetch('/api/auth/logout', { method: 'POST' });
			if (response.ok) {
				goto('/auth/login');
			}
		} catch (error) {
			console.error('Logout error:', error);
		}
	}

	function clearMessages() {
		message = '';
		error = '';
	}
</script>

<svelte:head>
	<title>Settings - AhFai</title>
	<meta name="description" content="Manage your account settings and preferences" />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<!-- Navigation -->
	<nav class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
		<div class="container mx-auto px-4">
			<div class="flex justify-between items-center h-16">
				<div class="flex items-center space-x-4">
					<h1 class="text-xl font-bold text-violet-600 dark:text-violet-400">AhFai</h1>
					<span class="text-gray-400">|</span>
					<h2 class="text-lg font-semibold text-gray-900 dark:text-white">Settings</h2>
				</div>
				<div class="flex items-center space-x-4">
					<a href="/app" class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
						← Back to App
					</a>
					<button
						on:click={logout}
						class="btn btn-secondary text-sm"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	</nav>

	<div class="container mx-auto px-4 py-8">
		<div class="max-w-4xl mx-auto">
			<!-- Tab Navigation -->
			<div class="border-b border-gray-200 dark:border-gray-700 mb-8">
				<nav class="-mb-px flex space-x-8">
					<button
						class="py-2 px-1 border-b-2 font-medium text-sm {activeTab === 'profile' ? 'border-violet-500 text-violet-600 dark:text-violet-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}"
						on:click={() => { activeTab = 'profile'; clearMessages(); }}
					>
						Profile
					</button>
					<button
						class="py-2 px-1 border-b-2 font-medium text-sm {activeTab === 'privacy' ? 'border-violet-500 text-violet-600 dark:text-violet-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}"
						on:click={() => { activeTab = 'privacy'; clearMessages(); }}
					>
						Privacy & Data
					</button>
					<button
						class="py-2 px-1 border-b-2 font-medium text-sm {activeTab === 'preferences' ? 'border-violet-500 text-violet-600 dark:text-violet-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}"
						on:click={() => { activeTab = 'preferences'; clearMessages(); }}
					>
						Preferences
					</button>
					<button
						class="py-2 px-1 border-b-2 font-medium text-sm {activeTab === 'danger' ? 'border-red-500 text-red-600 dark:text-red-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}"
						on:click={() => { activeTab = 'danger'; clearMessages(); }}
					>
						Danger Zone
					</button>
				</nav>
			</div>

			<!-- Messages -->
			{#if message}
				<div class="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
					<p class="text-sm text-green-600 dark:text-green-400">{message}</p>
				</div>
			{/if}

			{#if error}
				<div class="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
					<p class="text-sm text-red-600 dark:text-red-400">{error}</p>
				</div>
			{/if}

			<!-- Profile Tab -->
			{#if activeTab === 'profile'}
				<div class="card">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Profile Information</h3>
					
					<form on:submit|preventDefault={updateProfile} class="space-y-6">
						<!-- Name -->
						<div>
							<label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Full Name
							</label>
							<input
								id="name"
								type="text"
								bind:value={profileForm.name}
								class="input"
								required
							/>
						</div>

						<!-- Email -->
						<div>
							<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Email Address
							</label>
							<input
								id="email"
								type="email"
								bind:value={profileForm.email}
								class="input"
								required
							/>
						</div>

						<!-- Password Change Section -->
						<div class="border-t border-gray-200 dark:border-gray-700 pt-6">
							<h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Change Password</h4>
							
							<div class="space-y-4">
								<div>
									<label for="currentPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Current Password
									</label>
									<input
										id="currentPassword"
										type="password"
										bind:value={profileForm.currentPassword}
										class="input"
										placeholder="Enter current password to change"
									/>
								</div>

								<div>
									<label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										New Password
									</label>
									<input
										id="newPassword"
										type="password"
										bind:value={profileForm.newPassword}
										class="input"
										placeholder="Enter new password"
									/>
								</div>

								<div>
									<label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Confirm New Password
									</label>
									<input
										id="confirmPassword"
										type="password"
										bind:value={profileForm.confirmPassword}
										class="input"
										placeholder="Confirm new password"
									/>
								</div>
							</div>
						</div>

						<!-- Submit Button -->
						<div class="flex justify-end">
							<button
								type="submit"
								disabled={saving}
								class="btn btn-primary {saving ? 'opacity-50 cursor-not-allowed' : ''}"
							>
								{saving ? 'Saving...' : 'Save Changes'}
							</button>
						</div>
					</form>
				</div>
			{/if}

			<!-- Privacy & Data Tab -->
			{#if activeTab === 'privacy'}
				<div class="space-y-6">
					<!-- Data Export -->
					<div class="card">
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Export Your Data</h3>
						<p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
							Download all your data including chats, notes, and reminders in JSON format.
						</p>
						<button
							on:click={exportData}
							disabled={exporting}
							class="btn btn-primary {exporting ? 'opacity-50 cursor-not-allowed' : ''}"
						>
							{exporting ? 'Exporting...' : 'Export Data'}
						</button>
					</div>

					<!-- Privacy Information -->
					<div class="card">
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Privacy Information</h3>
						<div class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
							<div class="flex items-start space-x-3">
								<svg class="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
								</svg>
								<span>All data is stored locally on your device</span>
							</div>
							<div class="flex items-start space-x-3">
								<svg class="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
								</svg>
								<span>AI processing happens locally with Ollama</span>
							</div>
							<div class="flex items-start space-x-3">
								<svg class="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
								</svg>
								<span>No data is sent to external servers</span>
							</div>
							<div class="flex items-start space-x-3">
								<svg class="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
								</svg>
								<span>You can export your data at any time</span>
							</div>
						</div>
					</div>
				</div>
			{/if}

			<!-- Preferences Tab -->
			{#if activeTab === 'preferences'}
				<div class="card">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Appearance</h3>
					
					<div class="space-y-4">
						<!-- Theme Toggle -->
						<div class="flex items-center justify-between">
							<div>
								<label class="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</label>
								<p class="text-xs text-gray-500 dark:text-gray-400">Toggle between light and dark themes</p>
							</div>
							<button
								on:click={toggleTheme}
								class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors {darkMode ? 'bg-violet-600' : 'bg-gray-200'}"
							>
								<span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform {darkMode ? 'translate-x-6' : 'translate-x-1'}"></span>
							</button>
						</div>
					</div>
				</div>
			{/if}

			<!-- Danger Zone Tab -->
			{#if activeTab === 'danger'}
				<div class="card border-red-200 dark:border-red-800">
					<h3 class="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">Danger Zone</h3>
					<p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
						Once you delete your account, there is no going back. Please be certain.
					</p>
					
					<form on:submit|preventDefault={deleteAccount} class="space-y-4">
						<div>
							<label for="deletePassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Enter your password to confirm
							</label>
							<input
								id="deletePassword"
								type="password"
								bind:value={deleteForm.password}
								class="input"
								placeholder="Your password"
								required
							/>
						</div>

						<div>
							<label for="deleteConfirmation" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Type "DELETE" to confirm
							</label>
							<input
								id="deleteConfirmation"
								type="text"
								bind:value={deleteForm.confirmation}
								class="input"
								placeholder="DELETE"
								required
							/>
						</div>

						<button
							type="submit"
							disabled={deleting}
							class="btn bg-red-600 text-white hover:bg-red-700 {deleting ? 'opacity-50 cursor-not-allowed' : ''}"
						>
							{deleting ? 'Deleting Account...' : 'Delete Account'}
						</button>
					</form>
				</div>
			{/if}
		</div>
	</div>
</div>
