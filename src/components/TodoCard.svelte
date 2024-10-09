<script lang="ts">
	import type { Todos } from '../todos.svelte';

	let { todo, editable }: { todo: Todos; editable?: boolean } = $props();
</script>

<div class={`todo-container ${todo.done && editable ? 'todo-done' : ''}`}>
	{#if editable}
		<input name={`checkbox-${todo.id}`} type="checkbox" bind:checked={todo.done} />
	{/if}
	<h3>{todo.value}</h3>
</div>

<style>
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

	h3 {
		margin: 6px;
	}
</style>
