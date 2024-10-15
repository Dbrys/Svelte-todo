<script lang="ts">
	import type { Todos } from '../todos.svelte';
	import PencilCircleOutline from '~icons/mdi/pencil-circle-outline';
	import Check from '~icons/mdi/check';

	let editing = $state(false);
	let todoEditInput = $state('');
	let {
		todo,
		editable,
		selectable,
		updateTodo
	}: {
		todo: Todos;
		editable?: boolean;
		selectable?: boolean;
		updateTodo?: (id: number, todo: Todos) => void;
	} = $props();

	function handleButtonClick(todo: Todos) {
		if (editing) {
			updateTodo && updateTodo(todo.id, { ...todo, value: todoEditInput });
		} else {
			todoEditInput = todo.value;
		}
		editing = !editing;
	}
</script>

<div class="todo-container" class:todo-done={todo.done && editable}>
	{#if selectable && !editing}
		<input
			name={`checkbox-${todo.id}`}
			type="checkbox"
			onchange={() => updateTodo && updateTodo(todo.id, { ...todo, done: !todo.done })}
			checked={todo.done}
		/>
	{/if}
	<div class:editable-wrapper={editable}>
		{#if editing}
			<input
				style="margin:6px"
				type="text"
				value={todoEditInput}
				oninput={(ev: Event) => (todoEditInput = (ev.target as HTMLInputElement).value)}
			/>
		{:else}
			<h3>{todo.value}</h3>
		{/if}
		{#if editable && !todo.done}
			<button onclick={() => handleButtonClick(todo)} class="edit-button">
				{#if editing}
					<Check style="background-color:#0fa4af; color: white" />
				{:else}
					<PencilCircleOutline />
				{/if}
			</button>
		{/if}
	</div>
</div>

<style>
	.todo-container {
		display: flex;
		width: 100%;
		box-sizing: border-box;
		margin: 2px;
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

	.editable-wrapper {
		display: flex;
		width: 100%;
	}

	.edit-button {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: auto;
		background: none;
		border: none;
		cursor: pointer;
	}

	h3 {
		margin: 6px;
	}
</style>
