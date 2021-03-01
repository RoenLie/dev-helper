<script>
    import ScriptAction, { fragment } from "./script-action.svelte";
    import { createEventDispatcher } from "svelte";
    import { cleanPwsOutput } from "../../utilities/cleanPwsOutput";
    import { invoker } from "../invoke";
    import { pathService } from "src/app/core/services/path.service";
    import type NodePowershell from "node-powershell";

    const dispatch = createEventDispatcher();

    const command = () => {
        invoker(
            (ps: NodePowershell) => {
                const migratorPath =
                    `${pathService.path().base}` +
                    `/eye-share-admin/Eyeshare/Data/Migration/MigratorUI/MigratorUI.csproj`;

                const cmd = `dotnet run --configuration Debug --project ${migratorPath} | Out-Host`;
                ps.addCommand(cmd);

                dispatch("output", "starting Migrator UI");
            },
            (data: any) => dispatch("output", cleanPwsOutput(data))
        );
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
