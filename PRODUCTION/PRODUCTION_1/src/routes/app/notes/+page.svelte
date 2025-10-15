<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	// State
	let notes: any[] = [];
	let selectedNote: any = null;
	let isEditing = false;
	let searchQuery = '';
	let loading = false;
	let saving = false;
	let sidebarOpen = true;

	// Form data
	let noteTitle = '';
	let noteContent = '';

	onMount(async () => {
		await loadNotes();
	});

	async function loadNotes() {
		loading = true;
		try {
			const url = new URL('/api/notes', window.location.origin);
			if (searchQuery.trim()) {
				url.searchParams.set('search', searchQuery.trim());
			}

			const response = await fetch(url);
			const result = await response.json();
			if (result.success) {
				notes = result.notes;
			}
		} catch (error) {
			console.error('Failed to load notes:', error);
		} finally {
			loading = false;
		}
	}

	async function createNote() {
		isEditing = true;
		selectedNote = null;
		noteTitle = '';
		noteContent = '';
	}

	async function selectNote(note: any) {
		selectedNote = note;
		noteTitle = note.title;
		noteContent = note.content;
		isEditing = false;
	}

	async function saveNote() {
		if (!noteTitle.trim() || !noteContent.trim()) {
			alert('Please enter both title and content');
			return;
		}

		saving = true;
		try {
			let response;
			if (selectedNote) {
				// Update existing note
				response = await fetch(`/api/notes/${selectedNote.id}`, {
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						title: noteTitle.trim(),
						content: noteContent.trim()
					})
				});
			} else {
				// Create new note
				response = await fetch('/api/notes', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						title: noteTitle.trim(),
						content: noteContent.trim()
					})
				});
			}

			const result = await response.json();
			if (result.success) {
				await loadNotes();
				selectedNote = result.note;
				isEditing = false;
			} else {
				alert(result.error || 'Failed to save note');
			}
		} catch (error) {
			console.error('Failed to save note:', error);
			alert('Failed to save note');
		} finally {
			saving = false;
		}
	}

	async function deleteNote(note: any) {
		if (!confirm(`Are you sure you want to delete "${note.title}"?`)) return;

		try {
			const response = await fetch(`/api/notes/${note.id}`, {
				method: 'DELETE'
			});

			if (response.ok) {
				await loadNotes();
				if (selectedNote?.id === note.id) {
					selectedNote = null;
					noteTitle = '';
					noteContent = '';
					isEditing = false;
				}
			} else {
				alert('Failed to delete note');
			}
		} catch (error) {
			console.error('Failed to delete note:', error);
			alert('Failed to delete note');
		}
	}

	function editNote() {
		isEditing = true;
	}

	function cancelEdit() {
		if (selectedNote) {
			noteTitle = selectedNote.title;
			noteContent = selectedNote.content;
		} else {
			noteTitle = '';
			noteContent = '';
		}
		isEditing = false;
	}

	async function handleSearch() {
		await loadNotes();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.ctrlKey || event.metaKey) {
			if (event.key === 's') {
				event.preventDefault();
				if (isEditing) saveNote();
			} else if (event.key === 'n') {
				event.preventDefault();
				createNote();
			}
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
	<title>Notes - AhFai</title>
	<meta name="description" content="Take and organize your notes" />
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="h-screen flex bg-gray-50 dark:bg-gray-900">
	<!-- Sidebar -->
	<div class="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col {sidebarOpen ? '' : 'hidden'}">
		<!-- Header -->
		<div class="p-4 border-b border-gray-200 dark:border-gray-700">
			<div class="flex items-center justify-between mb-4">
				<h1 class="text-xl font-bold text-green-600 dark:text-green-400">Notes</h1>
				<button
					on:click={logout}
					class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
				>
					Logout
				</button>
			</div>
			<button
				on:click={createNote}
				class="btn btn-primary w-full mb-3"
			>
				New Note
			</button>
			
			<!-- Search -->
			<div class="relative">
				<input
					type="text"
					bind:value={searchQuery}
					on:input={handleSearch}
					placeholder="Search notes..."
					class="input pr-8"
				/>
				<svg class="absolute right-2 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
				</svg>
			</div>
		</div>

		<!-- Notes List -->
		<div class="flex-1 overflow-y-auto">
			{#if loading}
				<div class="p-4 text-center text-gray-500 dark:text-gray-400">
					Loading notes...
				</div>
			{:else if notes.length === 0}
				<div class="p-4 text-center text-gray-500 dark:text-gray-400">
					{searchQuery ? 'No notes found' : 'No notes yet. Create your first note!'}
				</div>
			{:else}
				{#each notes as note (note.id)}
					<div
						class="p-3 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 {selectedNote?.id === note.id ? 'bg-green-50 dark:bg-green-900/20' : ''}"
						on:click={() => selectNote(note)}
						role="button"
						tabindex="0"
						on:keydown={(e) => e.key === 'Enter' && selectNote(note)}
					>
						<div class="flex items-start justify-between">
							<div class="flex-1 min-w-0">
								<h3 class="text-sm font-medium text-gray-900 dark:text-white truncate">
									{note.title}
								</h3>
								<p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
									{note.content.slice(0, 100)}{note.content.length > 100 ? '...' : ''}
								</p>
								<p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
									{new Date(note.updatedAt).toLocaleDateString()}
								</p>
							</div>
							<button
								on:click|stopPropagation={() => deleteNote(note)}
								class="text-gray-400 hover:text-red-500 ml-2 flex-shrink-0"
							>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
								</svg>
							</button>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>

	<!-- Main Content Area -->
	<div class="flex-1 flex flex-col">
		<!-- Header -->
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
						{isEditing ? (selectedNote ? 'Edit Note' : 'New Note') : (selectedNote?.title || 'Select a note')}
					</h2>
				</div>
				<div class="flex items-center space-x-2">
					{#if selectedNote && !isEditing}
						<button
							on:click={editNote}
							class="btn btn-secondary text-sm"
						>
							Edit
						</button>
					{/if}
					{#if isEditing}
						<button
							on:click={cancelEdit}
							class="btn btn-secondary text-sm"
						>
							Cancel
						</button>
						<button
							on:click={saveNote}
							disabled={saving}
							class="btn btn-primary text-sm {saving ? 'opacity-50 cursor-not-allowed' : ''}"
						>
							{saving ? 'Saving...' : 'Save'}
						</button>
					{/if}
					<a href="/app" class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
						← Back to App
					</a>
				</div>
			</div>
		</div>

		<!-- Content -->
		<div class="flex-1 overflow-hidden">
			{#if isEditing}
				<!-- Edit Mode -->
				<div class="h-full flex flex-col p-4 space-y-4">
					<input
						type="text"
						bind:value={noteTitle}
						placeholder="Note title..."
						class="input text-lg font-semibold"
					/>
					<textarea
						bind:value={noteContent}
						placeholder="Start writing your note..."
						class="flex-1 resize-none rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
					></textarea>
				</div>
			{:else if selectedNote}
				<!-- View Mode -->
				<div class="h-full overflow-y-auto p-4">
					<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
						{selectedNote.title}
					</h1>
					<div class="prose dark:prose-invert max-w-none">
						<pre class="whitespace-pre-wrap font-sans text-gray-700 dark:text-gray-300">{selectedNote.content}</pre>
					</div>
					<div class="mt-8 text-sm text-gray-500 dark:text-gray-400">
						Created: {new Date(selectedNote.createdAt).toLocaleString()}<br>
						Updated: {new Date(selectedNote.updatedAt).toLocaleString()}
					</div>
				</div>
			{:else}
				<!-- Empty State -->
				<div class="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
					<div class="text-center">
						<svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
						</svg>
						<p class="text-lg mb-2">Select a note to view</p>
						<p class="text-sm">Or create a new note to get started</p>
						<p class="text-xs mt-4">
							Shortcuts: Ctrl+N (new), Ctrl+S (save)
						</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
