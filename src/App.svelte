<script>
	import Router from "svelte-spa-router";
	import routes from "./app/core/router";
	import DefaultLayout from "./app/core/layout/Nav.svelte";

	let layoutComponent = DefaultLayout;
	const routeLoading = (event: any) =>
		(layoutComponent = event.detail.userData.layout);
</script>

<template>
	<section>
		<svelte:component this={layoutComponent}>
			<Router {routes} on:routeLoading={routeLoading} />
		</svelte:component>
	</section>
</template>

<style lang="scss"></style>
