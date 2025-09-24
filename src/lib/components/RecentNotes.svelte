<script lang="ts">
	import { onMount } from 'svelte';
	
	let notes = $state<Array<{id: string, title: string, content: string, timestamp: Date, priority: 'high' | 'medium' | 'low'}>>([]);
	let loading = $state(true);

	onMount(async () => {
		// Simulate loading notes
		await new Promise(resolve => setTimeout(resolve, 1000));
		
		notes = [
			{
				id: '1',
				title: 'Meeting with Sarah',
				content: 'Discuss project timeline and budget allocation for Q1',
				timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
				priority: 'high'
			},
			{
				id: '2',
				title: 'Grocery List',
				content: 'Milk, eggs, bread, apples, chicken breast, rice',
				timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
				priority: 'medium'
			},
			{
				id: '3',
				title: 'Book Recommendation',
				content: 'The Pragmatic Programmer - recommended by John',
				timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
				priority: 'low'
			},
			{
				id: '4',
				title: 'Weekend Plans',
				content: 'Visit the farmers market, try new restaurant downtown',
				timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
				priority: 'medium'
			}
		];
		
		loading = false;
	});

	function getPriorityColor(priority: string) {
		switch (priority) {
			case 'high': return '#ef4444';
			case 'medium': return '#f59e0b';
			case 'low': return '#10b981';
			default: return '#64748b';
		}
	}

	function formatTimeAgo(timestamp: Date) {
		const now = new Date();
		const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
		
		if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
		
		const diffInHours = Math.floor(diffInMinutes / 60);
		if (diffInHours < 24) return `${diffInHours}h ago`;
		
		const diffInDays = Math.floor(diffInHours / 24);
		return `${diffInDays}d ago`;
	}
</script>

<div class="notes-container">
	{#if loading}
		<div class="loading-state">
			<div class="loading"></div>
			<p>Loading your notes...</p>
		</div>
	{:else if notes.length === 0}
		<div class="empty-state">
			<div class="empty-icon">📝</div>
			<p>No notes yet</p>
			<button class="btn btn-primary">Create First Note</button>
		</div>
	{:else}
		<div class="notes-list">
			{#each notes as note}
				<div class="note-item">
					<div class="note-header">
						<div class="note-title">{note.title}</div>
						<div 
							class="priority-indicator"
							style="background-color: {getPriorityColor(note.priority)}"
						></div>
					</div>
					<div class="note-content">{note.content}</div>
					<div class="note-footer">
						<span class="note-time">{formatTimeAgo(note.timestamp)}</span>
						<div class="note-actions">
							<button class="btn-icon" title="Edit">✏️</button>
							<button class="btn-icon" title="Delete">🗑️</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
		
		<div class="notes-footer">
			<a href="/notes" class="btn btn-secondary">View All Notes</a>
		</div>
	{/if}
</div>

<style>
	.notes-container {
		max-width: 400px;
	}

	.loading-state,
	.empty-state {
		text-align: center;
		padding: 2rem 1rem;
		color: #64748b;
	}

	.empty-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
		opacity: 0.5;
	}

	.notes-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.note-item {
		background: rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 0.5rem;
		padding: 1rem;
		transition: all 0.2s;
	}

	.note-item:hover {
		background: rgba(255, 255, 255, 1);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.note-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.note-title {
		font-weight: 600;
		color: #1e293b;
		font-size: 0.875rem;
	}

	.priority-indicator {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.note-content {
		color: #64748b;
		font-size: 0.8rem;
		line-height: 1.4;
		margin-bottom: 0.75rem;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.note-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.75rem;
	}

	.note-time {
		color: #94a3b8;
		font-weight: 500;
	}

	.note-actions {
		display: flex;
		gap: 0.25rem;
	}

	.btn-icon {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
		border-radius: 0.25rem;
		transition: background-color 0.2s;
		font-size: 0.75rem;
	}

	.btn-icon:hover {
		background: rgba(0, 0, 0, 0.05);
	}

	.notes-footer {
		margin-top: 1rem;
		text-align: center;
	}

	@media (max-width: 640px) {
		.note-item {
			padding: 0.75rem;
		}
		
		.note-title {
			font-size: 0.8rem;
		}
		
		.note-content {
			font-size: 0.75rem;
		}
	}
</style>
