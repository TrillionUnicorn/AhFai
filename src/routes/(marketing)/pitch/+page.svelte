<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';

	let marketChart: Chart | null = null;
	let revenueChart: Chart | null = null;
	let competitorChart: Chart | null = null;

	onMount(() => {
		Chart.register(...registerables);

		// Market Size Chart
		const marketCtx = document.getElementById('marketChart') as HTMLCanvasElement;
		if (marketCtx) {
			marketChart = new Chart(marketCtx, {
				type: 'bar',
				data: {
					labels: ['2023', '2024', '2025', '2026', '2027', '2028'],
					datasets: [{
						label: 'AI Assistant Market Size (Billion USD)',
						data: [4.8, 7.2, 10.8, 16.2, 24.3, 36.5],
						backgroundColor: 'rgba(139, 92, 246, 0.8)',
						borderColor: 'rgba(139, 92, 246, 1)',
						borderWidth: 2
					}]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						legend: {
							labels: { color: 'white' }
						}
					},
					scales: {
						y: {
							beginAtZero: true,
							ticks: { color: 'white' },
							grid: { color: 'rgba(255, 255, 255, 0.1)' }
						},
						x: {
							ticks: { color: 'white' },
							grid: { color: 'rgba(255, 255, 255, 0.1)' }
						}
					}
				}
			});
		}

		// Revenue Projection Chart
		const revenueCtx = document.getElementById('revenueChart') as HTMLCanvasElement;
		if (revenueCtx) {
			revenueChart = new Chart(revenueCtx, {
				type: 'line',
				data: {
					labels: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026'],
					datasets: [{
						label: 'Projected Revenue (USD)',
						data: [5000, 15000, 35000, 75000, 150000, 300000],
						borderColor: 'rgba(34, 197, 94, 1)',
						backgroundColor: 'rgba(34, 197, 94, 0.1)',
						fill: true,
						tension: 0.4
					}]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						legend: {
							labels: { color: 'white' }
						}
					},
					scales: {
						y: {
							beginAtZero: true,
							ticks: { color: 'white' },
							grid: { color: 'rgba(255, 255, 255, 0.1)' }
						},
						x: {
							ticks: { color: 'white' },
							grid: { color: 'rgba(255, 255, 255, 0.1)' }
						}
					}
				}
			});
		}

		// Competitor Comparison Chart
		const competitorCtx = document.getElementById('competitorChart') as HTMLCanvasElement;
		if (competitorCtx) {
			competitorChart = new Chart(competitorCtx, {
				type: 'radar',
				data: {
					labels: ['Privacy', 'Speed', 'Offline', 'Cost', 'Features', 'UX'],
					datasets: [
						{
							label: 'AhFai',
							data: [100, 95, 100, 90, 85, 90],
							borderColor: 'rgba(139, 92, 246, 1)',
							backgroundColor: 'rgba(139, 92, 246, 0.2)',
							pointBackgroundColor: 'rgba(139, 92, 246, 1)'
						},
						{
							label: 'ChatGPT',
							data: [30, 70, 0, 60, 95, 85],
							borderColor: 'rgba(239, 68, 68, 1)',
							backgroundColor: 'rgba(239, 68, 68, 0.2)',
							pointBackgroundColor: 'rgba(239, 68, 68, 1)'
						},
						{
							label: 'Notion AI',
							data: [40, 75, 20, 70, 80, 90],
							borderColor: 'rgba(59, 130, 246, 1)',
							backgroundColor: 'rgba(59, 130, 246, 0.2)',
							pointBackgroundColor: 'rgba(59, 130, 246, 1)'
						}
					]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						legend: {
							labels: { color: 'white' }
						}
					},
					scales: {
						r: {
							beginAtZero: true,
							max: 100,
							ticks: { color: 'white', backdropColor: 'transparent' },
							grid: { color: 'rgba(255, 255, 255, 0.1)' },
							pointLabels: { color: 'white' }
						}
					}
				}
			});
		}

		return () => {
			marketChart?.destroy();
			revenueChart?.destroy();
			competitorChart?.destroy();
		};
	});
</script>

<svelte:head>
	<title>Pitch Deck - AhFai</title>
	<meta name="description" content="AhFai investor pitch deck - Market analysis, business model, and growth projections for the privacy-first AI assistant." />
</svelte:head>

