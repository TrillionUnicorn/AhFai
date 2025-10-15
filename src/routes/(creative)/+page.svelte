<script lang="ts">
	import { onMount } from 'svelte';
	
	let waitlistForm = $state({ name: '', email: '', submitted: false, loading: false });
	let creativeStats = $state({ creators: 0, content: 0, timeSaved: 0 });
	
	onMount(() => {
		const interval = setInterval(() => {
			if (creativeStats.creators < 100) creativeStats.creators += 5;
			if (creativeStats.content < 1000) creativeStats.content += 50;
			if (creativeStats.timeSaved < 10) creativeStats.timeSaved += 0.5;
			
			if (creativeStats.creators >= 100 && creativeStats.content >= 1000 && creativeStats.timeSaved >= 10) {
				clearInterval(interval);
			}
		}, 50);
		return () => clearInterval(interval);
	});
	
	async function handleWaitlistSubmit(e: Event) {
		e.preventDefault();
		waitlistForm.loading = true;
		await new Promise(resolve => setTimeout(resolve, 1500));
		waitlistForm.submitted = true;
		waitlistForm.loading = false;
		setTimeout(() => {
			waitlistForm = { name: '', email: '', submitted: false, loading: false };
		}, 3000);
	}
</script>

<svelte:head>
	<title>AhFai Create - Unleash Your Creativity with AI</title>
	<meta name="description" content="Create content 10x faster with AI-powered tools for writers, designers, and content creators." />
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
	<div class="absolute inset-0 opacity-20">
		<div class="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
		<div class="absolute top-40 right-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-float" style="animation-delay: 2s;"></div>
		<div class="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-float" style="animation-delay: 4s;"></div>
	</div>
	
	<div class="container mx-auto px-4 relative z-10">
		<div class="max-w-4xl mx-auto text-center">
			<div class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-lg rounded-full text-white mb-6 animate-fade-in">
				<span class="text-2xl">✨</span>
				<span class="font-semibold">Join 100K+ Creators</span>
			</div>
			
			<h1 class="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
				Unleash Your<br />
				<span class="bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
					Creativity
				</span>
				<br />with AI
			</h1>
			
			<p class="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.2s;">
				Create content 10x faster with AI-powered tools for writers, designers, and content creators.
			</p>
			
			<div class="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style="animation-delay: 0.4s;">
				<a href="/app" class="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-white/90 transition-all shadow-2xl">
					Start Creating Free
				</a>
				<a href="#templates" class="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20">
					Browse Templates
				</a>
			</div>
			
			<div class="grid grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in" style="animation-delay: 0.6s;">
				<div class="text-center">
					<div class="text-3xl md:text-4xl font-bold text-white mb-2">{Math.round(creativeStats.creators)}K+</div>
					<div class="text-white/70 text-sm">Creators</div>
				</div>
				<div class="text-center">
					<div class="text-3xl md:text-4xl font-bold text-white mb-2">{Math.round(creativeStats.content)}K+</div>
					<div class="text-white/70 text-sm">Content Created</div>
				</div>
				<div class="text-center">
					<div class="text-3xl md:text-4xl font-bold text-white mb-2">{Math.round(creativeStats.timeSaved)}x</div>
					<div class="text-white/70 text-sm">Faster Creation</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Features Section -->
<section id="features" class="py-20">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Creative Superpowers</h2>
			<p class="text-xl text-white/80 max-w-2xl mx-auto">Everything you need to create amazing content</p>
		</div>
		
		<div class="grid md:grid-cols-3 gap-8">
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
				<div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-3xl mb-6">✍️</div>
				<h3 class="text-2xl font-bold text-white mb-4">Content Generation</h3>
				<p class="text-white/80 mb-4">Generate blog posts, social media content, and marketing copy in seconds.</p>
				<ul class="space-y-2 text-white/70">
					<li class="flex items-start gap-2"><span class="text-purple-400">✓</span><span>Blog post writer</span></li>
					<li class="flex items-start gap-2"><span class="text-purple-400">✓</span><span>Social media captions</span></li>
					<li class="flex items-start gap-2"><span class="text-purple-400">✓</span><span>Email campaigns</span></li>
				</ul>
			</div>
			
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
				<div class="w-16 h-16 bg-gradient-to-br from-pink-400 to-red-500 rounded-xl flex items-center justify-center text-3xl mb-6">💡</div>
				<h3 class="text-2xl font-bold text-white mb-4">Idea Brainstorming</h3>
				<p class="text-white/80 mb-4">Never run out of ideas. AI-powered brainstorming for your next project.</p>
				<ul class="space-y-2 text-white/70">
					<li class="flex items-start gap-2"><span class="text-purple-400">✓</span><span>Topic generator</span></li>
					<li class="flex items-start gap-2"><span class="text-purple-400">✓</span><span>Headline creator</span></li>
					<li class="flex items-start gap-2"><span class="text-purple-400">✓</span><span>Content outlines</span></li>
				</ul>
			</div>
			
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
				<div class="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-3xl mb-6">📅</div>
				<h3 class="text-2xl font-bold text-white mb-4">Content Calendar</h3>
				<p class="text-white/80 mb-4">Plan, schedule, and organize your content strategy with AI assistance.</p>
				<ul class="space-y-2 text-white/70">
					<li class="flex items-start gap-2"><span class="text-purple-400">✓</span><span>Auto-scheduling</span></li>
					<li class="flex items-start gap-2"><span class="text-purple-400">✓</span><span>Content planning</span></li>
					<li class="flex items-start gap-2"><span class="text-purple-400">✓</span><span>Analytics tracking</span></li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Templates Section -->
