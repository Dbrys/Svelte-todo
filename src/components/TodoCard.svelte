<script lang="ts">
	import type { Todos } from '../todos.svelte';
	import PencilCircleOutline from '~icons/mdi/pencil-circle-outline';

	let { todo, editable, selectable }: { todo: Todos; editable?: boolean; selectable?: boolean } =
		$props();
</script>

<div class="todo-container" class:todo-done={todo.done && editable}>
	{#if selectable}
		<input name={`checkbox-${todo.id}`} type="checkbox" bind:checked={todo.done} />
	{/if}
	<div class:editable-wrapper={editable}>
		<h3>{todo.value}</h3>
		{#if editable && !todo.done}
			<button class="edit-button"><PencilCircleOutline /></button>
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
