<script lang="ts">
	import { onMount } from 'svelte';
	import { getTodos } from '../todos.svelte';
	import type { PageLoad } from './$types';
	import Todos from './Todos.svelte';

	let todos = getTodos();

	// Local fetch to spring todo service
	onMount(() => {
		fetch('http://localhost:8080/todos/v1/').then((resp) => {
			return resp.json().then((resp) => todos.setTodos([...resp]));
		});
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome"> TODOS </span>
	</h1>
	<Todos />
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
