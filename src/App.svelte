<script>
	import Test from "./app/core/test.svelte";

	export let name: string;
</script>

<template lang="pug">
	div.main Hei h1.h1 kakaka {name}
	span.bigone lalala
	Test
	h1 lala
</template>

<style lang="scss">
	.main {
		background-color: black;
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;

		&:hover {
			background-color: pink;
		}
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	@media (min-width: 640px) {
		.main {
			max-width: none;
		}
	}
</style>
