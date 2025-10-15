<script lang="ts">
	import '../../app.css';
	import { page } from '$app/stores';
	
	let mobileMenuOpen = $state(false);
	
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<svelte:head>
	<style>
		body {
			background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%);
		}
	</style>
</svelte:head>

<div class="min-h-screen">
	<!-- Navigation -->
	<nav class="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
		<div class="container mx-auto px-4">
			<div class="flex items-center justify-between h-16">
				<!-- Logo -->
				<a href="/" class="flex items-center gap-2">
					<div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
						<span class="text-2xl">⚡</span>
					</div>
					<span class="text-xl font-bold text-white">AhFai Pro</span>
				</a>
				
				<!-- Desktop Navigation -->
				<div class="hidden md:flex items-center gap-6">
					<a href="#features" class="text-white/90 hover:text-white transition-colors">Features</a>
					<a href="#productivity" class="text-white/90 hover:text-white transition-colors">Productivity</a>
					<a href="#pricing" class="text-white/90 hover:text-white transition-colors">Pricing</a>
					<a href="/contact" class="text-white/90 hover:text-white transition-colors">Contact</a>
					<a href="/app" class="px-6 py-2 bg-white text-orange-600 rounded-lg font-semibold hover:bg-white/90 transition-all">
						Get Started
					</a>
				</div>
				
				<!-- Mobile Menu Button -->
				<button
					onclick={toggleMobileMenu}
					class="md:hidden text-white p-2"
					aria-label="Toggle menu"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						{#if mobileMenuOpen}
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
						{:else}
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
						{/if}
					</svg>
				</button>
			</div>
			
			<!-- Mobile Menu -->
			{#if mobileMenuOpen}
				<div class="md:hidden py-4 border-t border-white/20">
					<div class="flex flex-col gap-4">
						<a href="#features" class="text-white/90 hover:text-white transition-colors">Features</a>
						<a href="#productivity" class="text-white/90 hover:text-white transition-colors">Productivity</a>
						<a href="#pricing" class="text-white/90 hover:text-white transition-colors">Pricing</a>
						<a href="/contact" class="text-white/90 hover:text-white transition-colors">Contact</a>
						<a href="/app" class="px-6 py-2 bg-white text-orange-600 rounded-lg font-semibold hover:bg-white/90 transition-all text-center">
							Get Started
						</a>
					</div>
				</div>
			{/if}
		</div>
	</nav>
	
	<!-- Main Content -->
	<main class="pt-16">
		<slot />
	</main>
	
	<!-- Footer -->
	<footer class="bg-white/10 backdrop-blur-lg border-t border-white/20 mt-20">
		<div class="container mx-auto px-4 py-12">
			<div class="grid md:grid-cols-4 gap-8">
				<div>
					<div class="flex items-center gap-2 mb-4">
						<div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
							<span class="text-2xl">⚡</span>
						</div>
						<span class="text-xl font-bold text-white">AhFai Pro</span>
					</div>
					<p class="text-white/70 text-sm">
						Supercharge your productivity with AI-powered assistance.
					</p>
				</div>
				
				<div>
					<h3 class="text-white font-semibold mb-4">Product</h3>
					<ul class="space-y-2 text-white/70 text-sm">
						<li><a href="#features" class="hover:text-white transition-colors">Features</a></li>
						<li><a href="#productivity" class="hover:text-white transition-colors">Productivity</a></li>
						<li><a href="#pricing" class="hover:text-white transition-colors">Pricing</a></li>
						<li><a href="/app" class="hover:text-white transition-colors">Get Started</a></li>
					</ul>
				</div>
				
				<div>
					<h3 class="text-white font-semibold mb-4">Company</h3>
					<ul class="space-y-2 text-white/70 text-sm">
						<li><a href="/pitch" class="hover:text-white transition-colors">About</a></li>
						<li><a href="/contact" class="hover:text-white transition-colors">Contact</a></li>
						<li><a href="#" class="hover:text-white transition-colors">Blog</a></li>
						<li><a href="#" class="hover:text-white transition-colors">Careers</a></li>
					</ul>
				</div>
				
				<div>
					<h3 class="text-white font-semibold mb-4">Legal</h3>
					<ul class="space-y-2 text-white/70 text-sm">
						<li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
						<li><a href="#" class="hover:text-white transition-colors">Terms of Service</a></li>
						<li><a href="#" class="hover:text-white transition-colors">Cookie Policy</a></li>
					</ul>
				</div>
			</div>
			
			<div class="border-t border-white/20 mt-8 pt-8 text-center text-white/70 text-sm">
				<p>&copy; 2025 AhFai. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>

