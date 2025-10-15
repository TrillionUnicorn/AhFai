<script lang="ts">
	import { onMount } from 'svelte';
	
	// Types
	interface Message {
		id: string;
		text: string;
		sender: 'user' | 'ai';
		timestamp: Date;
	}
	
	interface Note {
		id: string;
		title: string;
		content: string;
		createdAt: Date;
		aiSuggestion?: string;
	}
	
	interface Reminder {
		id: string;
		text: string;
		time: string;
		completed: boolean;
	}
	
	// State
	let messages = $state<Message[]>([]);
	let notes = $state<Note[]>([]);
	let reminders = $state<Reminder[]>([]);
	
	let inputText = $state('');
	let noteTitle = $state('');
	let noteContent = $state('');
	let reminderText = $state('');
	let reminderTime = $state('');
	
	let loading = $state(false);
	let activeTab = $state<'chat' | 'notes' | 'reminders'>('chat');
	
	onMount(() => {
		// Initialize with welcome message
		messages = [{
			id: 'welcome',
			text: "Hi! I'm AhFai, your privacy-first AI assistant. I can help you with notes, reminders, and answer questions. Everything stays on your device. What would you like to do?",
			sender: 'ai',
			timestamp: new Date()
		}];
		
		// Load saved data from localStorage
		const savedNotes = localStorage.getItem('ahfai_notes');
		const savedReminders = localStorage.getItem('ahfai_reminders');
		
		if (savedNotes) {
			notes = JSON.parse(savedNotes);
		}
		
		if (savedReminders) {
			reminders = JSON.parse(savedReminders);
		}
	});
	
	async function sendMessage() {
		if (!inputText.trim() || loading) return;
		
		const userMessage: Message = {
			id: Date.now().toString(),
			text: inputText.trim(),
			sender: 'user',
			timestamp: new Date()
		};
		
		messages = [...messages, userMessage];
		const currentInput = inputText;
		inputText = '';
		loading = true;
		
		// Simulate AI processing
		await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
		
		const aiResponse = generateAIResponse(currentInput);
		messages = [...messages, {
			id: (Date.now() + 1).toString(),
			text: aiResponse,
			sender: 'ai',
			timestamp: new Date()
		}];
		
		loading = false;
	}
	
	function generateAIResponse(input: string): string {
		const lowerInput = input.toLowerCase();
		
		// Note-related responses
		if (lowerInput.includes('note') || lowerInput.includes('write') || lowerInput.includes('remember')) {
			return "I can help you create notes! Switch to the Notes tab to create a new note. I'll provide AI-powered suggestions to help organize your thoughts.";
		}
		
		// Reminder-related responses
		if (lowerInput.includes('remind') || lowerInput.includes('reminder') || lowerInput.includes('schedule')) {
			return "I can set reminders for you! Go to the Reminders tab to create a new reminder. I'll help you stay on top of your tasks.";
		}
		
		// Privacy-related responses
		if (lowerInput.includes('privacy') || lowerInput.includes('data') || lowerInput.includes('secure')) {
			return "Your privacy is my top priority! All your conversations, notes, and reminders are stored locally on your device. I don't send any data to external servers. You have complete control over your information.";
		}
		
		// Help responses
		if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
			return "I can help you with:\n\n📝 Notes - Create and organize notes with AI suggestions\n⏰ Reminders - Set and manage reminders\n💬 Chat - Answer questions and provide assistance\n🔒 Privacy - Everything stays on your device\n\nWhat would you like to try?";
		}
		
		// Greeting responses
		if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
			return "Hello! Great to see you. I'm here to help you stay organized and productive while keeping your data private. What can I help you with today?";
		}
		
		// Default intelligent responses
		const responses = [
			"That's interesting! I'm processing your request locally on your device. How else can I assist you?",
			"I understand. Let me help you with that. Would you like to create a note or set a reminder about this?",
			"Great question! I'm constantly learning to provide better assistance while maintaining your privacy. What else would you like to know?",
			"I'm here to help! Remember, all our conversations stay private on your device. What would you like to do next?",
			"Thanks for sharing! I can help you organize this information. Would you like me to create a note or reminder?"
		];
		
		return responses[Math.floor(Math.random() * responses.length)];
	}
	
	function createNote() {
		if (!noteTitle.trim() || !noteContent.trim()) return;
		
		const aiSuggestion = generateNoteSuggestion(noteContent);
		
		const newNote: Note = {
			id: Date.now().toString(),
			title: noteTitle.trim(),
			content: noteContent.trim(),
			createdAt: new Date(),
			aiSuggestion
		};
		
		notes = [newNote, ...notes];
		localStorage.setItem('ahfai_notes', JSON.stringify(notes));
		
		noteTitle = '';
		noteContent = '';
	}
	
	function generateNoteSuggestion(content: string): string {
		const lowerContent = content.toLowerCase();
		
		if (lowerContent.includes('meeting') || lowerContent.includes('call')) {
			return "💡 Suggestion: Consider adding action items and follow-up dates";
		}
		
		if (lowerContent.includes('idea') || lowerContent.includes('project')) {
			return "💡 Suggestion: Break this down into smaller, actionable steps";
		}
		
		if (lowerContent.includes('learn') || lowerContent.includes('study')) {
			return "💡 Suggestion: Create a learning schedule and set reminders";
		}
		
		return "💡 Suggestion: Add tags or categories to organize this note better";
	}
	
	function deleteNote(id: string) {
		notes = notes.filter(n => n.id !== id);
		localStorage.setItem('ahfai_notes', JSON.stringify(notes));
	}
	
	function createReminder() {
		if (!reminderText.trim() || !reminderTime) return;
		
		const newReminder: Reminder = {
			id: Date.now().toString(),
			text: reminderText.trim(),
			time: reminderTime,
			completed: false
		};
		
		reminders = [newReminder, ...reminders];
		localStorage.setItem('ahfai_reminders', JSON.stringify(reminders));
		
		reminderText = '';
		reminderTime = '';
	}
	
	function toggleReminder(id: string) {
		reminders = reminders.map(r => 
			r.id === id ? { ...r, completed: !r.completed } : r
		);
		localStorage.setItem('ahfai_reminders', JSON.stringify(reminders));
	}
	
	function deleteReminder(id: string) {
		reminders = reminders.filter(r => r.id !== id);
		localStorage.setItem('ahfai_reminders', JSON.stringify(reminders));
	}
	
	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	}
