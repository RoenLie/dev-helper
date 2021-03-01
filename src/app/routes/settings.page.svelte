<script>
    let initiated = false;

    let paths = {
        msBuild: "",
        visualStudio: "",
        cleanup: "",
        base: "",
    };

    $: {
        if (!initiated) {
            paths = JSON.parse(window.localStorage.getItem("paths"));
            initiated = true;
        }
        window.localStorage.setItem("paths", JSON.stringify(paths));
    }
</script>

<div class="wrapper">
    <div>SETTINGS</div>
    <div class="path">
        <label for="">MSBuild path</label>
        <input type="text" bind:value={paths.msBuild} />
    </div>
    <div class="path">
        <label for="">Visual Studio shortcut path</label>
        <input type="text" bind:value={paths.visualStudio} />
    </div>
    <div class="path">
        <label for="">Cleanup tool path</label>
        <input type="text" bind:value={paths.cleanup} />
    </div>
    <div class="path">
        <label for="">Base path</label>
        <input type="text" bind:value={paths.base} />
    </div>
</div>

<style lang="scss">
    .wrapper {
        height: var(--router-view-height);

        display: flex;
        flex-flow: column nowrap;
        padding: 1em;
    }

    .path {
        margin-top: 1em;

        display: grid;
        row-gap: 0.3em;

        input {
            color: rgba(var(--txt-color-1));
            background-color: rgba(var(--input-bg-1));
            border: none;
            border-radius: 0.2em;
            height: 2em;
            padding: 0.2em 0.5em;
            vertical-align: middle;
        }
    }
</style>
