<script lang="ts">
	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');
	let submitted = $state(false);
	let loading = $state(false);
	
	async function handleSubmit(e: Event) {
		e.preventDefault();
		loading = true;
		
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1500));
		
		submitted = true;
		loading = false;
		
		// Reset form
		setTimeout(() => {
			name = '';
			email = '';
			subject = '';
			message = '';
			submitted = false;
		}, 3000);
	}
</script>

<svelte:head>
	<title>Contact Us - AhFai</title>
	<meta name="description" content="Get in touch with the AhFai team. We're here to help with questions, support, and partnership opportunities." />
</svelte:head>

<div class="min-h-screen py-20">
	<div class="container mx-auto px-4">
		<div class="max-w-6xl mx-auto">
			<!-- Header -->
			<div class="text-center mb-16">
				<h1 class="text-5xl md:text-6xl font-bold text-white mb-6">Get in Touch</h1>
				<p class="text-xl text-white/80 max-w-2xl mx-auto">
					Have questions? Want to partner with us? We'd love to hear from you.
				</p>
			</div>
			
			<div class="grid md:grid-cols-2 gap-12">
				<!-- Contact Form -->
				<div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
					<h2 class="text-3xl font-bold text-white mb-6">Send us a message</h2>
					
					{#if submitted}
						<div class="bg-green-500/20 border border-green-400 rounded-xl p-6 text-center">
							<svg class="w-16 h-16 text-green-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
							</svg>
							<h3 class="text-2xl font-bold text-white mb-2">Message Sent!</h3>
							<p class="text-white/80">
								We'll get back to you within 24 hours.
							</p>
						</div>
					{:else}
						<form onsubmit={handleSubmit} class="space-y-6">
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
							
							<div>
								<label for="subject" class="block text-white font-semibold mb-2">Subject</label>
								<input
									type="text"
									id="subject"
									bind:value={subject}
									required
									class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500"
									placeholder="What's this about?"
								/>
							</div>
							
							<div>
								<label for="message" class="block text-white font-semibold mb-2">Message</label>
								<textarea
									id="message"
									bind:value={message}
									required
									rows="6"
									class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
									placeholder="Tell us more..."
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
										Sending...
									</span>
								{:else}
									Send Message
								{/if}
							</button>
						</form>
					{/if}
				</div>
				
				<!-- Contact Information -->
				<div class="space-y-8">
					<!-- Contact Details -->
					<div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
						<h3 class="text-2xl font-bold text-white mb-6">Contact Information</h3>
						<div class="space-y-6">
							<div class="flex items-start gap-4">
								<div class="w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
									<svg class="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
									</svg>
								</div>
								<div>
									<h4 class="text-white font-semibold mb-1">Email</h4>
									<a href="mailto:hello@ahfai.com" class="text-white/80 hover:text-white transition-colors">
										hello@ahfai.com
									</a>
								</div>
							</div>
							
							<div class="flex items-start gap-4">
								<div class="w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
									<svg class="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
									</svg>
								</div>
								<div>
									<h4 class="text-white font-semibold mb-1">Location</h4>
									<p class="text-white/80">
										Remote-first company<br />
										Serving users globally
									</p>
								</div>
							</div>
							
							<div class="flex items-start gap-4">
								<div class="w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
									<svg class="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
									</svg>
								</div>
								<div>
									<h4 class="text-white font-semibold mb-1">Response Time</h4>
									<p class="text-white/80">
										Within 24 hours<br />
										Monday - Friday
									</p>
								</div>
							</div>
						</div>
					</div>
					
					<!-- Social Links -->
					<div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
						<h3 class="text-2xl font-bold text-white mb-6">Follow Us</h3>
						<div class="grid grid-cols-2 gap-4">
							<a href="https://twitter.com/ahfai" class="flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all border border-white/20">
								<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
									<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
								</svg>
								<span class="text-white font-semibold">Twitter</span>
							</a>
							
							<a href="https://linkedin.com/company/ahfai" class="flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all border border-white/20">
								<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
									<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
								</svg>
								<span class="text-white font-semibold">LinkedIn</span>
							</a>
							
							<a href="https://github.com/TrillionUnicorn/AhFai" class="flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all border border-white/20">
								<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
								</svg>
								<span class="text-white font-semibold">GitHub</span>
							</a>
							
							<a href="https://discord.gg/ahfai" class="flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all border border-white/20">
								<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
									<path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path>
								</svg>
								<span class="text-white font-semibold">Discord</span>
							</a>
						</div>
					</div>
					
					<!-- Team Info -->
					<div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
						<h3 class="text-2xl font-bold text-white mb-4">Meet the Founder</h3>
						<div class="flex items-center gap-4">
							<div class="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-2xl">
								👨‍💻
							</div>
							<div>
								<h4 class="text-white font-bold text-lg">Hunter Ho</h4>
								<p class="text-white/70 text-sm">Founder & CEO</p>
								<div class="flex gap-2 mt-2">
									<a href="https://github.com/HunterHo07" class="text-white/60 hover:text-white transition-colors">
										<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
										</svg>
									</a>
									<a href="https://hunterho07.github.io/Portfolio_1/" class="text-white/60 hover:text-white transition-colors">
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
										</svg>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