<section id="templates" class="py-20">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Ready-to-Use Templates</h2>
			<p class="text-xl text-white/80 max-w-2xl mx-auto">Start creating instantly with our template library</p>
		</div>
		
		<div class="grid md:grid-cols-4 gap-6">
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
				<div class="text-4xl mb-4">📝</div>
				<h3 class="text-lg font-bold text-white mb-2">Blog Posts</h3>
				<p class="text-white/70 text-sm">50+ templates</p>
			</div>
			
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
				<div class="text-4xl mb-4">📱</div>
				<h3 class="text-lg font-bold text-white mb-2">Social Media</h3>
				<p class="text-white/70 text-sm">100+ templates</p>
			</div>
			
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
				<div class="text-4xl mb-4">📧</div>
				<h3 class="text-lg font-bold text-white mb-2">Email Marketing</h3>
				<p class="text-white/70 text-sm">30+ templates</p>
			</div>
			
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
				<div class="text-4xl mb-4">🎨</div>
				<h3 class="text-lg font-bold text-white mb-2">Ad Copy</h3>
				<p class="text-white/70 text-sm">40+ templates</p>
			</div>
		</div>
	</div>
</section>

<!-- Pricing Section -->
<section id="pricing" class="py-20">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Creator Pricing</h2>
			<p class="text-xl text-white/80 max-w-2xl mx-auto">Plans that grow with your creativity</p>
		</div>
		
		<div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
				<h3 class="text-2xl font-bold text-white mb-2">Free</h3>
				<div class="text-4xl font-bold text-white mb-6">$0<span class="text-lg text-white/70">/month</span></div>
				<ul class="space-y-3 mb-8">
					<li class="flex items-start gap-2 text-white/80"><span class="text-purple-400">✓</span><span>10 creations/month</span></li>
					<li class="flex items-start gap-2 text-white/80"><span class="text-purple-400">✓</span><span>Basic templates</span></li>
					<li class="flex items-start gap-2 text-white/80"><span class="text-purple-400">✓</span><span>Community support</span></li>
				</ul>
				<a href="/app" class="block w-full px-6 py-3 bg-white/10 text-white rounded-lg font-semibold text-center hover:bg-white/20 transition-all border border-white/20">
					Get Started
				</a>
			</div>
			
			<div class="bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-2xl p-8 border-2 border-yellow-400 relative">
				<div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
					<span class="bg-yellow-400 text-purple-900 px-4 py-1 rounded-full text-sm font-bold">BEST VALUE</span>
				</div>
				<h3 class="text-2xl font-bold text-white mb-2">Creator</h3>
				<div class="text-4xl font-bold text-white mb-6">$19.99<span class="text-lg text-white/90">/month</span></div>
				<ul class="space-y-3 mb-8">
					<li class="flex items-start gap-2 text-white"><span class="text-yellow-300">✓</span><span>Unlimited creations</span></li>
					<li class="flex items-start gap-2 text-white"><span class="text-yellow-300">✓</span><span>All templates</span></li>
					<li class="flex items-start gap-2 text-white"><span class="text-yellow-300">✓</span><span>Priority support</span></li>
					<li class="flex items-start gap-2 text-white"><span class="text-yellow-300">✓</span><span>Content calendar</span></li>
					<li class="flex items-start gap-2 text-white"><span class="text-yellow-300">✓</span><span>Analytics</span></li>
				</ul>
				<a href="/app" class="block w-full px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold text-center hover:bg-white/90 transition-all shadow-xl">
					Start Free Trial
				</a>
			</div>
			
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
				<h3 class="text-2xl font-bold text-white mb-2">Creator Pro</h3>
				<div class="text-4xl font-bold text-white mb-6">$39.99<span class="text-lg text-white/70">/month</span></div>
				<ul class="space-y-3 mb-8">
					<li class="flex items-start gap-2 text-white/80"><span class="text-purple-400">✓</span><span>Everything in Creator</span></li>
					<li class="flex items-start gap-2 text-white/80"><span class="text-purple-400">✓</span><span>Team collaboration</span></li>
					<li class="flex items-start gap-2 text-white/80"><span class="text-purple-400">✓</span><span>Brand voice training</span></li>
					<li class="flex items-start gap-2 text-white/80"><span class="text-purple-400">✓</span><span>API access</span></li>
					<li class="flex items-start gap-2 text-white/80"><span class="text-purple-400">✓</span><span>White-label</span></li>
				</ul>
				<a href="/contact" class="block w-full px-6 py-3 bg-white/10 text-white rounded-lg font-semibold text-center hover:bg-white/20 transition-all border border-white/20">
					Contact Sales
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Waitlist Section -->
<section class="py-20">
	<div class="container mx-auto px-4">
		<div class="max-w-2xl mx-auto bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-3xl p-12 text-center">
			<h2 class="text-4xl font-bold text-white mb-4">Ready to Create Magic?</h2>
			<p class="text-xl text-white/90 mb-8">Join 100K+ creators making amazing content with AhFai Create</p>
			
			{#if waitlistForm.submitted}
				<div class="bg-white/20 backdrop-blur-lg rounded-xl p-6 animate-scale-in">
					<div class="text-5xl mb-4">🎉</div>
					<h3 class="text-2xl font-bold text-white mb-2">Welcome to the community!</h3>
					<p class="text-white/90">Check your email to get started.</p>
				</div>
			{:else}
				<form onsubmit={handleWaitlistSubmit} class="flex flex-col sm:flex-row gap-4">
					<input type="text" bind:value={waitlistForm.name} placeholder="Your name" required
						class="flex-1 px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50" />
					<input type="email" bind:value={waitlistForm.email} placeholder="Your email" required
						class="flex-1 px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50" />
					<button type="submit" disabled={waitlistForm.loading}
						class="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-white/90 transition-all disabled:opacity-50">
						{waitlistForm.loading ? 'Joining...' : 'Start Creating'}
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>

