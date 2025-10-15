<script lang="ts">
	import '../../app.css';
	
	let mobileMenuOpen = $state(false);
</script>

<svelte:head>
	<style>
		body {
			background: linear-gradient(135deg, #10b981 0%, #059669 50%, #14b8a6 100%);
		}
	</style>
</svelte:head>

<div class="min-h-screen">
	<!-- Navigation -->
	<nav class="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
		<div class="container mx-auto px-4">
			<div class="flex items-center justify-between h-16">
				<a href="/" class="flex items-center gap-2">
					<div class="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
						<span class="text-2xl">📚</span>
					</div>
					<span class="text-xl font-bold text-white">AhFai Edu</span>
				</a>
				
				<div class="hidden md:flex items-center gap-6">
					<a href="#features" class="text-white/90 hover:text-white transition-colors">Features</a>
					<a href="#study" class="text-white/90 hover:text-white transition-colors">Study Tools</a>
					<a href="#pricing" class="text-white/90 hover:text-white transition-colors">Pricing</a>
					<a href="/contact" class="text-white/90 hover:text-white transition-colors">Contact</a>
					<a href="/app" class="px-6 py-2 bg-white text-green-600 rounded-lg font-semibold hover:bg-white/90 transition-all">
						Start Learning
					</a>
				</div>
				
				<button
					onclick={() => mobileMenuOpen = !mobileMenuOpen}
					class="md:hidden text-white p-2"
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
			
			{#if mobileMenuOpen}
				<div class="md:hidden py-4 border-t border-white/20">
					<div class="flex flex-col gap-4">
						<a href="#features" class="text-white/90">Features</a>
						<a href="#study" class="text-white/90">Study Tools</a>
						<a href="#pricing" class="text-white/90">Pricing</a>
						<a href="/contact" class="text-white/90">Contact</a>
						<a href="/app" class="px-6 py-2 bg-white text-green-600 rounded-lg font-semibold text-center">
							Start Learning
						</a>
					</div>
				</div>
			{/if}
		</div>
	</nav>
	
	<main class="pt-16">
		<slot />
	</main>
	
	<footer class="bg-white/10 backdrop-blur-lg border-t border-white/20 mt-20">
		<div class="container mx-auto px-4 py-12">
			<div class="grid md:grid-cols-4 gap-8">
				<div>
					<div class="flex items-center gap-2 mb-4">
						<div class="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
							<span class="text-2xl">📚</span>
						</div>
						<span class="text-xl font-bold text-white">AhFai Edu</span>
					</div>
					<p class="text-white/70 text-sm">
						Your AI study buddy for academic success.
					</p>
				</div>
				
				<div>
					<h3 class="text-white font-semibold mb-4">Product</h3>
					<ul class="space-y-2 text-white/70 text-sm">
						<li><a href="#features" class="hover:text-white">Features</a></li>
						<li><a href="#study" class="hover:text-white">Study Tools</a></li>
						<li><a href="#pricing" class="hover:text-white">Pricing</a></li>
						<li><a href="/app" class="hover:text-white">Start Learning</a></li>
					</ul>
				</div>
				
				<div>
					<h3 class="text-white font-semibold mb-4">Resources</h3>
					<ul class="space-y-2 text-white/70 text-sm">
						<li><a href="#" class="hover:text-white">Study Guides</a></li>
						<li><a href="#" class="hover:text-white">Blog</a></li>
						<li><a href="#" class="hover:text-white">Community</a></li>
						<li><a href="/contact" class="hover:text-white">Support</a></li>
					</ul>
				</div>
				
				<div>
					<h3 class="text-white font-semibold mb-4">Legal</h3>
					<ul class="space-y-2 text-white/70 text-sm">
						<li><a href="#" class="hover:text-white">Privacy</a></li>
						<li><a href="#" class="hover:text-white">Terms</a></li>
						<li><a href="#" class="hover:text-white">Student Discount</a></li>
					</ul>
				</div>
			</div>
			
			<div class="border-t border-white/20 mt-8 pt-8 text-center text-white/70 text-sm">
				<p>&copy; 2025 AhFai Edu. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>

