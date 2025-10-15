<script lang="ts">
	import { onMount } from 'svelte';
	
	let demoForm = $state({ name: '', email: '', company: '', submitted: false, loading: false });
	let enterpriseStats = $state({ companies: 0, users: 0, uptime: 0 });
	
	onMount(() => {
		const interval = setInterval(() => {
			if (enterpriseStats.companies < 500) enterpriseStats.companies += 25;
			if (enterpriseStats.users < 50000) enterpriseStats.users += 2500;
			if (enterpriseStats.uptime < 99.9) enterpriseStats.uptime += 0.05;
			
			if (enterpriseStats.companies >= 500 && enterpriseStats.users >= 50000 && enterpriseStats.uptime >= 99.9) {
				clearInterval(interval);
			}
		}, 50);
		return () => clearInterval(interval);
	});
	
	async function handleDemoSubmit(e: Event) {
		e.preventDefault();
		demoForm.loading = true;
		await new Promise(resolve => setTimeout(resolve, 1500));
		demoForm.submitted = true;
		demoForm.loading = false;
		setTimeout(() => {
			demoForm = { name: '', email: '', company: '', submitted: false, loading: false };
		}, 3000);
	}
</script>

<svelte:head>
	<title>AhFai Enterprise - Enterprise-Grade AI for Your Team</title>
	<meta name="description" content="Secure, compliant, and scalable AI assistant for modern enterprises. SOC 2, HIPAA, and GDPR ready." />
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
	<div class="absolute inset-0 opacity-10">
		<div class="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
		<div class="absolute top-40 right-10 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-float" style="animation-delay: 2s;"></div>
		<div class="absolute bottom-20 left-1/2 w-96 h-96 bg-slate-400 rounded-full mix-blend-multiply filter blur-3xl animate-float" style="animation-delay: 4s;"></div>
	</div>
	
	<div class="container mx-auto px-4 relative z-10">
		<div class="max-w-4xl mx-auto text-center">
			<div class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-lg rounded-full text-white mb-6 animate-fade-in">
				<span class="text-2xl">🏢</span>
				<span class="font-semibold">Trusted by 500+ Enterprises</span>
			</div>
			
			<h1 class="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
				Enterprise-Grade<br />
				<span class="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
					AI for Your Team
				</span>
			</h1>
			
			<p class="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.2s;">
				Secure, compliant, and scalable AI assistant for modern enterprises. Deploy on-premise or in the cloud.
			</p>
			
			<div class="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style="animation-delay: 0.4s;">
				<a href="#demo" class="px-8 py-4 bg-white text-blue-900 rounded-xl font-bold text-lg hover:bg-white/90 transition-all shadow-2xl">
					Request Demo
				</a>
				<a href="#security" class="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20">
					View Security
				</a>
			</div>
			
			<div class="grid grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in" style="animation-delay: 0.6s;">
				<div class="text-center">
					<div class="text-3xl md:text-4xl font-bold text-white mb-2">{Math.round(enterpriseStats.companies)}+</div>
					<div class="text-white/70 text-sm">Companies</div>
				</div>
				<div class="text-center">
					<div class="text-3xl md:text-4xl font-bold text-white mb-2">{Math.round(enterpriseStats.users/1000)}K+</div>
					<div class="text-white/70 text-sm">Active Users</div>
				</div>
				<div class="text-center">
					<div class="text-3xl md:text-4xl font-bold text-white mb-2">{enterpriseStats.uptime.toFixed(1)}%</div>
					<div class="text-white/70 text-sm">Uptime SLA</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Features Section -->
