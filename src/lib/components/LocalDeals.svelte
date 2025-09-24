<script lang="ts">
	import { onMount } from 'svelte';
	
	let deals = $state<Array<{
		id: string,
		title: string,
		store: string,
		discount: string,
		description: string,
		expiresAt: Date,
		category: string,
		distance: string
	}>>([]);
	let loading = $state(true);

	onMount(async () => {
		// Simulate loading deals
		await new Promise(resolve => setTimeout(resolve, 1200));
		
		deals = [
			{
				id: '1',
				title: '50% Off Coffee',
				store: 'Local Brew Café',
				discount: '50%',
				description: 'Buy one coffee, get one 50% off',
				expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
				category: 'Food & Drink',
				distance: '0.3 mi'
			},
			{
				id: '2',
				title: 'Free Delivery',
				store: 'Pizza Palace',
				discount: 'Free',
				description: 'Free delivery on orders over $25',
				expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
				category: 'Food & Drink',
				distance: '0.8 mi'
			},
			{
				id: '3',
				title: '20% Off Electronics',
				store: 'TechMart',
				discount: '20%',
				description: 'Discount on all smartphones and tablets',
				expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
				category: 'Electronics',
				distance: '1.2 mi'
			},
			{
				id: '4',
				title: 'Buy 2 Get 1 Free',
				store: 'BookNook',
				discount: 'BOGO',
				description: 'Buy 2 books, get 1 free',
				expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
				category: 'Books',
				distance: '0.5 mi'
			}
		];
		
		loading = false;
	});

	function getCategoryIcon(category: string) {
		switch (category) {
			case 'Food & Drink': return '🍕';
			case 'Electronics': return '📱';
			case 'Books': return '📚';
			case 'Clothing': return '👕';
			case 'Health': return '💊';
			default: return '🏪';
		}
	}

	function formatExpiresIn(expiresAt: Date) {
		const now = new Date();
		const diffInHours = Math.floor((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60));
		
		if (diffInHours < 24) return `${diffInHours}h left`;
		
		const diffInDays = Math.floor(diffInHours / 24);
		return `${diffInDays}d left`;
	}

	function getDiscountColor(discount: string) {
		if (discount.includes('%')) {
			const percentage = parseInt(discount);
			if (percentage >= 50) return '#ef4444'; // Red for high discounts
			if (percentage >= 25) return '#f59e0b'; // Orange for medium discounts
			return '#10b981'; // Green for low discounts
		}
		return '#3b82f6'; // Blue for other types
	}
</script>

<div class="deals-container">
	{#if loading}
		<div class="loading-state">
			<div class="loading"></div>
			<p>Finding local deals...</p>
		</div>
	{:else if deals.length === 0}
		<div class="empty-state">
			<div class="empty-icon">💰</div>
			<p>No deals found nearby</p>
			<button class="btn btn-primary">Refresh</button>
		</div>
	{:else}
		<div class="deals-list">
			{#each deals as deal}
				<div class="deal-item">
					<div class="deal-header">
						<div class="deal-category">
							<span class="category-icon">{getCategoryIcon(deal.category)}</span>
							<span class="category-text">{deal.category}</span>
						</div>
						<div 
							class="deal-discount"
							style="background-color: {getDiscountColor(deal.discount)}"
						>
							{deal.discount}
						</div>
					</div>
					
					<div class="deal-content">
						<div class="deal-title">{deal.title}</div>
						<div class="deal-store">{deal.store}</div>
						<div class="deal-description">{deal.description}</div>
					</div>
					
					<div class="deal-footer">
						<div class="deal-meta">
							<span class="deal-distance">📍 {deal.distance}</span>
							<span class="deal-expires">⏰ {formatExpiresIn(deal.expiresAt)}</span>
						</div>
						<button class="btn-claim">Claim</button>
					</div>
				</div>
			{/each}
		</div>
		
		<div class="deals-footer">
			<a href="/deals" class="btn btn-secondary">View All Deals</a>
		</div>
	{/if}
</div>

<style>
	.deals-container {
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

	.deals-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.deal-item {
		background: rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 0.5rem;
		padding: 1rem;
		transition: all 0.2s;
	}

	.deal-item:hover {
		background: rgba(255, 255, 255, 1);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		transform: translateY(-1px);
	}

	.deal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.deal-category {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.category-icon {
		font-size: 1rem;
	}

	.category-text {
		font-size: 0.75rem;
		color: #64748b;
		font-weight: 500;
	}

	.deal-discount {
		color: white;
		font-weight: 700;
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
	}

	.deal-content {
		margin-bottom: 0.75rem;
	}

	.deal-title {
		font-weight: 600;
		color: #1e293b;
		font-size: 0.875rem;
		margin-bottom: 0.25rem;
	}

	.deal-store {
		font-weight: 500;
		color: #3b82f6;
		font-size: 0.8rem;
		margin-bottom: 0.25rem;
	}

	.deal-description {
		color: #64748b;
		font-size: 0.75rem;
		line-height: 1.4;
	}

	.deal-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.deal-meta {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.7rem;
		color: #94a3b8;
	}

	.deal-distance,
	.deal-expires {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.btn-claim {
		background: #10b981;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.btn-claim:hover {
		background: #059669;
	}

	.deals-footer {
		margin-top: 1rem;
		text-align: center;
	}

	@media (max-width: 640px) {
		.deal-item {
			padding: 0.75rem;
		}
		
		.deal-title {
			font-size: 0.8rem;
		}
		
		.deal-description {
			font-size: 0.7rem;
		}
		
		.deal-footer {
			flex-direction: column;
			gap: 0.5rem;
			align-items: flex-start;
		}
	}
</style>
