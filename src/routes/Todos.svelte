<script lang="ts">
	type Todos = {
		id: number;
		value: string;
		done: boolean;
	};
	let todos: Todos[] = $state([]);
	let todoInput: string = $state('');

	const handleCreateTodo = () => {
		if (todoInput) {
			todos.push({ id: todos.length, value: todoInput, done: false });
			todoInput = '';
		}
	};
</script>

<section>
	<div class="todos-input-container">
		<input type="text" bind:value={todoInput} />
		<button onclick={handleCreateTodo}>Add</button>
	</div>
	<div class="todos-container">
		{#each todos as todo}
			<div class={`todo-container ${todo.done ? 'todo-done' : ''}`}>
				<input type="checkbox" bind:checked={todo.done} />
				<h3>{todo.value}</h3>
			</div>
		{/each}
	</div>
</section>

<style>
	.todos-container {
		display: flex;
		justify-content: center;
		align-items: start;
		flex-direction: column;
	}
	.todo-container {
		display: flex;
	}
	h3 {
		margin: 6px;
	}

	.todo-done {
		text-decoration: line-through;
	}
</style>
