<script>
    import ScriptAction, { fragment } from "./script-action.svelte";
    import { createEventDispatcher } from "svelte";
    import { cleanPwsOutput } from "../../utilities/cleanPwsOutput";
    import { pathService } from "src/app/core/services/path.service";
    import { invoker } from "../invoke";
    import type NodePowershell from "node-powershell";

    const dispatch = createEventDispatcher();
    let runner = false;

    const command = () => {
        invoker(
            (ps: NodePowershell) => {
                ps.addCommand("Write-Host 'Data Replication Started'");
                ps.addCommand(
                    `& ${pathService.path().base}/` +
                        "eye-shareWorkflow/build/binTaskmaster.exe " +
                        "run 'integration data replication';"
                );

                if (runner) {
                    ps.addCommand(
                        `& ${pathService.path().base}/` +
                            `eye-shareWorkflow/build/binTaskmaster.exe ` +
                            `run 'integration data replication runner';`
                    );
                }

                ps.addCommand("Write-Host 'Data Replication Completed'");
            },
            (data: any) => dispatch("output", cleanPwsOutput(data))
        );
    };
</script>

<!-- ---------------------------------------------------------------------- -->

<ScriptAction>
    <template use:fragment>
        <button on:click={command}> Data Replication </button>
    </template>

    <template use:fragment slot="options">
        <div>
            <label for="runner">Execute runner</label>
            <input id="runner" type="checkbox" bind:checked={runner} />
        </div>
    </template>
</ScriptAction>

<!-- ---------------------------------------------------------------------- -->
<style lang="scss"></style>
