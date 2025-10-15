<script lang="ts">
	import { onMount } from 'svelte';
	
	let waitlistForm = $state({
		name: '',
		email: '',
		submitted: false,
		loading: false
	});
	
	let stats = $state({
		timeSaved: 0,
		tasksCompleted: 0,
		productivityBoost: 0
	});
	
	// Animate stats on mount
	onMount(() => {
		const interval = setInterval(() => {
			if (stats.timeSaved < 10) stats.timeSaved += 0.5;
			if (stats.tasksCompleted < 500) stats.tasksCompleted += 25;
			if (stats.productivityBoost < 300) stats.productivityBoost += 15;
			
			if (stats.timeSaved >= 10 && stats.tasksCompleted >= 500 && stats.productivityBoost >= 300) {
				clearInterval(interval);
			}
		}, 50);
		
		return () => clearInterval(interval);
	});
	
	async function handleWaitlistSubmit(e: Event) {
		e.preventDefault();
		waitlistForm.loading = true;
		
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1500));
		
		waitlistForm.submitted = true;
		waitlistForm.loading = false;
		
		// Reset form after 3 seconds
		setTimeout(() => {
			waitlistForm = {
				name: '',
				email: '',
				submitted: false,
				loading: false
			};
		}, 3000);
	}
</script>

<svelte:head>
	<title>AhFai Pro - Supercharge Your Productivity with AI</title>
	<meta name="description" content="Save 10+ hours per week with AI-powered productivity tools. Automate tasks, boost efficiency, and achieve more." />
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
	<!-- Animated Background -->
	<div class="absolute inset-0 opacity-20">
		<div class="absolute top-20 left-10 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
		<div class="absolute top-40 right-10 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-xl animate-float" style="animation-delay: 2s;"></div>
		<div class="absolute bottom-20 left-1/2 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-float" style="animation-delay: 4s;"></div>
	</div>
	
	<div class="container mx-auto px-4 relative z-10">
		<div class="max-w-4xl mx-auto text-center">
			<!-- Badge -->
			<div class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-lg rounded-full text-white mb-6 animate-fade-in">
				<span class="text-2xl">⚡</span>
				<span class="font-semibold">Save 10+ Hours Per Week</span>
			</div>
			
			<!-- Headline -->
			<h1 class="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
				Supercharge Your<br />
				<span class="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
					Productivity
				</span>
				<br />with AI
			</h1>
			
			<!-- Subheadline -->
			<p class="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.2s;">
				Automate repetitive tasks, boost your efficiency by 3x, and focus on what truly matters.
			</p>
			
			<!-- CTA Buttons -->
			<div class="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style="animation-delay: 0.4s;">
				<a href="/app" class="px-8 py-4 bg-white text-orange-600 rounded-xl font-bold text-lg hover:bg-white/90 transition-all shadow-2xl">
					Start Free Trial
				</a>
				<a href="#productivity" class="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20">
					See How It Works
				</a>
			</div>
			
			<!-- Trust Indicators -->
			<div class="grid grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in" style="animation-delay: 0.6s;">
				<div class="text-center">
					<div class="text-3xl md:text-4xl font-bold text-white mb-2">{Math.round(stats.timeSaved)}h</div>
					<div class="text-white/70 text-sm">Saved Per Week</div>
				</div>
				<div class="text-center">
					<div class="text-3xl md:text-4xl font-bold text-white mb-2">{Math.round(stats.tasksCompleted)}+</div>
					<div class="text-white/70 text-sm">Tasks Automated</div>
				</div>
				<div class="text-center">
					<div class="text-3xl md:text-4xl font-bold text-white mb-2">{Math.round(stats.productivityBoost)}%</div>
					<div class="text-white/70 text-sm">Productivity Boost</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Features Section -->
