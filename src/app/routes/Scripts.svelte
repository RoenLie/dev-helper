<script>
	import Grunt from "../core/powershell/components/grunt.svelte";
	import OpenSolutions from "../core/powershell/components/open-solutions.svelte";
	import ElasticIndex from "../core/powershell/components/elasticindex.svelte";
	import MigratorUI from "../core/powershell/components/migrator-ui.svelte";
	import DataReplication from "../core/powershell/components/datareplication.svelte";
	import Clean from "../core/powershell/components/clean.svelte";
	import PathSelector from "../core/powershell/components/path-selector.svelte";
	import IISManager from "../core/powershell/components/iis-manager.svelte";

	let output = "";
	const appendOutput = (event: CustomEvent) => (output += event.detail);
</script>

<div class="wrapper">
	<div>
		<PathSelector />
	</div>
	<div class="command-wrapper">
		<Grunt on:output={appendOutput} />
		<hr />
		<OpenSolutions on:output={appendOutput} />
		<hr />
		<ElasticIndex on:output={appendOutput} />
		<hr />
		<MigratorUI on:output={appendOutput} />
		<hr />
		<DataReplication on:output={appendOutput} />
		<hr />
		<Clean on:output={appendOutput} />
		<hr />
		<IISManager on:output={appendOutput} />
		<br />
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
	}
</style>
