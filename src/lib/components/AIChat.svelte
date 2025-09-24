<script lang="ts">
	import { onMount } from 'svelte';
	
	let messages = $state<Array<{id: string, text: string, sender: 'user' | 'ai', timestamp: Date}>>([]);
	let inputText = $state('');
	let loading = $state(false);
	let chatContainer: HTMLElement;

	onMount(() => {
		// Add welcome message
		messages = [{
			id: 'welcome',
			text: "Hi! I'm your personal AI assistant. I can help you with notes, reminders, finding deals, and answering questions. What would you like to do today?",
			sender: 'ai',
			timestamp: new Date()
		}];
	});

	async function sendMessage() {
		if (!inputText.trim() || loading) return;

		const userMessage = {
			id: Date.now().toString(),
			text: inputText.trim(),
			sender: 'user' as const,
			timestamp: new Date()
		};

		messages = [...messages, userMessage];
		const currentInput = inputText;
		inputText = '';
		loading = true;

		// Simulate AI response
		setTimeout(() => {
			const aiResponse = generateAIResponse(currentInput);
			messages = [...messages, {
				id: (Date.now() + 1).toString(),
				text: aiResponse,
				sender: 'ai',
				timestamp: new Date()
			}];
			loading = false;
			
			// Scroll to bottom
			setTimeout(() => {
				if (chatContainer) {
					chatContainer.scrollTop = chatContainer.scrollHeight;
				}
			}, 100);
		}, 1000 + Math.random() * 2000);
	}

	function generateAIResponse(input: string): string {
		const lowerInput = input.toLowerCase();
		
		if (lowerInput.includes('note') || lowerInput.includes('remember')) {
			return "I can help you create and manage notes! You can say things like 'Create a note about my meeting tomorrow' or 'Remind me to call mom at 3pm'. Would you like me to create a note for you?";
		}
		
		if (lowerInput.includes('deal') || lowerInput.includes('discount') || lowerInput.includes('coupon')) {
			return "I'm constantly scanning for local deals and discounts! I found some great offers nearby - check the deals section. I can also set up alerts for specific products or stores you're interested in.";
		}
		
		if (lowerInput.includes('whatsapp') || lowerInput.includes('telegram') || lowerInput.includes('message')) {
			return "I can help you manage your WhatsApp and Telegram messages! I can draft replies, schedule messages, and even help you organize your chats. What messaging task would you like help with?";
		}
		
		if (lowerInput.includes('schedule') || lowerInput.includes('calendar') || lowerInput.includes('appointment')) {
			return "I can help you manage your schedule! I can create reminders, suggest optimal meeting times, and help you stay organized. What would you like to schedule?";
		}
		
		if (lowerInput.includes('weather')) {
			return "The weather today is partly cloudy with a high of 72°F. Perfect weather for going out to check those local deals I found! Would you like me to suggest some nearby stores with current promotions?";
		}
		
		if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
			return "Hello! Great to see you again. I've been working in the background to find new deals and organize your notes. Is there anything specific I can help you with today?";
		}
		
		// Default responses
		const responses = [
			"That's interesting! I'm learning more about your preferences to provide better assistance. Can you tell me more about what you'd like help with?",
			"I understand! Let me think about how I can help you with that. In the meantime, have you checked out the new deals I found in your area?",
			"Great question! I'm constantly improving my abilities. Right now I'm best at helping with notes, reminders, finding deals, and managing messages. What would you like to try?",
			"I'm here to help! While I work on that, would you like me to show you some personalized recommendations based on your interests?",
			"Thanks for sharing that with me! I'm building a better understanding of your needs. Is there a specific task I can help you with right now?"
		];
		
		return responses[Math.floor(Math.random() * responses.length)];
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	}
</script>

<div class="chat-container">
	<div class="messages" bind:this={chatContainer}>
		{#each messages as message}
			<div class="message {message.sender}">
				<div class="message-content">
					<div class="message-text">{message.text}</div>
					<div class="message-time">
						{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
					</div>
				</div>
			</div>
		{/each}
		
		{#if loading}
			<div class="message ai">
				<div class="message-content">
					<div class="typing-indicator">
						<div class="typing-dot"></div>
						<div class="typing-dot"></div>
						<div class="typing-dot"></div>
					</div>
				</div>
			</div>
		{/if}
	</div>
	
	<div class="chat-input">
		<div class="input-group">
			<textarea
				bind:value={inputText}
				onkeydown={handleKeyPress}
				placeholder="Ask me anything or tell me what you need help with..."
				class="form-textarea"
				rows="2"
				disabled={loading}
			></textarea>
			<button
				onclick={sendMessage}
				disabled={loading || !inputText.trim()}
				class="btn btn-primary send-btn"
			>
				{#if loading}
					<div class="loading"></div>
				{:else}
					📤
				{/if}
			</button>
		</div>
	</div>
</div>

<style>
	.chat-container {
		display: flex;
		flex-direction: column;
		height: 500px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.75rem;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.05);
	}

	.messages {
		flex: 1;
		overflow-y: auto;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.message {
		display: flex;
		max-width: 80%;
	}

	.message.user {
		align-self: flex-end;
	}

	.message.ai {
		align-self: flex-start;
	}

	.message-content {
		background: rgba(255, 255, 255, 0.9);
		padding: 0.75rem 1rem;
		border-radius: 1rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.message.user .message-content {
		background: #3b82f6;
		color: white;
		border-bottom-right-radius: 0.25rem;
	}

	.message.ai .message-content {
		border-bottom-left-radius: 0.25rem;
	}

	.message-text {
		line-height: 1.5;
		margin-bottom: 0.25rem;
	}

	.message-time {
		font-size: 0.75rem;
		opacity: 0.7;
	}

	.message.user .message-time {
		text-align: right;
	}

	.typing-indicator {
		display: flex;
		gap: 0.25rem;
		align-items: center;
		padding: 0.5rem 0;
	}

	.typing-dot {
		width: 0.5rem;
		height: 0.5rem;
		background: #64748b;
		border-radius: 50%;
		animation: typing 1.4s infinite ease-in-out;
	}

	.typing-dot:nth-child(1) { animation-delay: -0.32s; }
	.typing-dot:nth-child(2) { animation-delay: -0.16s; }

	@keyframes typing {
		0%, 80%, 100% {
			transform: scale(0.8);
			opacity: 0.5;
		}
		40% {
			transform: scale(1);
			opacity: 1;
		}
	}

	.chat-input {
		padding: 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.05);
	}

	.input-group {
		display: flex;
		gap: 0.75rem;
		align-items: flex-end;
	}

	.input-group .form-textarea {
		flex: 1;
		resize: none;
		min-height: auto;
	}

	.send-btn {
		padding: 0.75rem;
		min-width: 3rem;
		height: fit-content;
	}

	/* Scrollbar styling */
	.messages::-webkit-scrollbar {
		width: 0.5rem;
	}

	.messages::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 0.25rem;
	}

	.messages::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.3);
		border-radius: 0.25rem;
	}

	.messages::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.5);
	}

	@media (max-width: 640px) {
		.chat-container {
			height: 400px;
		}
		
		.message {
			max-width: 90%;
		}
		
		.input-group {
			flex-direction: column;
			gap: 0.5rem;
		}
		
		.send-btn {
			align-self: flex-end;
		}
	}
</style>
