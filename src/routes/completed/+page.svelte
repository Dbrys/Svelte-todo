<script>
	import { getTodos } from '../../todos.svelte';
	const todos = getTodos();
</script>

<svelte:head>
	<title>Completed</title>
	<meta name="description" content="Completed todos" />
</svelte:head>

<div class="text-column">
	<h1>Completed todos</h1>

	{#each todos.completedTodos as todo}
		<span>{todo.value}</span>
	{/each}
</div>
