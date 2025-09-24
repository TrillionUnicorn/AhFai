<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="app">
	<header class="header">
		<nav class="navbar">
			<div class="nav-brand">
				<a href="/" class="brand-link">
					<span class="brand-icon">🤖</span>
					<span class="brand-text">AhFai</span>
				</a>
			</div>
			<div class="nav-links">
				<a href="/" class="nav-link">Dashboard</a>
				<a href="/notes" class="nav-link">Notes</a>
				<a href="/deals" class="nav-link">Deals</a>
				<a href="/chat" class="nav-link">Chat</a>
			</div>
		</nav>
	</header>

	<main class="main-content">
		{@render children?.()}
	</main>

	<footer class="footer">
		<div class="footer-content">
			<p>&copy; 2024 AhFai - Your Personal AI Assistant</p>
			<div class="footer-links">
				<a href="/privacy">Privacy</a>
				<a href="/terms">Terms</a>
				<a href="https://github.com/TrillionUnicorn/AhFai" target="_blank">GitHub</a>
			</div>
		</div>
	</footer>
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.header {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}

	.navbar {
		padding: 1rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin: 0 auto;
	}

	.nav-brand .brand-link {
		display: flex;
		align-items: center;
		text-decoration: none;
		color: white;
		font-weight: 700;
		font-size: 1.5rem;
	}

	.brand-icon {
		margin-right: 0.5rem;
		font-size: 1.8rem;
	}

	.nav-links {
		display: flex;
		gap: 2rem;
	}

	.nav-link {
		text-decoration: none;
		color: rgba(255, 255, 255, 0.8);
		font-weight: 500;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		transition: all 0.2s;
	}

	.nav-link:hover {
		color: white;
		background-color: rgba(255, 255, 255, 0.1);
	}

	.main-content {
		flex: 1;
		padding: 2rem;
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
	}

	.footer {
		background: rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(10px);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding: 2rem;
		margin-top: auto;
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: rgba(255, 255, 255, 0.8);
	}

	.footer-links {
		display: flex;
		gap: 1.5rem;
	}

	.footer-links a {
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		transition: color 0.2s;
	}

	.footer-links a:hover {
		color: white;
	}

	@media (max-width: 768px) {
		.navbar {
			padding: 1rem;
			flex-direction: column;
			gap: 1rem;
		}

		.nav-links {
			gap: 1rem;
		}

		.main-content {
			padding: 1rem;
		}

		.footer-content {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}
	}
</style>
