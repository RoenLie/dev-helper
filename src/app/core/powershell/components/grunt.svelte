<script>
    import { createEventDispatcher } from "svelte";

    import pwsConfig from "../../config/powershell.json";
    import type NodePowershell from "node-powershell";
    const shell = require("node-powershell");

    const dispatch = createEventDispatcher();
    let output = "";
    let force = false;
    let build = 1;

    enum Grunts {
        build = "build",
        watch = "watch",
    }

    const cleanOutput = (input: string) =>
        input
            .replace(/\[39m..\[94m/g, "<br />")
            .replace(/\[24m|\[36m|\[94m|\[39m|\[35m/g, "")
            .replace(/\[96m|\[4m|\[32m/g, "<br />")
            .replace(/%./g, "%<br />");

    const grunt = (method: Grunts = Grunts.build, force: boolean) => {
        const ps: NodePowershell = new shell({
            executionPolicy: "Bypass",
            noProfile: true,
        });

        const cmd =
            `cd ${pwsConfig.basePath}/eye-share/Workflow;` +
            ` grunt ${method} ${force ? "--force" : ""}`;

        ps.streams.stdout.on("data", (data) => {
            dispatch("output", cleanOutput(data));

            return (output += cleanOutput(data));
        });

        ps.addCommand(cmd);
        ps.invoke()
            .then((output) => console.log(output))
            .catch((err) => {
                console.log(err);
                ps.dispose();
            });
    };
</script>

<!-- ---------------------------------------------------------------------- -->
<template>
    <div class="wrapper">
        <button
            on:click={() => grunt(build ? Grunts.build : Grunts.watch, force)}
        >
            GRUNT
        </button>
        <div class="input-wrapper">
            <label for="gruntBuild">Build</label>
            <input id="gruntBuild" type="radio" bind:group={build} value={1} />
        </div>
        <div class="input-wrapper">
            <label for="gruntWatch">Watch</label>
            <input id="gruntWatch" type="radio" bind:group={build} value={0} />
        </div>
        <div class="input-wrapper">
            <label for="gruntForce">Force</label>
            <input id="gruntForce" type="checkbox" />
        </div>
    </div>
</template>

<!-- ---------------------------------------------------------------------- -->
<style lang="scss">
    .wrapper {
        display: grid;
        grid-auto-columns: auto;
        column-gap: 1em;
        > * {
            grid-row: 1;
        }
    }

    .input-wrapper {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }

    .output-wrapper {
        overflow: auto;
        display: flex;
        flex-direction: column-reverse;
        .output {
            display: flex;
            flex-direction: column-reverse;
            max-height: 500px;
            overflow-y: auto;
        }
    }
</style>
