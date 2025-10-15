<script lang="ts">
	import '../../app.css';
	import { page } from '$app/stores';
	
	let { children } = $props();
</script>

<div class="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
	<!-- Navigation -->
	<nav class="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<a href="/" class="flex items-center space-x-2">
					<div class="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
						<span class="text-2xl">🤖</span>
					</div>
					<span class="text-2xl font-bold text-white">AhFai</span>
				</a>
				
				<div class="hidden md:flex items-center space-x-8">
					<a href="/" class="text-white/90 hover:text-white transition-colors">Home</a>
					<a href="/app" class="text-white/90 hover:text-white transition-colors">Product</a>
					<a href="/pitch" class="text-white/90 hover:text-white transition-colors">Pitch Deck</a>
					<a href="/contact" class="text-white/90 hover:text-white transition-colors">Contact</a>
				</div>
				
				<div class="flex items-center space-x-4">
					<a href="/app" class="hidden md:inline-flex px-6 py-2 bg-white text-violet-600 rounded-lg font-semibold hover:bg-white/90 transition-all">
						Get Started
					</a>
					<button class="md:hidden text-white">
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<main class="pt-20">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="bg-black/20 backdrop-blur-lg border-t border-white/10 mt-20">
		<div class="container mx-auto px-4 py-12">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
				<div>
					<div class="flex items-center space-x-2 mb-4">
						<div class="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
							<span class="text-xl">🤖</span>
						</div>
						<span class="text-xl font-bold text-white">AhFai</span>
					</div>
					<p class="text-white/70 text-sm">
						Your privacy-first AI personal assistant. Your data stays with you, always.
					</p>
				</div>
				
				<div>
					<h3 class="text-white font-semibold mb-4">Product</h3>
					<ul class="space-y-2 text-white/70 text-sm">
						<li><a href="/app" class="hover:text-white transition-colors">Features</a></li>
						<li><a href="/pitch" class="hover:text-white transition-colors">Pricing</a></li>
						<li><a href="/app" class="hover:text-white transition-colors">Demo</a></li>
					</ul>
				</div>
				
				<div>
					<h3 class="text-white font-semibold mb-4">Company</h3>
					<ul class="space-y-2 text-white/70 text-sm">
						<li><a href="/pitch" class="hover:text-white transition-colors">About</a></li>
						<li><a href="/contact" class="hover:text-white transition-colors">Contact</a></li>
						<li><a href="/pitch" class="hover:text-white transition-colors">Investors</a></li>
					</ul>
				</div>
				
				<div>
					<h3 class="text-white font-semibold mb-4">Legal</h3>
					<ul class="space-y-2 text-white/70 text-sm">
						<li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
						<li><a href="#" class="hover:text-white transition-colors">Terms of Service</a></li>
						<li><a href="#" class="hover:text-white transition-colors">GDPR</a></li>
					</ul>
				</div>
			</div>
			
			<div class="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
				<p class="text-white/60 text-sm">
					© 2024 AhFai. All rights reserved. Built with ❤️ for privacy.
				</p>
				<div class="flex space-x-4 mt-4 md:mt-0">
					<a href="https://twitter.com/ahfai" class="text-white/60 hover:text-white transition-colors">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
					</a>
					<a href="https://linkedin.com/company/ahfai" class="text-white/60 hover:text-white transition-colors">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
					</a>
					<a href="https://github.com/TrillionUnicorn/AhFai" class="text-white/60 hover:text-white transition-colors">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
					</a>
				</div>
			</div>
		</div>
	</footer>
</div>

