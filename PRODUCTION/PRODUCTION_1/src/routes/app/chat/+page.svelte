<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	// State
	let chats: any[] = [];
	let currentChat: any = null;
	let messages: any[] = [];
	let newMessage = '';
	let loading = false;
	let aiStatus: any = null;
	let sidebarOpen = true;

	// DOM references
	let messagesContainer: HTMLElement;
	let messageInput: HTMLTextAreaElement;

	onMount(async () => {
		await loadChats();
		await checkAIStatus();
	});

	afterUpdate(() => {
		// Auto-scroll to bottom when new messages arrive
		if (messagesContainer) {
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
	});

	async function loadChats() {
		try {
			const response = await fetch('/api/chats');
			const result = await response.json();
			if (result.success) {
				chats = result.chats;
			}
		} catch (error) {
			console.error('Failed to load chats:', error);
		}
	}

	async function checkAIStatus() {
		try {
			const response = await fetch('/api/ai/status');
			aiStatus = await response.json();
		} catch (error) {
			console.error('Failed to check AI status:', error);
			aiStatus = { available: false, error: 'Failed to connect to AI service' };
		}
	}

	async function createNewChat() {
		try {
			const response = await fetch('/api/chats', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title: 'New Chat' })
			});
			const result = await response.json();
			if (result.success) {
				chats = [result.chat, ...chats];
				await selectChat(result.chat.id);
			}
		} catch (error) {
			console.error('Failed to create chat:', error);
		}
	}

	async function selectChat(chatId: number) {
		try {
			const response = await fetch(`/api/chats/${chatId}`);
			const result = await response.json();
			if (result.success) {
				currentChat = result.chat;
				messages = result.messages;
			}
		} catch (error) {
			console.error('Failed to load chat:', error);
		}
	}

	async function sendMessage() {
		if (!newMessage.trim() || loading) return;

		const messageText = newMessage.trim();
		newMessage = '';
		loading = true;

		// Add user message to UI immediately
		const userMessage = {
			role: 'user',
			content: messageText,
			createdAt: new Date()
		};
		messages = [...messages, userMessage];

		try {
			const response = await fetch('/api/ai/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					message: messageText,
					chatId: currentChat?.id
				})
			});

			const result = await response.json();
			if (result.success) {
				// Add AI response to UI
				const aiMessage = {
					role: 'assistant',
					content: result.response,
					createdAt: new Date()
				};
				messages = [...messages, aiMessage];

				// Update current chat ID if this was a new chat
				if (!currentChat && result.chatId) {
					await loadChats();
					await selectChat(result.chatId);
				}
			} else {
				// Add error message
				const errorMessage = {
					role: 'assistant',
					content: `Error: ${result.error}`,
					createdAt: new Date(),
					isError: true
				};
				messages = [...messages, errorMessage];
			}
		} catch (error) {
			console.error('Failed to send message:', error);
			const errorMessage = {
				role: 'assistant',
				content: 'Error: Failed to send message. Please try again.',
				createdAt: new Date(),
				isError: true
			};
			messages = [...messages, errorMessage];
		} finally {
			loading = false;
		}
	}

	async function deleteChat(chatId: number) {
		if (!confirm('Are you sure you want to delete this chat?')) return;

		try {
			const response = await fetch(`/api/chats/${chatId}`, {
				method: 'DELETE'
			});
			if (response.ok) {
				chats = chats.filter(c => c.id !== chatId);
				if (currentChat?.id === chatId) {
					currentChat = null;
					messages = [];
				}
			}
		} catch (error) {
			console.error('Failed to delete chat:', error);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	}

	async function logout() {
		try {
			const response = await fetch('/api/auth/logout', { method: 'POST' });
			if (response.ok) {
				goto('/auth/login');
			}
		} catch (error) {
			console.error('Logout error:', error);
		}
	}
</script>

<svelte:head>
	<title>Chat - AhFai</title>
	<meta name="description" content="Chat with your AI assistant" />
</svelte:head>

<div class="h-screen flex bg-gray-50 dark:bg-gray-900">
	<!-- Sidebar -->
	<div class="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col {sidebarOpen ? '' : 'hidden'}">
		<!-- Header -->
		<div class="p-4 border-b border-gray-200 dark:border-gray-700">
			<div class="flex items-center justify-between mb-4">
				<h1 class="text-xl font-bold text-violet-600 dark:text-violet-400">AhFai</h1>
				<button
					on:click={logout}
					class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
				>
					Logout
				</button>
			</div>
			<button
				on:click={createNewChat}
				class="btn btn-primary w-full"
			>
				New Chat
			</button>
		</div>

		<!-- AI Status -->
		{#if aiStatus}
			<div class="p-4 border-b border-gray-200 dark:border-gray-700">
				<div class="flex items-center space-x-2">
					<div class="w-2 h-2 rounded-full {aiStatus.available ? 'bg-green-500' : 'bg-red-500'}"></div>
					<span class="text-sm text-gray-600 dark:text-gray-400">
						{aiStatus.available ? 'AI Online' : 'AI Offline'}
					</span>
				</div>
				{#if aiStatus.error}
					<p class="text-xs text-red-600 dark:text-red-400 mt-1">{aiStatus.error}</p>
				{/if}
			</div>
		{/if}

		<!-- Chat List -->
		<div class="flex-1 overflow-y-auto">
			{#each chats as chat (chat.id)}
				<div
					class="p-3 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 {currentChat?.id === chat.id ? 'bg-violet-50 dark:bg-violet-900/20' : ''}"
					on:click={() => selectChat(chat.id)}
					role="button"
					tabindex="0"
					on:keydown={(e) => e.key === 'Enter' && selectChat(chat.id)}
				>
					<div class="flex items-center justify-between">
						<div class="flex-1 min-w-0">
							<p class="text-sm font-medium text-gray-900 dark:text-white truncate">
								{chat.title}
							</p>
							<p class="text-xs text-gray-500 dark:text-gray-400">
								{new Date(chat.updatedAt).toLocaleDateString()}
							</p>
						</div>
						<button
							on:click|stopPropagation={() => deleteChat(chat.id)}
							class="text-gray-400 hover:text-red-500 ml-2"
						>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
							</svg>
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Main Chat Area -->
	<div class="flex-1 flex flex-col">
		<!-- Chat Header -->
		<div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-3">
					<button
						on:click={() => sidebarOpen = !sidebarOpen}
						class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</button>
					<h2 class="text-lg font-semibold text-gray-900 dark:text-white">
						{currentChat?.title || 'Select a chat or start a new one'}
					</h2>
				</div>
				<a href="/app" class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
					← Back to App
				</a>
			</div>
		</div>

		<!-- Messages -->
		<div
			bind:this={messagesContainer}
			class="flex-1 overflow-y-auto p-4 space-y-4"
		>
			{#if messages.length === 0}
				<div class="text-center text-gray-500 dark:text-gray-400 mt-8">
					<svg class="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
					</svg>
					<p>Start a conversation with your AI assistant</p>
				</div>
			{/if}

			{#each messages as message (message.id || Math.random())}
				<div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
					<div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg {
						message.role === 'user' 
							? 'bg-violet-600 text-white' 
							: message.isError
								? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
								: 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
					}">
						<p class="text-sm whitespace-pre-wrap">{message.content}</p>
					</div>
				</div>
			{/each}

			{#if loading}
				<div class="flex justify-start">
					<div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700">
						<div class="flex space-x-1">
							<div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
							<div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
							<div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Message Input -->
		<div class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
			<div class="flex space-x-3">
				<textarea
					bind:this={messageInput}
					bind:value={newMessage}
					on:keydown={handleKeydown}
					placeholder="Type your message..."
					class="flex-1 resize-none rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
					rows="1"
					disabled={loading || !aiStatus?.available}
				></textarea>
				<button
					on:click={sendMessage}
					disabled={loading || !newMessage.trim() || !aiStatus?.available}
					class="btn btn-primary px-4 py-2 {loading || !newMessage.trim() || !aiStatus?.available ? 'opacity-50 cursor-not-allowed' : ''}"
				>
					{#if loading}
						<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
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
