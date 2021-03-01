<script>
    import ScriptAction, { fragment } from "./script-action.svelte";
    import { createEventDispatcher } from "svelte";
    import { invoker } from "../invoke";
    import type NodePowershell from "node-powershell";

    const dispatch = createEventDispatcher();
    let iisCommand = 1;
    const iisCommands = [
        "iisreset /start | Out-Host",
        "iisreset /stop | Out-Host",
        "iisreset | Out-Host",
    ];

    const command = () => {
        invoker(
            (ps: NodePowershell) => ps.addCommand(iisCommands[iisCommand]),
            (data: any) => dispatch("output", data)
        );
    };
</script>

<!-- ---------------------------------------------------------------------- -->

<ScriptAction>
    <template use:fragment>
        <button on:click={command}> IIS </button>
    </template>

    <template use:fragment slot="options">
        <div>
            <label for="iisStart">Start</label>
            <input
                id="iisStart"
                type="radio"
                bind:group={iisCommand}
                value={1}
            />
        </div>
        <div>
            <label for="iisStop">Stop</label>
            <input
                id="iisStop"
                type="radio"
                bind:group={iisCommand}
                value={2}
            />
        </div>
        <div>
            <label for="iisRestart">Restart</label>
            <input
                id="iisRestart"
                type="radio"
                bind:group={iisCommand}
                value={3}
            />
        </div>
    </template>
</ScriptAction>

<!-- ---------------------------------------------------------------------- -->
<style lang="scss"></style>