<section id="features" class="py-20">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
				Productivity Superpowers
			</h2>
			<p class="text-xl text-white/80 max-w-2xl mx-auto">
				Everything you need to work smarter, not harder
			</p>
		</div>
		
		<div class="grid md:grid-cols-3 gap-8">
			<!-- Feature 1 -->
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
				<div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-3xl mb-6">
					🚀
				</div>
				<h3 class="text-2xl font-bold text-white mb-4">Task Automation</h3>
				<p class="text-white/80 mb-4">
					Automate repetitive tasks and workflows. Set it once, save hours every week.
				</p>
				<ul class="space-y-2 text-white/70">
					<li class="flex items-start gap-2">
						<span class="text-green-400">✓</span>
						<span>Smart task scheduling</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-green-400">✓</span>
						<span>Workflow templates</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-green-400">✓</span>
						<span>One-click automation</span>
					</li>
				</ul>
			</div>
			
			<!-- Feature 2 -->
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
				<div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-3xl mb-6">
					📊
				</div>
				<h3 class="text-2xl font-bold text-white mb-4">Productivity Analytics</h3>
				<p class="text-white/80 mb-4">
					Track your productivity in real-time. See exactly where your time goes.
				</p>
				<ul class="space-y-2 text-white/70">
					<li class="flex items-start gap-2">
						<span class="text-green-400">✓</span>
						<span>Time tracking dashboard</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-green-400">✓</span>
						<span>Productivity insights</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-green-400">✓</span>
						<span>Weekly reports</span>
					</li>
				</ul>
			</div>
			
			<!-- Feature 3 -->
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
				<div class="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center text-3xl mb-6">
					🎯
				</div>
				<h3 class="text-2xl font-bold text-white mb-4">Focus Mode</h3>
				<p class="text-white/80 mb-4">
					Eliminate distractions and enter deep work mode. Get more done in less time.
				</p>
				<ul class="space-y-2 text-white/70">
					<li class="flex items-start gap-2">
						<span class="text-green-400">✓</span>
						<span>Distraction blocking</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-green-400">✓</span>
						<span>Pomodoro timer</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-green-400">✓</span>
						<span>Focus sessions</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Productivity Calculator Section -->
<section id="productivity" class="py-20">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20">
			<div class="text-center mb-12">
				<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
					Calculate Your Time Savings
				</h2>
				<p class="text-xl text-white/80">
					See how much time you could save with AhFai Pro
				</p>
			</div>
			
			<div class="grid md:grid-cols-2 gap-8">
				<div class="bg-white/10 rounded-2xl p-6">
					<h3 class="text-2xl font-bold text-white mb-6">Your Current Workflow</h3>
					<div class="space-y-4">
						<div>
							<label class="text-white/80 text-sm mb-2 block">Daily Tasks</label>
							<input type="number" value="20" class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white" />
						</div>
						<div>
							<label class="text-white/80 text-sm mb-2 block">Minutes Per Task</label>
							<input type="number" value="15" class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white" />
						</div>
						<div>
							<label class="text-white/80 text-sm mb-2 block">Working Days Per Week</label>
							<input type="number" value="5" class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white" />
						</div>
					</div>
				</div>
				
				<div class="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
					<h3 class="text-2xl font-bold mb-6">Your Savings with AhFai Pro</h3>
					<div class="space-y-6">
						<div>
							<div class="text-sm opacity-80 mb-2">Time Saved Per Week</div>
							<div class="text-5xl font-bold">10.5h</div>
						</div>
						<div>
							<div class="text-sm opacity-80 mb-2">Time Saved Per Month</div>
							<div class="text-4xl font-bold">42h</div>
						</div>
						<div>
							<div class="text-sm opacity-80 mb-2">Time Saved Per Year</div>
							<div class="text-4xl font-bold">504h</div>
						</div>
						<div class="pt-4 border-t border-white/20">
							<div class="text-sm opacity-80 mb-2">That's equivalent to</div>
							<div class="text-3xl font-bold">21 full days</div>
							<div class="text-sm opacity-80 mt-1">of productive time back!</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Pricing Section -->
