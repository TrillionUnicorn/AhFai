<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	
	let email = $state('');
	let name = $state('');
	let company = $state('');
	let useCase = $state('');
	let submitted = $state(false);
	let loading = $state(false);
	
	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		
		// Hero animation
		gsap.from('.hero-content', {
			opacity: 0,
			y: 50,
			duration: 1,
			ease: 'power3.out'
		});
		
		// Parallax effect for hero background
		gsap.to('.hero-bg', {
			yPercent: 30,
			ease: 'none',
			scrollTrigger: {
				trigger: '.hero-section',
				start: 'top top',
				end: 'bottom top',
				scrub: true
			}
		});
		
		// Animate sections on scroll
		gsap.utils.toArray('.animate-on-scroll').forEach((element: any) => {
			gsap.from(element, {
				opacity: 0,
				y: 50,
				duration: 0.8,
				scrollTrigger: {
					trigger: element,
					start: 'top 80%',
					end: 'top 50%',
					toggleActions: 'play none none reverse'
				}
			});
		});
	});
	
	async function handleWaitlistSubmit(e: Event) {
		e.preventDefault();
		loading = true;
		
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1500));
		
		submitted = true;
		loading = false;
		
		// Reset form
		setTimeout(() => {
			email = '';
			name = '';
			company = '';
			useCase = '';
			submitted = false;
		}, 3000);
	}
</script>

<svelte:head>
	<title>AhFai - Privacy-First AI Personal Assistant</title>
	<meta name="description" content="The only AI assistant that works entirely on your device - no data collection, no cloud processing, complete privacy guaranteed." />
</svelte:head>

<!-- Hero Section -->
<section class="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
	<!-- Parallax Background -->
	<div class="hero-bg absolute inset-0 z-0">
		<div class="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"></div>
		<div class="absolute inset-0 opacity-20">
			<div class="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
			<div class="absolute top-40 right-10 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style="animation-delay: 2s;"></div>
			<div class="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style="animation-delay: 4s;"></div>
		</div>
	</div>
	
	<div class="hero-content container mx-auto px-4 relative z-10 text-center">
		<div class="max-w-4xl mx-auto">
			<!-- Animated Icon -->
			<div class="mb-8 inline-block">
				<div class="w-24 h-24 bg-white/10 backdrop-blur-lg rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl">
					<span class="text-6xl animate-float">🤖</span>
				</div>
			</div>
			
			<h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
				Your AI. Your Privacy.<br />
				<span class="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">Your Choice.</span>
			</h1>
			
			<p class="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
				The only AI personal assistant that processes everything locally on your device. 
				Get intelligent assistance without sacrificing privacy.
			</p>
			
			<div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
				<a href="/app" class="px-8 py-4 bg-white text-violet-600 rounded-xl font-bold text-lg hover:bg-white/90 transition-all shadow-2xl hover:scale-105 transform">
					Try AhFai Free
				</a>
				<a href="#waitlist" class="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20">
					Join Waitlist
				</a>
			</div>
			
			<!-- Trust Indicators -->
			<div class="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
				<div class="flex items-center gap-2">
					<svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
					</svg>
					<span>100% Local Processing</span>
				</div>
				<div class="flex items-center gap-2">
					<svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
					</svg>
					<span>Zero Data Collection</span>
				</div>
				<div class="flex items-center gap-2">
					<svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
					</svg>
					<span>Works Offline</span>
				</div>
			</div>
		</div>
	</div>
	
	<!-- Scroll Indicator -->
	<div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
		<svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
		</svg>
	</div>
</section>

<!-- Why Us Section -->
<section class="animate-on-scroll py-20 bg-white/5 backdrop-blur-lg">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose AhFai?</h2>
			<p class="text-xl text-white/80 max-w-2xl mx-auto">
				We're not just another AI assistant. We're the privacy revolution.
			</p>
		</div>
		
		<div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
				<div class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
					<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
					</svg>
				</div>
				<h3 class="text-2xl font-bold text-white mb-4">100% Private</h3>
				<p class="text-white/80">
					All AI processing happens on your device. Your conversations, notes, and data never leave your control. We literally cannot access your information.
				</p>
			</div>
			
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
				<div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
					<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
					</svg>
				</div>
				<h3 class="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
				<p class="text-white/80">
					No network latency means instant responses. Local processing is faster than cloud-based AI, giving you real-time assistance when you need it.
				</p>
			</div>
			
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
				<div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-6">
					<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
					</svg>
				</div>
				<h3 class="text-2xl font-bold text-white mb-4">Truly Intelligent</h3>
				<p class="text-white/80">
					Advanced AI models running locally provide smart suggestions, context-aware responses, and personalized assistance without compromising your privacy.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- How It Works Section -->
