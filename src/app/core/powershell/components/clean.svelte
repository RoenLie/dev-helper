<script>
    import ScriptAction, { fragment } from "./script-action.svelte";
    import { createEventDispatcher } from "svelte";
    import { pathService } from "src/app/core/services/path.service";
    import { invoker } from "../invoke";
    import type NodePowershell from "node-powershell";

    const shell = require("node-powershell");
    const dispatch = createEventDispatcher();

    const command = () => {
        invoker(
            (ps: NodePowershell) => {
                ps.addCommand("Write-Host 'Clean All Initiated.'");
                ps.addCommand("iisreset /stop | Out-Host");
                ps.addCommand("Start-Sleep -Second 5;");
                ps.addCommand("& " + pathService.path().cleanup + " 'all';");
                ps.addCommand(
                    `Remove-Item -LiteralPath ` +
                        `'${
                            pathService.path().base
                        }/eye-share/Workflow/build' -Recurse;`
                );
                ps.addCommand(
                    "& 'C:/Program Files/Redis/redis-cli.exe' 'flushall';"
                );
                ps.addCommand("iisreset /start | Out-Host");
                ps.addCommand("Write-Host 'Application Pools: Next Started'");
                ps.addCommand("Write-Host 'Clean All Completed.'");
            },
            (data) => dispatch("output", data)
        );
    };
</script>

<!-- ---------------------------------------------------------------------- -->

<ScriptAction>
    <template use:fragment>
        <button on:click={command}> Clean All </button>
    </template>

    <template use:fragment slot="options" />
</ScriptAction>

<!-- ---------------------------------------------------------------------- -->
<style lang="scss"></style>