<section id="pricing" class="py-20">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
				Simple, Transparent Pricing
			</h2>
			<p class="text-xl text-white/80 max-w-2xl mx-auto">
				Choose the plan that fits your productivity goals
			</p>
		</div>
		
		<div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
			<!-- Free Tier -->
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
				<h3 class="text-2xl font-bold text-white mb-2">Starter</h3>
				<div class="text-4xl font-bold text-white mb-6">
					$0<span class="text-lg text-white/70">/month</span>
				</div>
				<ul class="space-y-3 mb-8">
					<li class="flex items-start gap-2 text-white/80">
						<span class="text-green-400">✓</span>
						<span>Up to 50 tasks/month</span>
					</li>
					<li class="flex items-start gap-2 text-white/80">
						<span class="text-green-400">✓</span>
						<span>Basic automation</span>
					</li>
					<li class="flex items-start gap-2 text-white/80">
						<span class="text-green-400">✓</span>
						<span>Community support</span>
					</li>
				</ul>
				<a href="/app" class="block w-full px-6 py-3 bg-white/10 text-white rounded-lg font-semibold text-center hover:bg-white/20 transition-all border border-white/20">
					Get Started
				</a>
			</div>
			
			<!-- Pro Tier -->
			<div class="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 border-2 border-yellow-400 relative">
				<div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
					<span class="bg-yellow-400 text-orange-900 px-4 py-1 rounded-full text-sm font-bold">MOST POPULAR</span>
				</div>
				<h3 class="text-2xl font-bold text-white mb-2">Pro</h3>
				<div class="text-4xl font-bold text-white mb-6">
					$12.99<span class="text-lg text-white/90">/month</span>
				</div>
				<ul class="space-y-3 mb-8">
					<li class="flex items-start gap-2 text-white">
						<span class="text-yellow-300">✓</span>
						<span>Unlimited tasks</span>
					</li>
					<li class="flex items-start gap-2 text-white">
						<span class="text-yellow-300">✓</span>
						<span>Advanced automation</span>
					</li>
					<li class="flex items-start gap-2 text-white">
						<span class="text-yellow-300">✓</span>
						<span>Productivity analytics</span>
					</li>
					<li class="flex items-start gap-2 text-white">
						<span class="text-yellow-300">✓</span>
						<span>Priority support</span>
					</li>
					<li class="flex items-start gap-2 text-white">
						<span class="text-yellow-300">✓</span>
						<span>Custom workflows</span>
					</li>
				</ul>
				<a href="/app" class="block w-full px-6 py-3 bg-white text-orange-600 rounded-lg font-semibold text-center hover:bg-white/90 transition-all shadow-xl">
					Start Free Trial
				</a>
			</div>
			
			<!-- Enterprise Tier -->
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
				<h3 class="text-2xl font-bold text-white mb-2">Enterprise</h3>
				<div class="text-4xl font-bold text-white mb-6">
					$149.99<span class="text-lg text-white/70">/month</span>
				</div>
				<ul class="space-y-3 mb-8">
					<li class="flex items-start gap-2 text-white/80">
						<span class="text-green-400">✓</span>
						<span>Everything in Pro</span>
					</li>
					<li class="flex items-start gap-2 text-white/80">
						<span class="text-green-400">✓</span>
						<span>Team collaboration</span>
					</li>
					<li class="flex items-start gap-2 text-white/80">
						<span class="text-green-400">✓</span>
						<span>Admin dashboard</span>
					</li>
					<li class="flex items-start gap-2 text-white/80">
						<span class="text-green-400">✓</span>
						<span>Dedicated support</span>
					</li>
					<li class="flex items-start gap-2 text-white/80">
						<span class="text-green-400">✓</span>
						<span>Custom integrations</span>
					</li>
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
		<div class="max-w-2xl mx-auto bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-12 text-center">
			<h2 class="text-4xl font-bold text-white mb-4">
				Ready to 3x Your Productivity?
			</h2>
			<p class="text-xl text-white/90 mb-8">
				Join thousands of professionals who are working smarter with AhFai Pro
			</p>
			
			{#if waitlistForm.submitted}
				<div class="bg-white/20 backdrop-blur-lg rounded-xl p-6 animate-scale-in">
					<div class="text-5xl mb-4">🎉</div>
					<h3 class="text-2xl font-bold text-white mb-2">You're on the list!</h3>
					<p class="text-white/90">We'll notify you when we launch.</p>
				</div>
			{:else}
				<form onsubmit={handleWaitlistSubmit} class="flex flex-col sm:flex-row gap-4">
					<input
						type="text"
						bind:value={waitlistForm.name}
						placeholder="Your name"
						required
						class="flex-1 px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
					/>
					<input
						type="email"
						bind:value={waitlistForm.email}
						placeholder="Your email"
						required
						class="flex-1 px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
					/>
					<button
						type="submit"
						disabled={waitlistForm.loading}
						class="px-8 py-4 bg-white text-orange-600 rounded-xl font-bold hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{waitlistForm.loading ? 'Joining...' : 'Join Waitlist'}
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>

