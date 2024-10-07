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
		<input placeholder="Walk the dog" type="text" bind:value={todoInput} />
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
	.todo-done {
		text-decoration: line-through;
		text-decoration-color: black;
	}
</style>
