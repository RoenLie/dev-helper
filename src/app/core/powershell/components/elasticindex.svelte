<script>
    enum Grunts {
        build = "build",
        watch = "watch",
    }
    import ScriptAction, { fragment } from "./script-action.svelte";
    import { createEventDispatcher } from "svelte";
    import { cleanPwsOutput } from "../../utilities/cleanPwsOutput";
    import pwsConfig from "../../config/powershell.json";
    import type NodePowershell from "node-powershell";

    const shell = require("node-powershell");
    const dispatch = createEventDispatcher();
    let force = false;
    let build = 1;

    const grunt = () => {
        const ps: NodePowershell = new shell({
            executionPolicy: "Bypass",
            noProfile: true,
        });

        const cmd =
            `cd ${pwsConfig.basePath}/eye-share/Workflow;` +
            ` grunt ${build ? Grunts.build : Grunts.watch}` +
            ` ${force ? "--force" : ""}`;

        ps.streams.stdout.on("data", (data) =>
            dispatch("output", cleanPwsOutput(data))
        );

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

<ScriptAction>
    <template use:fragment>
        <button on:click={grunt}> Elastic Index </button>
    </template>

    <template use:fragment slot="options">
        <div>
            <label for="gruntBuild">regular</label>
            <input id="gruntBuild" type="radio" bind:group={build} value={1} />
        </div>
        <div>
            <label for="gruntWatch">masterdata</label>
            <input id="gruntWatch" type="radio" bind:group={build} value={0} />
        </div>
    </template>
</ScriptAction>

<!-- ---------------------------------------------------------------------- -->
<style lang="scss"></style>
