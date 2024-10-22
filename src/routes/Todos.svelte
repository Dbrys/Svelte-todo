<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import { reduced_motion } from '../utils/reduced-motion';
	import { getTodos } from '../todos.svelte';
	import TodoCard from '../components/TodoCard.svelte';

	const todos = getTodos();
	let todoInput: HTMLInputElement;
	async function handleAddTodo() {
		if (todoInput.value.trim()) {
			await todos.add(todoInput.value);
			todoInput.value = '';
			todoInput.focus();
		}
	}
</script>

<section>
	<form onsubmit={handleAddTodo} class="todos-input-container">
		<!-- svelte-ignore a11y_autofocus -->
		<input
			name="todo-input"
			placeholder="Walk the dog"
			type="text"
			autofocus
			bind:this={todoInput}
		/>
		<button>Add</button>
	</form>
	<div class="todos-container">
		{#each todos.get as todo}
			<TodoCard selectable editable {todo} updateTodo={todos.update} />
		{/each}
	</div>
	{#if todos.todosComplete}
		<div
			style="position: absolute; left: 50%; top: 30%"
			use:confetti={{
				particleCount: $reduced_motion ? 0 : undefined,
				force: 0.7,
				stageWidth: window.innerWidth,
				stageHeight: window.innerHeight,
				colors: ['#ff3e00', '#40b3ff', '#676778']
			}}
		></div>
	{/if}
</section>

<style>
	section {
		border: 2px #0fa4af solid;
		padding: 40px;
	}

	.todos-container {
		display: flex;
		justify-content: center;
		align-items: start;
		flex-direction: column;
	}
	.todos-input-container {
		margin-bottom: 8px;
	}
	.todos-input-container input {
		padding: 4px;
		font-size: larger;
	}
	.todos-input-container button {
		background-color: #0fa4af;
		padding: 4px 10px 4px 10px;
		font-size: larger;
		color: white;
		border-radius: 10%;
		opacity: 80%;
	}

	.todos-input-container button:hover {
		opacity: 100%;
		cursor: pointer;
	}
</style>