<section id="features" class="py-20">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Enterprise Features</h2>
			<p class="text-xl text-white/80 max-w-2xl mx-auto">Everything your team needs to succeed</p>
		</div>
		
		<div class="grid md:grid-cols-3 gap-8">
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
				<div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center text-3xl mb-6">👥</div>
				<h3 class="text-2xl font-bold text-white mb-4">Team Collaboration</h3>
				<p class="text-white/80 mb-4">Real-time collaboration with your team. Share knowledge, insights, and workflows seamlessly.</p>
				<ul class="space-y-2 text-white/70">
					<li class="flex items-start gap-2"><span class="text-blue-400">✓</span><span>Shared workspaces</span></li>
					<li class="flex items-start gap-2"><span class="text-blue-400">✓</span><span>Role-based access</span></li>
					<li class="flex items-start gap-2"><span class="text-blue-400">✓</span><span>Activity tracking</span></li>
				</ul>
			</div>
			
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
				<div class="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center text-3xl mb-6">🛡️</div>
				<h3 class="text-2xl font-bold text-white mb-4">Admin Dashboard</h3>
				<p class="text-white/80 mb-4">Centralized control panel for managing users, permissions, and compliance.</p>
				<ul class="space-y-2 text-white/70">
					<li class="flex items-start gap-2"><span class="text-blue-400">✓</span><span>User management</span></li>
					<li class="flex items-start gap-2"><span class="text-blue-400">✓</span><span>Usage analytics</span></li>
					<li class="flex items-start gap-2"><span class="text-blue-400">✓</span><span>Audit logs</span></li>
				</ul>
			</div>
			
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
				<div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-3xl mb-6">🔒</div>
				<h3 class="text-2xl font-bold text-white mb-4">Enterprise Security</h3>
				<p class="text-white/80 mb-4">Bank-level security with SOC 2, HIPAA, and GDPR compliance built-in.</p>
				<ul class="space-y-2 text-white/70">
					<li class="flex items-start gap-2"><span class="text-blue-400">✓</span><span>SSO/SAML</span></li>
					<li class="flex items-start gap-2"><span class="text-blue-400">✓</span><span>Data encryption</span></li>
					<li class="flex items-start gap-2"><span class="text-blue-400">✓</span><span>Compliance ready</span></li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Security & Compliance Section -->
<section id="security" class="py-20">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20">
			<div class="text-center mb-12">
				<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Security & Compliance</h2>
				<p class="text-xl text-white/80">Enterprise-grade security you can trust</p>
			</div>
			
			<div class="grid md:grid-cols-3 gap-6 mb-8">
				<div class="bg-white/10 rounded-2xl p-6 text-center">
					<div class="text-4xl mb-4">🔐</div>
					<h3 class="text-xl font-bold text-white mb-2">SOC 2 Type II</h3>
					<p class="text-white/70 text-sm">Certified secure infrastructure</p>
				</div>
				
				<div class="bg-white/10 rounded-2xl p-6 text-center">
					<div class="text-4xl mb-4">🏥</div>
					<h3 class="text-xl font-bold text-white mb-2">HIPAA Compliant</h3>
					<p class="text-white/70 text-sm">Healthcare data protection</p>
				</div>
				
				<div class="bg-white/10 rounded-2xl p-6 text-center">
					<div class="text-4xl mb-4">🇪🇺</div>
					<h3 class="text-xl font-bold text-white mb-2">GDPR Ready</h3>
					<p class="text-white/70 text-sm">EU data privacy compliant</p>
				</div>
			</div>
			
			<div class="grid md:grid-cols-2 gap-6">
				<div class="bg-white/10 rounded-2xl p-6">
					<h3 class="text-xl font-bold text-white mb-4">🔑 Authentication</h3>
					<ul class="space-y-2 text-white/70 text-sm">
						<li class="flex items-start gap-2"><span class="text-blue-400">✓</span><span>SSO (SAML, OAuth)</span></li>
						<li class="flex items-start gap-2"><span class="text-blue-400">✓</span><span>Multi-factor authentication</span></li>
						<li class="flex items-start gap-2"><span class="text-blue-400">✓</span><span>LDAP/Active Directory</span></li>
					</ul>
				</div>
				
				<div class="bg-white/10 rounded-2xl p-6">
					<h3 class="text-xl font-bold text-white mb-4">📊 Monitoring</h3>
					<ul class="space-y-2 text-white/70 text-sm">
						<li class="flex items-start gap-2"><span class="text-blue-400">✓</span><span>Real-time audit logs</span></li>
						<li class="flex items-start gap-2"><span class="text-blue-400">✓</span><span>Anomaly detection</span></li>
						<li class="flex items-start gap-2"><span class="text-blue-400">✓</span><span>Compliance reporting</span></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Pricing Section -->
