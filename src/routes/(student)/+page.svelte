<script lang="ts">
	import { onMount } from 'svelte';
	
	let waitlistForm = $state({ name: '', email: '', submitted: false, loading: false });
	let studyStats = $state({ hoursStudied: 0, flashcardsCreated: 0, gradesImproved: 0 });
	
	onMount(() => {
		const interval = setInterval(() => {
			if (studyStats.hoursStudied < 100) studyStats.hoursStudied += 5;
			if (studyStats.flashcardsCreated < 1000) studyStats.flashcardsCreated += 50;
			if (studyStats.gradesImproved < 25) studyStats.gradesImproved += 1;
			
			if (studyStats.hoursStudied >= 100 && studyStats.flashcardsCreated >= 1000 && studyStats.gradesImproved >= 25) {
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
	<title>AhFai Edu - Your AI Study Buddy</title>
	<meta name="description" content="Ace your exams with AI-powered study tools. Flashcards, research assistant, and more." />
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
	<div class="absolute inset-0 opacity-20">
		<div class="absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
		<div class="absolute top-40 right-10 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl animate-float" style="animation-delay: 2s;"></div>
		<div class="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-float" style="animation-delay: 4s;"></div>
	</div>
	
	<div class="container mx-auto px-4 relative z-10">
		<div class="max-w-4xl mx-auto text-center">
			<div class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-lg rounded-full text-white mb-6 animate-fade-in">
				<span class="text-2xl">🎓</span>
				<span class="font-semibold">Trusted by 50,000+ Students</span>
			</div>
			
			<h1 class="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
				Your AI<br />
				<span class="bg-gradient-to-r from-green-300 to-teal-300 bg-clip-text text-transparent">
					Study Buddy
				</span>
			</h1>
			
			<p class="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up" style="animation-delay: 0.2s;">
				Ace your exams with AI-powered flashcards, research tools, and personalized study plans.
			</p>
			
			<div class="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style="animation-delay: 0.4s;">
				<a href="/app" class="px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:bg-white/90 transition-all shadow-2xl">
					Start Studying Free
				</a>
				<a href="#study" class="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20">
					See Study Tools
				</a>
			</div>
			
			<div class="grid grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in" style="animation-delay: 0.6s;">
				<div class="text-center">
					<div class="text-3xl md:text-4xl font-bold text-white mb-2">{Math.round(studyStats.hoursStudied)}+</div>
					<div class="text-white/70 text-sm">Study Hours</div>
				</div>
				<div class="text-center">
					<div class="text-3xl md:text-4xl font-bold text-white mb-2">{Math.round(studyStats.flashcardsCreated)}+</div>
					<div class="text-white/70 text-sm">Flashcards</div>
				</div>
				<div class="text-center">
					<div class="text-3xl md:text-4xl font-bold text-white mb-2">{Math.round(studyStats.gradesImproved)}%</div>
					<div class="text-white/70 text-sm">Grade Improvement</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Features Section -->
<section id="features" class="py-20">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Study Smarter, Not Harder</h2>
			<p class="text-xl text-white/80 max-w-2xl mx-auto">Everything you need to excel academically</p>
		</div>
		
		<div class="grid md:grid-cols-3 gap-8">
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
				<div class="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center text-3xl mb-6">📝</div>
				<h3 class="text-2xl font-bold text-white mb-4">AI Flashcards</h3>
				<p class="text-white/80 mb-4">Generate flashcards from your notes automatically. Study efficiently with spaced repetition.</p>
				<ul class="space-y-2 text-white/70">
					<li class="flex items-start gap-2"><span class="text-green-400">✓</span><span>Auto-generate from notes</span></li>
					<li class="flex items-start gap-2"><span class="text-green-400">✓</span><span>Spaced repetition</span></li>
					<li class="flex items-start gap-2"><span class="text-green-400">✓</span><span>Progress tracking</span></li>
				</ul>
			</div>
			
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
				<div class="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center text-3xl mb-6">🔬</div>
				<h3 class="text-2xl font-bold text-white mb-4">Research Assistant</h3>
				<p class="text-white/80 mb-4">Organize sources, generate citations, and summarize research papers with AI.</p>
				<ul class="space-y-2 text-white/70">
					<li class="flex items-start gap-2"><span class="text-green-400">✓</span><span>Citation generator</span></li>
					<li class="flex items-start gap-2"><span class="text-green-400">✓</span><span>Paper summaries</span></li>
					<li class="flex items-start gap-2"><span class="text-green-400">✓</span><span>Source organization</span></li>
				</ul>
			</div>
			
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
				<div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center text-3xl mb-6">📊</div>
				<h3 class="text-2xl font-bold text-white mb-4">Study Analytics</h3>
				<p class="text-white/80 mb-4">Track your progress, identify weak areas, and optimize your study schedule.</p>
				<ul class="space-y-2 text-white/70">
					<li class="flex items-start gap-2"><span class="text-green-400">✓</span><span>Progress dashboard</span></li>
					<li class="flex items-start gap-2"><span class="text-green-400">✓</span><span>Weak area detection</span></li>
					<li class="flex items-start gap-2"><span class="text-green-400">✓</span><span>Study schedule optimizer</span></li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Study Tools Section -->
<section id="study" class="py-20">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20">
			<div class="text-center mb-12">
				<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Complete Study Toolkit</h2>
				<p class="text-xl text-white/80">Everything you need in one place</p>
			</div>
			
			<div class="grid md:grid-cols-2 gap-6">
				<div class="bg-white/10 rounded-2xl p-6">
					<h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
						<span>📚</span> Note Taking
					</h3>
					<p class="text-white/80 text-sm">AI-powered note organization with automatic summaries and key point extraction.</p>
				</div>
				
				<div class="bg-white/10 rounded-2xl p-6">
					<h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
						<span>🎯</span> Quiz Generator
					</h3>
					<p class="text-white/80 text-sm">Create practice quizzes from your notes to test your knowledge.</p>
				</div>
				
				<div class="bg-white/10 rounded-2xl p-6">
					<h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
						<span>📖</span> Study Planner
					</h3>
					<p class="text-white/80 text-sm">AI-optimized study schedules based on your exams and learning pace.</p>
				</div>
				
				<div class="bg-white/10 rounded-2xl p-6">
					<h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
						<span>🤝</span> Study Groups
					</h3>
					<p class="text-white/80 text-sm">Collaborate with classmates and share study materials securely.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Pricing Section -->
<section id="pricing" class="py-20">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Student-Friendly Pricing</h2>
			<p class="text-xl text-white/80 max-w-2xl mx-auto">Affordable plans for every student</p>
		</div>
		
		<div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
				<h3 class="text-2xl font-bold text-white mb-2">Free</h3>
				<div class="text-4xl font-bold text-white mb-6">$0<span class="text-lg text-white/70">/month</span></div>
				<ul class="space-y-3 mb-8">
					<li class="flex items-start gap-2 text-white/80"><span class="text-green-400">✓</span><span>100 flashcards/month</span></li>
					<li class="flex items-start gap-2 text-white/80"><span class="text-green-400">✓</span><span>Basic note taking</span></li>
					<li class="flex items-start gap-2 text-white/80"><span class="text-green-400">✓</span><span>Community support</span></li>
				</ul>
				<a href="/app" class="block w-full px-6 py-3 bg-white/10 text-white rounded-lg font-semibold text-center hover:bg-white/20 transition-all border border-white/20">
					Get Started
				</a>
			</div>
			
			<div class="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-8 border-2 border-yellow-400 relative">
				<div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
					<span class="bg-yellow-400 text-green-900 px-4 py-1 rounded-full text-sm font-bold">STUDENT FAVORITE</span>
				</div>
				<h3 class="text-2xl font-bold text-white mb-2">Student Pro</h3>
				<div class="text-4xl font-bold text-white mb-6">$4.99<span class="text-lg text-white/90">/month</span></div>
				<ul class="space-y-3 mb-8">
					<li class="flex items-start gap-2 text-white"><span class="text-yellow-300">✓</span><span>Unlimited flashcards</span></li>
					<li class="flex items-start gap-2 text-white"><span class="text-yellow-300">✓</span><span>AI research assistant</span></li>
					<li class="flex items-start gap-2 text-white"><span class="text-yellow-300">✓</span><span>Study analytics</span></li>
					<li class="flex items-start gap-2 text-white"><span class="text-yellow-300">✓</span><span>Priority support</span></li>
					<li class="flex items-start gap-2 text-white"><span class="text-yellow-300">✓</span><span>Study groups</span></li>
				</ul>
				<a href="/app" class="block w-full px-6 py-3 bg-white text-green-600 rounded-lg font-semibold text-center hover:bg-white/90 transition-all shadow-xl">
					Start Free Trial
				</a>
			</div>
			
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
				<h3 class="text-2xl font-bold text-white mb-2">School</h3>
				<div class="text-4xl font-bold text-white mb-6">$49.99<span class="text-lg text-white/70">/month</span></div>
				<ul class="space-y-3 mb-8">
					<li class="flex items-start gap-2 text-white/80"><span class="text-green-400">✓</span><span>Everything in Pro</span></li>
					<li class="flex items-start gap-2 text-white/80"><span class="text-green-400">✓</span><span>Class management</span></li>
					<li class="flex items-start gap-2 text-white/80"><span class="text-green-400">✓</span><span>Teacher dashboard</span></li>
					<li class="flex items-start gap-2 text-white/80"><span class="text-green-400">✓</span><span>Bulk licensing</span></li>
					<li class="flex items-start gap-2 text-white/80"><span class="text-green-400">✓</span><span>Dedicated support</span></li>
				</ul>
				<a href="/contact" class="block w-full px-6 py-3 bg-white/10 text-white rounded-lg font-semibold text-center hover:bg-white/20 transition-all border border-white/20">
					Contact Us
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Waitlist Section -->
<section class="py-20">
	<div class="container mx-auto px-4">
		<div class="max-w-2xl mx-auto bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl p-12 text-center">
			<h2 class="text-4xl font-bold text-white mb-4">Ready to Ace Your Exams?</h2>
			<p class="text-xl text-white/90 mb-8">Join thousands of students studying smarter with AhFai Edu</p>
			
			{#if waitlistForm.submitted}
				<div class="bg-white/20 backdrop-blur-lg rounded-xl p-6 animate-scale-in">
					<div class="text-5xl mb-4">🎉</div>
					<h3 class="text-2xl font-bold text-white mb-2">Welcome aboard!</h3>
					<p class="text-white/90">Check your email for next steps.</p>
				</div>
			{:else}
				<form onsubmit={handleWaitlistSubmit} class="flex flex-col sm:flex-row gap-4">
					<input type="text" bind:value={waitlistForm.name} placeholder="Your name" required
						class="flex-1 px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50" />
					<input type="email" bind:value={waitlistForm.email} placeholder="Your email" required
						class="flex-1 px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50" />
					<button type="submit" disabled={waitlistForm.loading}
						class="px-8 py-4 bg-white text-green-600 rounded-xl font-bold hover:bg-white/90 transition-all disabled:opacity-50">
						{waitlistForm.loading ? 'Joining...' : 'Start Learning'}
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>