<div class="min-h-screen py-20">
	<div class="container mx-auto px-4">
		<div class="max-w-6xl mx-auto">
			<!-- Header -->
			<div class="text-center mb-16">
				<h1 class="text-5xl md:text-6xl font-bold text-white mb-6">AhFai Pitch Deck</h1>
				<p class="text-xl text-white/80 max-w-2xl mx-auto">
					Revolutionizing AI assistance with privacy-first technology
				</p>
			</div>

			<!-- Problem Statement -->
			<section class="mb-16">
				<div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
					<h2 class="text-3xl font-bold text-white mb-6">🎯 The Problem</h2>
					<div class="grid md:grid-cols-3 gap-6">
						<div class="bg-red-500/20 border border-red-400/30 rounded-xl p-6">
							<h3 class="text-xl font-bold text-white mb-3">Privacy Concerns</h3>
							<p class="text-white/80">
								87% of users worry about AI assistants collecting their personal data
								<span class="text-xs block mt-2 text-white/60">Source: Pew Research Center, 2024</span>
							</p>
						</div>
						<div class="bg-red-500/20 border border-red-400/30 rounded-xl p-6">
							<h3 class="text-xl font-bold text-white mb-3">Cloud Dependency</h3>
							<p class="text-white/80">
								Current AI assistants require constant internet connection, limiting accessibility
								<span class="text-xs block mt-2 text-white/60">Source: Gartner, 2024</span>
							</p>
						</div>
						<div class="bg-red-500/20 border border-red-400/30 rounded-xl p-6">
							<h3 class="text-xl font-bold text-white mb-3">Data Breaches</h3>
							<p class="text-white/80">
								$4.45M average cost of a data breach in 2023, affecting millions of users
								<span class="text-xs block mt-2 text-white/60">Source: IBM Security Report, 2023</span>
							</p>
						</div>
					</div>
				</div>
			</section>

			<!-- Solution -->
			<section class="mb-16">
				<div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
					<h2 class="text-3xl font-bold text-white mb-6">💡 Our Solution</h2>
					<div class="grid md:grid-cols-2 gap-8">
						<div>
							<h3 class="text-2xl font-bold text-white mb-4">AhFai: Privacy-First AI Assistant</h3>
							<ul class="space-y-3 text-white/80">
								<li class="flex items-start gap-3">
									<svg class="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span><strong>100% Local Processing:</strong> All AI runs on user's device</span>
								</li>
								<li class="flex items-start gap-3">
									<svg class="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span><strong>Zero Data Collection:</strong> We literally cannot access user data</span>
								</li>
								<li class="flex items-start gap-3">
									<svg class="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span><strong>Works Offline:</strong> Full functionality without internet</span>
								</li>
								<li class="flex items-start gap-3">
									<svg class="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
									</svg>
									<span><strong>Lightning Fast:</strong> No network latency</span>
								</li>
							</ul>
						</div>
						<div class="bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-xl p-6 border border-violet-400/30">
							<h4 class="text-xl font-bold text-white mb-4">Key Differentiator</h4>
							<p class="text-white/90 text-lg mb-4">
								We're not just another AI assistant. We're the <strong>only</strong> solution that guarantees complete privacy through local processing.
							</p>
							<div class="bg-white/10 rounded-lg p-4">
								<p class="text-white/80 text-sm">
									"Privacy is not a feature, it's a fundamental right. AhFai makes this right accessible to everyone."
								</p>
								<p class="text-white/60 text-xs mt-2">- Hunter Ho, Founder & CEO</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Market Analysis -->
			<section class="mb-16">
				<div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
					<h2 class="text-3xl font-bold text-white mb-6">📊 Market Analysis</h2>

					<div class="grid md:grid-cols-3 gap-6 mb-8">
						<div class="bg-violet-500/20 border border-violet-400/30 rounded-xl p-6 text-center">
							<div class="text-4xl font-bold text-white mb-2">$36.5B</div>
							<p class="text-white/80">TAM by 2028</p>
							<p class="text-xs text-white/60 mt-2">AI Assistant Market</p>
						</div>
						<div class="bg-violet-500/20 border border-violet-400/30 rounded-xl p-6 text-center">
							<div class="text-4xl font-bold text-white mb-2">$8.2B</div>
							<p class="text-white/80">SAM by 2028</p>
							<p class="text-xs text-white/60 mt-2">Privacy-Focused Segment</p>
						</div>
						<div class="bg-violet-500/20 border border-violet-400/30 rounded-xl p-6 text-center">
							<div class="text-4xl font-bold text-white mb-2">$410M</div>
							<p class="text-white/80">SOM by 2028</p>
							<p class="text-xs text-white/60 mt-2">Our Target Market (5%)</p>
						</div>
					</div>

					<div class="bg-white/5 rounded-xl p-6">
						<h3 class="text-xl font-bold text-white mb-4">Market Growth Projection</h3>
						<div class="h-64">
							<canvas id="marketChart"></canvas>
						</div>
						<p class="text-white/60 text-sm mt-4">
							Source: Grand View Research, "AI Personal Assistant Market Size Report, 2024-2030"
						</p>
					</div>
				</div>
			</section>

		<!-- Competitive Analysis -->
		<section class="mb-16">
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
				<h2 class="text-3xl font-bold text-white mb-6">🏆 Competitive Analysis</h2>

				<div class="grid md:grid-cols-2 gap-8 mb-8">
					<div>
						<h3 class="text-xl font-bold text-white mb-4">Direct Competitors</h3>
						<div class="space-y-4">
							<div class="bg-white/5 rounded-lg p-4">
								<div class="flex justify-between items-start mb-2">
									<h4 class="font-bold text-white">ChatGPT</h4>
									<span class="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">Cloud-based</span>
								</div>
								<p class="text-white/70 text-sm mb-2">100M+ users, $20/mo premium</p>
								<p class="text-white/60 text-xs">Weakness: All data sent to OpenAI servers, privacy concerns</p>
							</div>

							<div class="bg-white/5 rounded-lg p-4">
								<div class="flex justify-between items-start mb-2">
									<h4 class="font-bold text-white">Notion AI</h4>
									<span class="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">Cloud-based</span>
								</div>
								<p class="text-white/70 text-sm mb-2">30M+ users, $10/mo</p>
								<p class="text-white/60 text-xs">Weakness: Requires internet, limited offline functionality</p>
							</div>

							<div class="bg-white/5 rounded-lg p-4">
								<div class="flex justify-between items-start mb-2">
									<h4 class="font-bold text-white">Microsoft Copilot</h4>
									<span class="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">Cloud-based</span>
								</div>
								<p class="text-white/70 text-sm mb-2">Enterprise focus, $30/user/mo</p>
								<p class="text-white/60 text-xs">Weakness: Expensive, data stored on Microsoft servers</p>
							</div>
						</div>
					</div>

					<div>
						<h3 class="text-xl font-bold text-white mb-4">Competitive Advantages</h3>
						<div class="h-80">
							<canvas id="competitorChart"></canvas>
						</div>
						<p class="text-white/60 text-sm mt-4">
							AhFai leads in privacy, offline capability, and cost-effectiveness
						</p>
					</div>
				</div>

				<div class="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl p-6">
					<h3 class="text-xl font-bold text-white mb-3">Our Competitive Moat</h3>
					<ul class="grid md:grid-cols-2 gap-3 text-white/80">
						<li class="flex items-start gap-2">
							<span class="text-green-400">✓</span>
							<span>Proprietary local AI optimization technology</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-green-400">✓</span>
							<span>First-mover advantage in privacy-first AI</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-green-400">✓</span>
							<span>Strong brand positioning around privacy</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-green-400">✓</span>
							<span>Lower operational costs (no cloud infrastructure)</span>
						</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- Business Model -->
		<section class="mb-16">
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
				<h2 class="text-3xl font-bold text-white mb-6">💰 Business Model</h2>

				<div class="grid md:grid-cols-3 gap-6 mb-8">
					<div class="bg-white/5 rounded-xl p-6">
						<h3 class="text-xl font-bold text-white mb-4">Freemium</h3>
						<div class="text-3xl font-bold text-white mb-2">$0</div>
						<p class="text-white/70 mb-4">Basic features, limited AI model</p>
						<ul class="space-y-2 text-white/60 text-sm">
							<li>• Up to 1,000 notes</li>
							<li>• Basic AI (Llama 2 7B)</li>
							<li>• Community support</li>
						</ul>
					</div>

					<div class="bg-gradient-to-br from-violet-500/30 to-purple-600/30 rounded-xl p-6 border-2 border-violet-400">
						<div class="text-center mb-2">
							<span class="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-xs font-bold">MOST POPULAR</span>
						</div>
						<h3 class="text-xl font-bold text-white mb-4">Privacy Pro</h3>
						<div class="text-3xl font-bold text-white mb-2">$9.99<span class="text-lg">/mo</span></div>
						<p class="text-white/70 mb-4">Advanced features, premium AI</p>
						<ul class="space-y-2 text-white/80 text-sm">
							<li>• Unlimited notes & tasks</li>
							<li>• Advanced AI models</li>
							<li>• Priority support</li>
							<li>• Custom workflows</li>
						</ul>
					</div>

					<div class="bg-white/5 rounded-xl p-6">
						<h3 class="text-xl font-bold text-white mb-4">Enterprise</h3>
						<div class="text-3xl font-bold text-white mb-2">$99.99<span class="text-lg">/mo</span></div>
						<p class="text-white/70 mb-4">Team features, compliance</p>
						<ul class="space-y-2 text-white/60 text-sm">
							<li>• On-premise deployment</li>
							<li>• SSO & LDAP</li>
							<li>• HIPAA/SOC 2 compliance</li>
							<li>• Dedicated support</li>
						</ul>
					</div>
				</div>

				<div class="grid md:grid-cols-2 gap-6">
					<div class="bg-white/5 rounded-xl p-6">
						<h3 class="text-xl font-bold text-white mb-4">Revenue Streams</h3>
						<ul class="space-y-3 text-white/80">
							<li class="flex justify-between">
								<span>Subscription Revenue (70%)</span>
								<span class="font-bold">Primary</span>
							</li>
							<li class="flex justify-between">
								<span>Enterprise Licenses (25%)</span>
								<span class="font-bold">Growing</span>
							</li>
							<li class="flex justify-between">
								<span>API Access (5%)</span>
								<span class="font-bold">Future</span>
							</li>
						</ul>
					</div>

					<div class="bg-white/5 rounded-xl p-6">
						<h3 class="text-xl font-bold text-white mb-4">Unit Economics</h3>
						<ul class="space-y-3 text-white/80">
							<li class="flex justify-between">
								<span>CAC (Customer Acquisition Cost)</span>
								<span class="font-bold">$15</span>
							</li>
							<li class="flex justify-between">
								<span>LTV (Lifetime Value)</span>
								<span class="font-bold">$240</span>
							</li>
							<li class="flex justify-between">
								<span>LTV:CAC Ratio</span>
								<span class="font-bold text-green-400">16:1</span>
							</li>
							<li class="flex justify-between">
								<span>Gross Margin</span>
								<span class="font-bold text-green-400">85%</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>

			<!-- Team & CTA -->
			<section class="mb-16">
				<div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
					<h2 class="text-3xl font-bold text-white mb-6">👥 Team</h2>
					<div class="grid md:grid-cols-3 gap-6">
						<div class="bg-white/5 rounded-xl p-6 text-center">
							<div class="w-24 h-24 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
								👨‍💻
							</div>
							<h3 class="text-xl font-bold text-white mb-2">Hunter Ho</h3>
							<p class="text-violet-400 mb-3">Founder & CEO</p>
							<p class="text-white/70 text-sm mb-4">
								Full-stack developer with expertise in AI/ML and privacy-focused technologies
							</p>
							<div class="flex justify-center gap-3">
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

						<div class="bg-white/5 rounded-xl p-6 text-center">
							<div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
								🎯
							</div>
							<h3 class="text-xl font-bold text-white mb-2">Seeking: CTO</h3>
							<p class="text-blue-400 mb-3">Technical Leadership</p>
							<p class="text-white/70 text-sm mb-4">
								Looking for experienced AI/ML engineer to lead technical development and scaling
							</p>
							<a href="/contact" class="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all">
								Apply Now
							</a>
						</div>

						<div class="bg-white/5 rounded-xl p-6 text-center">
							<div class="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
								📢
							</div>
							<h3 class="text-xl font-bold text-white mb-2">Seeking: CMO</h3>
							<p class="text-green-400 mb-3">Marketing & Growth</p>
							<p class="text-white/70 text-sm mb-4">
								Looking for growth hacker with experience in privacy-tech and B2C SaaS marketing
							</p>
							<a href="/contact" class="inline-block px-4 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-all">
								Apply Now
							</a>
						</div>
					</div>
				</div>
			</section>

			<!-- CTA -->
			<section>
				<div class="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-12 text-center">
					<h2 class="text-4xl font-bold text-white mb-4">Ready to Join the Privacy Revolution?</h2>
					<p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
						Let's build the future of AI assistance together - where privacy is a right, not a luxury.
					</p>
					<div class="flex flex-col sm:flex-row gap-4 justify-center">
						<a href="/contact" class="px-8 py-4 bg-white text-violet-600 rounded-xl font-bold text-lg hover:bg-white/90 transition-all shadow-2xl">
							Schedule a Meeting
						</a>
						<a href="/#waitlist" class="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20">
							Join Waitlist
						</a>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>

