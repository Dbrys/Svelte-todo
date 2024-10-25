<script lang="ts">
	import { getTodos, HOST } from '../todos.svelte';
	import Todos from './Todos.svelte';

	let todos = getTodos();

	//TODO: Move to onMount
	async function fetchTodos() {
		const res = await fetch(`${HOST}/todos/v1/`);
		const existingTodos = await res.json();

		todos.setTodos([...existingTodos]);
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome"> TODOS </span>
	</h1>
	{#await fetchTodos()}
		<p>...loading</p>
	{:then}
		<Todos />
	{/await}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		font-size: larger;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		width: 100%;
		height: 0;
		padding-bottom: 50px;
	}
</style>
