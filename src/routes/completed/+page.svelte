<script>
	import { getTodos } from '../../todos.svelte';
	import TodoCard from '../../components/TodoCard.svelte';
	const todos = getTodos();
</script>

<svelte:head>
	<title>Completed</title>
	<meta name="description" content="Completed todos" />
</svelte:head>

<div class="text-column">
	<h1>Completed todos</h1>

	{#if todos.todosComplete}
		<section>	
			{#each todos.completedTodos as todo}
				<TodoCard {todo} />
			{/each}
		</section>
	{/if}
</div>

<style>
	section {
		display: flex;
		justify-content: flex-start;
		border: 2px #0fa4af solid;
		padding: 20px;
	}
</style>