</script>

<svelte:head>
	<title>AhFai App - Your Privacy-First AI Assistant</title>
	<meta name="description" content="Use AhFai to manage notes, reminders, and get AI assistance - all while maintaining complete privacy." />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<!-- Header -->
	<div class="mb-8 text-center">
		<h1 class="text-4xl font-bold text-white mb-2">Welcome to AhFai</h1>
		<p class="text-white/70">Your privacy-first AI personal assistant</p>
		<div class="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400 rounded-full text-green-400 text-sm">
			<div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
			<span>All data processed locally on your device</span>
		</div>
	</div>
	
	<!-- Tabs -->
	<div class="flex justify-center mb-8">
		<div class="inline-flex bg-white/10 backdrop-blur-lg rounded-xl p-1 border border-white/20">
			<button
				onclick={() => activeTab = 'chat'}
				class="px-6 py-3 rounded-lg font-semibold transition-all {activeTab === 'chat' ? 'bg-violet-500 text-white' : 'text-white/70 hover:text-white'}"
			>
				💬 AI Chat
			</button>
			<button
				onclick={() => activeTab = 'notes'}
				class="px-6 py-3 rounded-lg font-semibold transition-all {activeTab === 'notes' ? 'bg-violet-500 text-white' : 'text-white/70 hover:text-white'}"
			>
				📝 Notes ({notes.length})
			</button>
			<button
				onclick={() => activeTab = 'reminders'}
				class="px-6 py-3 rounded-lg font-semibold transition-all {activeTab === 'reminders' ? 'bg-violet-500 text-white' : 'text-white/70 hover:text-white'}"
			>
				⏰ Reminders ({reminders.filter(r => !r.completed).length})
			</button>
		</div>
	</div>

	<!-- Content -->
	<div class="max-w-6xl mx-auto">
		{#if activeTab === 'chat'}
			<!-- AI Chat Tab -->
			<div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
				<div class="h-[600px] flex flex-col">
					<!-- Messages -->
					<div class="flex-1 overflow-y-auto p-6 space-y-4">
						{#each messages as message}
							<div class="flex {message.sender === 'user' ? 'justify-end' : 'justify-start'}">
								<div class="max-w-[80%]">
									<div class="flex items-start gap-3 {message.sender === 'user' ? 'flex-row-reverse' : ''}">
										<div class="w-8 h-8 rounded-full bg-gradient-to-br {message.sender === 'user' ? 'from-blue-500 to-cyan-500' : 'from-violet-500 to-purple-600'} flex items-center justify-center flex-shrink-0">
											<span class="text-white text-sm">{message.sender === 'user' ? '👤' : '🤖'}</span>
										</div>
										<div>
											<div class="px-4 py-3 rounded-2xl {message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white/20 text-white'}">
												<p class="whitespace-pre-wrap">{message.text}</p>
											</div>
											<p class="text-xs text-white/50 mt-1 {message.sender === 'user' ? 'text-right' : ''}">
												{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
											</p>
										</div>
									</div>
								</div>
							</div>
						{/each}

						{#if loading}
							<div class="flex justify-start">
								<div class="flex items-start gap-3">
									<div class="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
										<span class="text-white text-sm">🤖</span>
									</div>
									<div class="px-4 py-3 rounded-2xl bg-white/20">
										<div class="flex gap-1">
											<div class="w-2 h-2 bg-white/60 rounded-full animate-bounce" style="animation-delay: 0s;"></div>
											<div class="w-2 h-2 bg-white/60 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
											<div class="w-2 h-2 bg-white/60 rounded-full animate-bounce" style="animation-delay: 0.4s;"></div>
										</div>
									</div>
								</div>
							</div>
						{/if}
					</div>

					<!-- Input -->
					<div class="border-t border-white/20 p-4">
						<div class="flex gap-3">
							<textarea
								bind:value={inputText}
								onkeydown={handleKeyPress}
								placeholder="Ask me anything or tell me what you need help with..."
								class="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
								rows="2"
								disabled={loading}
							></textarea>
							<button
								onclick={sendMessage}
								disabled={loading || !inputText.trim()}
								class="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-semibold hover:from-violet-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{#if loading}
									<svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
								{:else}
									Send
								{/if}
							</button>
						</div>
					</div>
				</div>
			</div>
		{:else if activeTab === 'notes'}
			<!-- Notes Tab -->
			<div class="grid md:grid-cols-2 gap-6">
				<!-- Create Note -->
				<div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
					<h2 class="text-2xl font-bold text-white mb-4">Create New Note</h2>
					<div class="space-y-4">
						<div>
							<label for="noteTitle" class="block text-white font-semibold mb-2">Title</label>
							<input
								type="text"
								id="noteTitle"
								bind:value={noteTitle}
								placeholder="Note title..."
								class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500"
							/>
						</div>
						<div>
							<label for="noteContent" class="block text-white font-semibold mb-2">Content</label>
							<textarea
								id="noteContent"
								bind:value={noteContent}
								placeholder="Write your note here..."
								rows="8"
								class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
							></textarea>
						</div>
						<button
							onclick={createNote}
							disabled={!noteTitle.trim() || !noteContent.trim()}
							class="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg font-semibold hover:from-violet-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Create Note
						</button>
					</div>
				</div>

				<!-- Notes List -->
				<div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
					<h2 class="text-2xl font-bold text-white mb-4">Your Notes ({notes.length})</h2>
					<div class="space-y-4 max-h-[500px] overflow-y-auto">
						{#if notes.length === 0}
							<div class="text-center py-12 text-white/60">
								<svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
								</svg>
								<p>No notes yet. Create your first note!</p>
							</div>
						{:else}
							{#each notes as note}
								<div class="bg-white/10 rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-all">
									<div class="flex justify-between items-start mb-2">
										<h3 class="text-lg font-semibold text-white">{note.title}</h3>
										<button
											onclick={() => deleteNote(note.id)}
											class="text-red-400 hover:text-red-300 transition-colors"
										>
											<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
											</svg>
										</button>
									</div>
									<p class="text-white/80 text-sm mb-2 line-clamp-3">{note.content}</p>
									{#if note.aiSuggestion}
										<div class="mt-2 p-2 bg-violet-500/20 border border-violet-400/30 rounded text-sm text-violet-200">
											{note.aiSuggestion}
										</div>
									{/if}
									<p class="text-xs text-white/50 mt-2">
										{note.createdAt.toLocaleDateString()} at {note.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
									</p>
								</div>
							{/each}
						{/if}
					</div>
				</div>
			</div>
		{:else if activeTab === 'reminders'}
			<!-- Reminders Tab -->
			<div class="grid md:grid-cols-2 gap-6">
				<!-- Create Reminder -->
				<div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
					<h2 class="text-2xl font-bold text-white mb-4">Create New Reminder</h2>
					<div class="space-y-4">
						<div>
							<label for="reminderText" class="block text-white font-semibold mb-2">What do you want to be reminded about?</label>
							<input
								type="text"
								id="reminderText"
								bind:value={reminderText}
								placeholder="e.g., Call mom, Buy groceries..."
								class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500"
							/>
						</div>
						<div>
							<label for="reminderTime" class="block text-white font-semibold mb-2">When?</label>
							<input
								type="datetime-local"
								id="reminderTime"
								bind:value={reminderTime}
								class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
							/>
						</div>
						<button
							onclick={createReminder}
							disabled={!reminderText.trim() || !reminderTime}
							class="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg font-semibold hover:from-violet-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Create Reminder
						</button>
					</div>
				</div>

				<!-- Reminders List -->
				<div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
					<h2 class="text-2xl font-bold text-white mb-4">Your Reminders ({reminders.length})</h2>
					<div class="space-y-3 max-h-[500px] overflow-y-auto">
						{#if reminders.length === 0}
							<div class="text-center py-12 text-white/60">
								<svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
								</svg>
								<p>No reminders yet. Create your first reminder!</p>
							</div>
						{:else}
							{#each reminders as reminder}
								<div class="bg-white/10 rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-all {reminder.completed ? 'opacity-60' : ''}">
									<div class="flex items-start gap-3">
										<button
											onclick={() => toggleReminder(reminder.id)}
											class="mt-1 flex-shrink-0"
										>
											<div class="w-5 h-5 rounded border-2 {reminder.completed ? 'bg-green-500 border-green-500' : 'border-white/40'} flex items-center justify-center">
												{#if reminder.completed}
													<svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
														<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
													</svg>
												{/if}
											</div>
										</button>
										<div class="flex-1">
											<p class="text-white {reminder.completed ? 'line-through' : ''}">{reminder.text}</p>
											<p class="text-sm text-white/60 mt-1">
												{new Date(reminder.time).toLocaleDateString()} at {new Date(reminder.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
											</p>
										</div>
										<button
											onclick={() => deleteReminder(reminder.id)}
											class="text-red-400 hover:text-red-300 transition-colors flex-shrink-0"
										>
											<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
											</svg>
										</button>
									</div>
								</div>
							{/each}
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

