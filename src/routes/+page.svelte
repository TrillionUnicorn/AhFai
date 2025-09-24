<script lang="ts">
	import AIChat from '$lib/components/AIChat.svelte';
	import QuickActions from '$lib/components/QuickActions.svelte';
	import RecentNotes from '$lib/components/RecentNotes.svelte';
	import LocalDeals from '$lib/components/LocalDeals.svelte';
</script>

<svelte:head>
	<title>AhFai - Your Personal AI Assistant</title>
	<meta name="description" content="Your privacy-first personal AI assistant for notes, reminders, deals, and more." />
</svelte:head>

<div class="dashboard">
	<div class="welcome-section">
		<div class="card">
			<h1 class="welcome-title">
				Welcome back! 👋
			</h1>
			<p class="welcome-description">
				Your personal AI assistant is here to help you stay organized, find great deals, and manage your daily tasks.
				Everything stays private and secure on your device.
			</p>
			<QuickActions />
		</div>
	</div>

	<div class="dashboard-grid">
		<div class="chat-section">
			<div class="card">
				<h2 class="section-title">
					🤖 AI Assistant
				</h2>
				<AIChat />
			</div>
		</div>

		<div class="sidebar">
			<div class="card">
				<h3 class="section-title">
					📝 Recent Notes
				</h3>
				<RecentNotes />
			</div>

			<div class="card">
				<h3 class="section-title">
					💰 Local Deals
				</h3>
				<LocalDeals />
			</div>
		</div>
	</div>
</div>

<style>
	.dashboard {
		max-width: 1200px;
		margin: 0 auto;
	}

	.welcome-section {
		margin-bottom: 2rem;
	}

	.welcome-title {
		font-size: 2.5rem;
		font-weight: 700;
		color: #1e293b;
		margin-bottom: 1rem;
		text-align: center;
	}

	.welcome-description {
		font-size: 1.125rem;
		color: #64748b;
		text-align: center;
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.dashboard-grid {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 2rem;
		align-items: start;
	}

	.chat-section {
		min-height: 500px;
	}

	.sidebar {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.section-title {
		margin: 0 0 1.5rem 0;
		color: #1e293b;
		font-size: 1.25rem;
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	@media (max-width: 768px) {
		.welcome-title {
			font-size: 2rem;
		}

		.welcome-description {
			font-size: 1rem;
		}

		.dashboard-grid {
			grid-template-columns: 1fr;
		}

		.sidebar {
			order: -1;
		}
	}
</style>
