<script lang="ts">
	import type { Todos } from '../todos.svelte';
	import PencilCircleOutline from '~icons/mdi/pencil-circle-outline';

	let { todo, editable }: { todo: Todos; editable?: boolean } = $props();
</script>

<div class={`todo-container ${todo.done && editable ? 'todo-done' : ''}`}>
	{#if editable}
		<input name={`checkbox-${todo.id}`} type="checkbox" bind:checked={todo.done} />
	{/if}
	<div style="display: flex; width: 100%;">
		<h3>{todo.value}</h3>
		{#if editable && !todo.done}
			<button
				style="background: none; border:none; cursor: pointer; display:flex; justify-content:center; align-items:center; margin-left:auto"
				><PencilCircleOutline /></button
			>
		{/if}
	</div>
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