<section class="animate-on-scroll py-20">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
			<p class="text-xl text-white/80 max-w-2xl mx-auto">
				Get started with AhFai in three simple steps
			</p>
		</div>
		
		<div class="max-w-4xl mx-auto">
			<div class="grid md:grid-cols-3 gap-8">
				<div class="text-center">
					<div class="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-2xl">
						1
					</div>
					<h3 class="text-2xl font-bold text-white mb-4">Download & Install</h3>
					<p class="text-white/80">
						Download AhFai for your device. Setup takes less than 5 minutes. No account required to start.
					</p>
				</div>
				
				<div class="text-center">
					<div class="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-2xl">
						2
					</div>
					<h3 class="text-2xl font-bold text-white mb-4">Choose Your AI Model</h3>
					<p class="text-white/80">
						Select from privacy-focused AI models. All processing happens locally on your device.
					</p>
				</div>
				
				<div class="text-center">
					<div class="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-2xl">
						3
					</div>
					<h3 class="text-2xl font-bold text-white mb-4">Start Using</h3>
					<p class="text-white/80">
						Chat, take notes, set reminders, and get AI assistance - all while maintaining complete privacy.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Pricing Section -->
<section class="animate-on-scroll py-20 bg-white/5 backdrop-blur-lg">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
			<p class="text-xl text-white/80 max-w-2xl mx-auto">
				Choose the plan that fits your needs. All plans include our privacy guarantee.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
			<!-- Free Tier -->
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:scale-105 transition-transform">
				<div class="text-center mb-6">
					<h3 class="text-2xl font-bold text-white mb-2">Free</h3>
					<div class="text-5xl font-bold text-white mb-2">$0</div>
					<p class="text-white/60">Forever free</p>
				</div>
				<ul class="space-y-4 mb-8">
					<li class="flex items-start gap-3 text-white/80">
						<svg class="w-6 h-6 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<span>Basic local AI (Llama 2 7B)</span>
					</li>
					<li class="flex items-start gap-3 text-white/80">
						<svg class="w-6 h-6 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<span>Up to 1,000 notes</span>
					</li>
					<li class="flex items-start gap-3 text-white/80">
						<svg class="w-6 h-6 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<span>Basic task management</span>
					</li>
					<li class="flex items-start gap-3 text-white/80">
						<svg class="w-6 h-6 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<span>100% privacy guaranteed</span>
					</li>
				</ul>
				<a href="/app" class="block w-full py-3 bg-white/10 text-white text-center rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20">
					Get Started
				</a>
			</div>

			<!-- Privacy Pro -->
			<div class="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-8 border-2 border-yellow-400 hover:scale-105 transition-transform relative">
				<div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-purple-900 px-4 py-1 rounded-full text-sm font-bold">
					MOST POPULAR
				</div>
				<div class="text-center mb-6">
					<h3 class="text-2xl font-bold text-white mb-2">Privacy Pro</h3>
					<div class="text-5xl font-bold text-white mb-2">$9.99</div>
					<p class="text-white/80">per month</p>
					<p class="text-sm text-yellow-300 mt-2">Early bird: $4.99/mo (50% off first year)</p>
				</div>
				<ul class="space-y-4 mb-8">
					<li class="flex items-start gap-3 text-white">
						<svg class="w-6 h-6 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<span>Everything in Free +</span>
					</li>
					<li class="flex items-start gap-3 text-white">
						<svg class="w-6 h-6 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<span>Advanced AI models (Mistral, CodeLlama)</span>
					</li>
					<li class="flex items-start gap-3 text-white">
						<svg class="w-6 h-6 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<span>Unlimited notes & tasks</span>
					</li>
					<li class="flex items-start gap-3 text-white">
						<svg class="w-6 h-6 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<span>Voice-to-text & smart search</span>
					</li>
					<li class="flex items-start gap-3 text-white">
						<svg class="w-6 h-6 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<span>Custom automation workflows</span>
					</li>
				</ul>
				<a href="/app" class="block w-full py-3 bg-white text-purple-600 text-center rounded-lg font-semibold hover:bg-white/90 transition-all">
					Start Free Trial
				</a>
			</div>

			<!-- Enterprise -->
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:scale-105 transition-transform">
				<div class="text-center mb-6">
					<h3 class="text-2xl font-bold text-white mb-2">Enterprise</h3>
					<div class="text-5xl font-bold text-white mb-2">$99.99</div>
					<p class="text-white/60">per month</p>
				</div>
				<ul class="space-y-4 mb-8">
					<li class="flex items-start gap-3 text-white/80">
						<svg class="w-6 h-6 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<span>Everything in Privacy Pro +</span>
					</li>
					<li class="flex items-start gap-3 text-white/80">
						<svg class="w-6 h-6 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<span>On-premise deployment</span>
					</li>
					<li class="flex items-start gap-3 text-white/80">
						<svg class="w-6 h-6 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<span>SSO & LDAP integration</span>
					</li>
					<li class="flex items-start gap-3 text-white/80">
						<svg class="w-6 h-6 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<span>HIPAA & SOC 2 compliance</span>
					</li>
					<li class="flex items-start gap-3 text-white/80">
						<svg class="w-6 h-6 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<span>Dedicated support manager</span>
					</li>
				</ul>
				<a href="/contact" class="block w-full py-3 bg-white/10 text-white text-center rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20">
					Contact Sales
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Mission & Vision Section -->
<section class="animate-on-scroll py-20">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-8">Our Mission</h2>
			<p class="text-2xl text-white/90 mb-12 leading-relaxed">
				To democratize AI assistance while protecting fundamental privacy rights.
				We believe everyone deserves intelligent help without surveillance.
			</p>

			<div class="grid md:grid-cols-2 gap-8 mt-16">
				<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
					<h3 class="text-2xl font-bold text-white mb-4">🎯 Our Vision</h3>
					<p class="text-white/80">
						A world where AI empowers individuals without compromising their privacy.
						Where technology serves people, not corporations collecting data.
					</p>
				</div>

				<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
					<h3 class="text-2xl font-bold text-white mb-4">💡 Our Values</h3>
					<p class="text-white/80">
						Privacy first, always. Transparency in everything we do.
						User control over their data. Innovation without exploitation.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Waitlist Section -->
