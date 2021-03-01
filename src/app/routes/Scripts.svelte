<script>
	import Grunt from "../core/powershell/components/grunt.svelte";
	import OpenSolutions from "../core/powershell/components/open-solutions.svelte";
	import ElasticIndex from "../core/powershell/components/elasticindex.svelte";
	import MigratorUI from "../core/powershell/components/migrator-ui.svelte";
	import DataReplication from "../core/powershell/components/datareplication.svelte";
	import Clean from "../core/powershell/components/clean.svelte";
	import PathSelector from "../core/powershell/components/path-selector.svelte";
	import IISManager from "../core/powershell/components/iis-manager.svelte";

	const actions = [
		Grunt,
		OpenSolutions,
		Clean,
		ElasticIndex,
		DataReplication,
		IISManager,
		MigratorUI,
	];

	let output = "";
	const appendOutput = (event: CustomEvent) =>
		(output += "<br />" + event.detail);
</script>

<div class="wrapper">
	<div>
		<PathSelector />
	</div>
	<div class="command-wrapper">
		{#each actions as action}
			<hr />
			<svelte:component this={action} on:output={appendOutput} />
		{/each}
		<br />
	</div>
	<!--  -->
	<div class="output-wrapper">
		<div class="output-header">
			<div>Shell Output</div>
			<button on:click={() => (output = "")}>Clear</button>
		</div>
		<div class="output-normalize">
			<hr />
			<div class="output-reverse">
				{@html output}
			</div>
			<hr />
		</div>
	</div>
</div>

<style lang="scss">
	hr {
		border: none;
		border-bottom: 2px solid rgba(var(--border-color-1));
	}

	.wrapper {
		height: var(--router-view-height);

		display: grid;

		justify-content: space-between;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr auto;
	}

	.command-wrapper {
		grid-column: 1;
		grid-row: 2;
		@include scrollbar;

		display: grid;
		grid-auto-columns: auto;
		grid-auto-rows: min-content;
		row-gap: 1em;
		margin: 1em;
		padding: 1em;

		overflow: auto;
		box-shadow: 0 0 3px 1px rgba(var(--shadow-1));

		hr {
			border-color: rgba(var(--border-color-2));
		}
	}

	.output-wrapper {
		grid-column: 1;
		grid-row: 3;
		margin: 1em;
		padding: 1em;
		box-shadow: 0 0 3px 1px rgba(var(--shadow-1));
		.output-normalize {
			overflow: auto;
			display: flex;
			flex-direction: column-reverse;
			.output-reverse {
				@include scrollbar;
				display: flex;
				flex-direction: column-reverse;
				height: clamp(5em, 30vh, 700px);
				overflow-y: auto;
			}
		}

		.output-header {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;

			button {
				padding: 0.2em;
				border-radius: 0.2rem;

				background-color: rgba(var(--button-1));
				color: rgba(var(--button-text-1));
				border: 1px solid rgba(var(--shadow-1));

				// lift effect
				box-shadow: rgba(var(--shadow-1), 0.06) 0px 2px 4px,
					rgba(var(--shadow-1), 0.05) 0px 0.5px 1px;
				transition: all 0.2s ease-in-out;

				&:hover {
					background-color: rgba(var(--button-hover-1), 0.3);
					text-shadow: -1px -1px 0 rgba(var(--button-text-invert-1)),
						1px -1px 0 rgba(var(--button-text-invert-1)),
						-1px 1px 0 rgba(var(--button-text-invert-1)),
						1px 1px 0 rgba(var(--button-text-invert-1));

					// lift effect
					box-shadow: rgba(var(--shadow-1), 0.22) 0px 5px 5px,
						rgba(var(--shadow-1), 0.18) 0px 2px 4px;
				}
			}
		}
	}
</style>
