<script lang="ts">
	const quickActions = [
		{
			icon: '📝',
			title: 'Create Note',
			description: 'Quick note or reminder',
			action: () => alert('Note creation feature coming soon!')
		},
		{
			icon: '💰',
			title: 'Find Deals',
			description: 'Discover local offers',
			action: () => window.location.href = '/deals'
		},
		{
			icon: '💬',
			title: 'WhatsApp Bot',
			description: 'Connect messaging',
			action: () => alert('WhatsApp integration coming soon!')
		},
		{
			icon: '⏰',
			title: 'Set Reminder',
			description: 'Schedule a reminder',
			action: () => alert('Reminder feature coming soon!')
		}
	];
</script>

<div class="quick-actions">
	<h3 class="actions-title">Quick Actions</h3>
	<div class="actions-grid">
		{#each quickActions as action}
			<button class="action-card" onclick={action.action}>
				<div class="action-icon">{action.icon}</div>
				<div class="action-content">
					<div class="action-title">{action.title}</div>
					<div class="action-description">{action.description}</div>
				</div>
			</button>
		{/each}
	</div>
</div>

<style>
	.quick-actions {
		margin-top: 2rem;
	}

	.actions-title {
		margin: 0 0 1rem 0;
		color: #1e293b;
		font-size: 1.125rem;
		font-weight: 600;
		text-align: center;
	}

	.actions-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.action-card {
		background: rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 0.75rem;
		padding: 1.5rem;
		cursor: pointer;
		transition: all 0.2s;
		text-align: left;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.action-card:hover {
		background: rgba(255, 255, 255, 1);
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
	}

	.action-icon {
		font-size: 2rem;
		flex-shrink: 0;
	}

	.action-content {
		flex: 1;
	}

	.action-title {
		font-weight: 600;
		color: #1e293b;
		margin-bottom: 0.25rem;
	}

	.action-description {
		font-size: 0.875rem;
		color: #64748b;
	}

	@media (max-width: 640px) {
		.actions-grid {
			grid-template-columns: 1fr;
		}
		
		.action-card {
			padding: 1rem;
		}
	}
</style>
