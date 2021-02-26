<script>
    import ScriptAction, { fragment } from "./script-action.svelte";
    import { createEventDispatcher } from "svelte";
    import { cleanPwsOutput } from "../../utilities/cleanPwsOutput";
    import { defaultInvoker } from "../invoke";
    import pwsConfig from "../../config/powershell.json";
    import type NodePowershell from "node-powershell";

    const shell = require("node-powershell");
    const dispatch = createEventDispatcher();

    const command = () => {
        const ps: NodePowershell = new shell({
            executionPolicy: "Bypass",
            noProfile: true,
        });

        const migratorPath =
            `${pwsConfig.basePath}` +
            `/eye-share-admin/Eyeshare/Data/Migration/MigratorUI/MigratorUI.csproj`;

        const cmd = `dotnet run --configuration Debug --project ${migratorPath} | Out-Host`;

        ps.streams.stdout.on("data", (data) =>
            dispatch("output", cleanPwsOutput(data))
        );

        ps.addCommand(cmd);

        dispatch("output", "starting Migrator UI");

        defaultInvoker(ps);
    };
</script>

<!-- ---------------------------------------------------------------------- -->

<ScriptAction>
    <template use:fragment>
        <button on:click={command}> Migrator UI </button>
    </template>

    <template use:fragment slot="options" />
</ScriptAction>

<!-- ---------------------------------------------------------------------- -->
<style lang="scss"></style>