<section id="pricing" class="py-20">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Enterprise Pricing</h2>
			<p class="text-xl text-white/80 max-w-2xl mx-auto">Flexible plans that scale with your team</p>
		</div>
		
		<div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
				<h3 class="text-2xl font-bold text-white mb-2">Starter</h3>
				<div class="text-4xl font-bold text-white mb-6">$0<span class="text-lg text-white/70">/month</span></div>
				<ul class="space-y-3 mb-8">
					<li class="flex items-start gap-2 text-white/80"><span class="text-blue-400">✓</span><span>Up to 10 users</span></li>
					<li class="flex items-start gap-2 text-white/80"><span class="text-blue-400">✓</span><span>Basic features</span></li>
					<li class="flex items-start gap-2 text-white/80"><span class="text-blue-400">✓</span><span>Community support</span></li>
				</ul>
				<a href="/app" class="block w-full px-6 py-3 bg-white/10 text-white rounded-lg font-semibold text-center hover:bg-white/20 transition-all border border-white/20">
					Get Started
				</a>
			</div>
			
			<div class="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-8 border-2 border-cyan-400 relative">
				<div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
					<span class="bg-cyan-400 text-blue-900 px-4 py-1 rounded-full text-sm font-bold">MOST POPULAR</span>
				</div>
				<h3 class="text-2xl font-bold text-white mb-2">Team</h3>
				<div class="text-4xl font-bold text-white mb-6">$49.99<span class="text-lg text-white/90">/user/mo</span></div>
				<ul class="space-y-3 mb-8">
					<li class="flex items-start gap-2 text-white"><span class="text-cyan-300">✓</span><span>Unlimited users</span></li>
					<li class="flex items-start gap-2 text-white"><span class="text-cyan-300">✓</span><span>Advanced features</span></li>
					<li class="flex items-start gap-2 text-white"><span class="text-cyan-300">✓</span><span>Priority support</span></li>
					<li class="flex items-start gap-2 text-white"><span class="text-cyan-300">✓</span><span>SSO/SAML</span></li>
					<li class="flex items-start gap-2 text-white"><span class="text-cyan-300">✓</span><span>Admin dashboard</span></li>
				</ul>
				<a href="#demo" class="block w-full px-6 py-3 bg-white text-blue-900 rounded-lg font-semibold text-center hover:bg-white/90 transition-all shadow-xl">
					Request Demo
				</a>
			</div>
			
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
				<h3 class="text-2xl font-bold text-white mb-2">Enterprise</h3>
				<div class="text-4xl font-bold text-white mb-6">Custom</div>
				<ul class="space-y-3 mb-8">
					<li class="flex items-start gap-2 text-white/80"><span class="text-blue-400">✓</span><span>Everything in Team</span></li>
					<li class="flex items-start gap-2 text-white/80"><span class="text-blue-400">✓</span><span>On-premise deployment</span></li>
					<li class="flex items-start gap-2 text-white/80"><span class="text-blue-400">✓</span><span>Dedicated support</span></li>
					<li class="flex items-start gap-2 text-white/80"><span class="text-blue-400">✓</span><span>Custom integrations</span></li>
					<li class="flex items-start gap-2 text-white/80"><span class="text-blue-400">✓</span><span>SLA guarantee</span></li>
				</ul>
				<a href="/contact" class="block w-full px-6 py-3 bg-white/10 text-white rounded-lg font-semibold text-center hover:bg-white/20 transition-all border border-white/20">
					Contact Sales
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Demo Request Section -->
<section id="demo" class="py-20">
	<div class="container mx-auto px-4">
		<div class="max-w-2xl mx-auto bg-gradient-to-br from-blue-900 to-indigo-900 rounded-3xl p-12 text-center">
			<h2 class="text-4xl font-bold text-white mb-4">Ready to Transform Your Team?</h2>
			<p class="text-xl text-white/90 mb-8">Request a personalized demo and see AhFai Enterprise in action</p>
			
			{#if demoForm.submitted}
				<div class="bg-white/20 backdrop-blur-lg rounded-xl p-6 animate-scale-in">
					<div class="text-5xl mb-4">🎉</div>
					<h3 class="text-2xl font-bold text-white mb-2">Demo Requested!</h3>
					<p class="text-white/90">Our team will contact you within 24 hours.</p>
				</div>
			{:else}
				<form onsubmit={handleDemoSubmit} class="space-y-4">
					<div class="grid md:grid-cols-2 gap-4">
						<input type="text" bind:value={demoForm.name} placeholder="Your name" required
							class="px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50" />
						<input type="email" bind:value={demoForm.email} placeholder="Work email" required
							class="px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50" />
					</div>
					<input type="text" bind:value={demoForm.company} placeholder="Company name" required
						class="w-full px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50" />
					<button type="submit" disabled={demoForm.loading}
						class="w-full px-8 py-4 bg-white text-blue-900 rounded-xl font-bold hover:bg-white/90 transition-all disabled:opacity-50">
						{demoForm.loading ? 'Requesting...' : 'Request Demo'}
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>

