<script>
	import Grunt from "../core/powershell/components/grunt.svelte";
	import OpenSolutions from "../core/powershell/components/open-solutions.svelte";
	import PathBinder from "../core/powershell/components/path-binder.svelte";

	let output = "";
	const appendOutput = (event: CustomEvent) => (output += event.detail);
</script>

<template>
	<div class="wrapper">
		<div class="command-wrapper">
			<PathBinder />
			<hr />
			<Grunt on:output={appendOutput} />
			<hr />
			<OpenSolutions on:output={appendOutput} />
			<hr />
		</div>
		<!--  -->
		<div class="output-wrapper">
			<div>Shell Output</div>
			<div class="output-normalize">
				<hr />
				<div class="output-reverse">
					{@html output}
				</div>
				<hr />
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		align-items: space-between;

		height: var(--router-view-height);
	}

	.command-wrapper {
		display: grid;
		grid-auto-columns: auto;
		row-gap: 1em;
		margin: 1em;
	}

	.output-wrapper {
		margin: 1em;

		.output-normalize {
			overflow: auto;
			display: flex;
			flex-direction: column-reverse;
			.output-reverse {
				display: flex;
				flex-direction: column-reverse;
				height: clamp(5em, 30vh, 700px);
				overflow-y: auto;
			}
		}
	}
</style>
