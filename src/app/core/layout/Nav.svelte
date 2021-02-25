<script>
	interface route {
		label: string;
		path: string;
	}

	import { push, pop, replace, link } from "svelte-spa-router";
	import routess from "../routes.json";

	let routes: route[] = routess;
</script>

<template>
	<div class="wrapper">
		{#each routes as route}
			<nav on:click={() => push(route.path)}>{route.label}</nav>
		{/each}
	</div>
	<slot />
</template>

<style lang="scss">
	.wrapper {
		background-color: rgba(var(--nav-bg-1));
		color: rgba(var(--txt-color-1));

		border-bottom: 2px solid rgba(var(--border-burg-1));
		height: var(--nav-top-height);

		display: grid;
		column-gap: 1em;

		grid-auto-columns: min-content;
		> * {
			grid-row: 1;

			height: 100%;
			padding: 1em;
			white-space: nowrap;

			cursor: pointer;

			&:hover {
				background-color: rgba(var(--bg-highlight-color-1));
			}
		}

		& ~ * {
			height: var(--router-view-height);
		}
	}
</style>
