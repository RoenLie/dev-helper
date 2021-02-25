<script>
    import { pwsGruntBuild } from "../core/powershell/grunt.ps";
    import { pwsInvoke } from "../core/powershell/invoke";
</script>

<template>
    <div>HOME ROUTE</div>

    <button on:click={() => pwsInvoke(pwsGruntBuild)}> TESTSCRIPT1 </button>
</template>

<style lang="scss"></style>