<section id="waitlist" class="animate-on-scroll py-20 bg-white/5 backdrop-blur-lg">
	<div class="container mx-auto px-4">
		<div class="max-w-2xl mx-auto">
			<div class="text-center mb-12">
				<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Join the Privacy Revolution</h2>
				<p class="text-xl text-white/80">
					Be among the first to experience truly private AI assistance.
					Get early access and exclusive founder pricing.
				</p>
			</div>

			{#if submitted}
				<div class="bg-green-500/20 border border-green-400 rounded-2xl p-8 text-center">
					<svg class="w-16 h-16 text-green-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
					</svg>
					<h3 class="text-2xl font-bold text-white mb-2">You're on the list!</h3>
					<p class="text-white/80">
						We'll send you early access details soon. Check your email for confirmation.
					</p>
				</div>
			{:else}
				<form onsubmit={handleWaitlistSubmit} class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
					<div class="grid md:grid-cols-2 gap-6 mb-6">
						<div>
							<label for="name" class="block text-white font-semibold mb-2">Name</label>
							<input
								type="text"
								id="name"
								bind:value={name}
								required
								class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500"
								placeholder="Your name"
							/>
						</div>

						<div>
							<label for="email" class="block text-white font-semibold mb-2">Email</label>
							<input
								type="email"
								id="email"
								bind:value={email}
								required
								class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500"
								placeholder="your@email.com"
							/>
						</div>
					</div>

					<div class="mb-6">
						<label for="company" class="block text-white font-semibold mb-2">Company (Optional)</label>
						<input
							type="text"
							id="company"
							bind:value={company}
							class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500"
							placeholder="Your company"
						/>
					</div>

					<div class="mb-6">
						<label for="useCase" class="block text-white font-semibold mb-2">What will you use AhFai for?</label>
						<textarea
							id="useCase"
							bind:value={useCase}
							rows="3"
							class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500"
							placeholder="Tell us about your use case..."
						></textarea>
					</div>

					<button
						type="submit"
						disabled={loading}
						class="w-full py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg font-bold text-lg hover:from-violet-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{#if loading}
							<span class="flex items-center justify-center gap-2">
								<svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Joining...
							</span>
						{:else}
							Join Waitlist
						{/if}
					</button>

					<p class="text-white/60 text-sm text-center mt-4">
						By joining, you agree to receive updates about AhFai. Unsubscribe anytime.
					</p>
				</form>
			{/if}
		</div>
	</div>
</section>

