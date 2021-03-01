<script>
    enum Grunts {
        build = "build",
        watch = "watch",
    }
    import ScriptAction, { fragment } from "./script-action.svelte";
    import { createEventDispatcher } from "svelte";
    import { cleanPwsOutput } from "../../utilities/cleanPwsOutput";
    import { pathService } from "src/app/core/services/path.service";
    import type NodePowershell from "node-powershell";
    import { invoker } from "src/app/core/powershell/invoke";

    const shell = require("node-powershell");
    const dispatch = createEventDispatcher();
    let force = false;
    let build = 1;

    const grunt = () => {
        invoker(
            (ps: NodePowershell) => {
                ps.addCommand(
                    `cd ${pathService.path().base}/eye-share/Workflow;` +
                        ` grunt ${build ? Grunts.build : Grunts.watch}` +
                        ` ${force ? "--force" : ""}`
                );
            },
            (data: any) => dispatch("output", cleanPwsOutput(data))
        );
    };
</script>

<!-- ---------------------------------------------------------------------- -->

<ScriptAction>
    <template use:fragment>
        <button on:click={grunt}> Grunt </button>
    </template>

    <template use:fragment slot="options">
        <div>
            <label for="gruntBuild">Build</label>
            <input id="gruntBuild" type="radio" bind:group={build} value={1} />
        </div>
        <div>
            <label for="gruntWatch">Watch</label>
            <input id="gruntWatch" type="radio" bind:group={build} value={0} />
        </div>
        <div>
            <label for="gruntForce">Force</label>
            <input id="gruntForce" type="checkbox" />
        </div>
    </template>
</ScriptAction>

<!-- ---------------------------------------------------------------------- -->
<style lang="scss"></style>
