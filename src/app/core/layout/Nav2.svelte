<script>
    import { pop } from "svelte-spa-router";
</script>

<template>
    <div>example of a different layout</div>
    <button on:click={() => pop()}>GO BACK</button>
    <slot />
</template>
