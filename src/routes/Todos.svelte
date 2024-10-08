<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import { reduced_motion } from '../utils/reduced-motion';

	type Todos = {
		id: number;
		value: string;
		done: boolean;
	};
	let todos: Todos[] = $state([]);
	let todoInput: HTMLInputElement;
	let completedAllTodos = $derived(todos.length && todos.every((todo) => todo.done));

	const handleCreateTodo = () => {
		if (todoInput.value.trim()) {
			todos.push({ id: todos.length, value: todoInput.value, done: false });
			todoInput.value = '';
			todoInput.focus();
		}
	};
</script>

<section>
	<div class="todos-input-container">
		<!-- svelte-ignore a11y_autofocus -->
		<input
			name="todo-input"
			placeholder="Walk the dog"
			type="text"
			autofocus
			bind:this={todoInput}
		/>
		<button onclick={handleCreateTodo}>Add</button>
	</div>
	<div class="todos-container">
		{#each todos as todo}
			<div class={`todo-container ${todo.done ? 'todo-done' : ''}`}>
				<input name={`checkbox-${todo.id}`} type="checkbox" bind:checked={todo.done} />
				<h3>{todo.value}</h3>
			</div>
		{/each}
	</div>
	{#if completedAllTodos}
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

	h3 {
		margin: 6px;
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
		padding: 2px 10px 2px 10px;
		font-size: larger;
		color: white;
		border-radius: 10%;
	}

	.todos-input-container button:hover {
		opacity: 80%;
		cursor: pointer;
	}

	.todo-container {
		display: flex;
		margin: 2px;
		width: 100%;
		padding-left: 4px;
		border: 2px#0fa4af solid;
		background-color: #fff;
	}

	.todo-container.todo-done input {
		accent-color: #0fa4af;
	}
	.todo-done {
		text-decoration: line-through;
		text-decoration-color: black;
	}
</style>
