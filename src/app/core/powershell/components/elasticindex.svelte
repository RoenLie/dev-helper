<script>
    import ScriptAction, { fragment } from "./script-action.svelte";
    import { createEventDispatcher } from "svelte";
    import { cleanPwsOutput } from "../../utilities/cleanPwsOutput";
    import { pathService } from "src/app/core/services/path.service";
    import { invoker } from "../invoke";
    import type NodePowershell from "node-powershell";

    const dispatch = createEventDispatcher();
    let indexing = 1;

    const command = () => {
        invoker(
            (ps: NodePowershell) => {
                ps.addCommand(
                    `& '${pathService.path().base}` +
                        `/eye-share/Workflow/build/bin/TaskMaster.exe' ` +
                        `'run' '${
                            indexing
                                ? "elastic indexing"
                                : "masterdata indexing"
                        }';`
                );
            },
            (data: any) => dispatch("output", cleanPwsOutput(data))
        );
    };
</script>

<!-- ---------------------------------------------------------------------- -->

<ScriptAction>
    <template use:fragment>
        <button on:click={command}> Elastic Index </button>
    </template>

    <template use:fragment slot="options">
        <div>
            <label for="elasticRegular">regular</label>
            <input
                id="elasticRegular"
                type="radio"
                bind:group={indexing}
                value={1}
            />
        </div>
        <div>
            <label for="elasticMaster">masterdata</label>
            <input
                id="elasticMaster"
                type="radio"
                bind:group={indexing}
                value={0}
            />
        </div>
    </template>
</ScriptAction>

<!-- ---------------------------------------------------------------------- -->
<style lang="scss"></style>
