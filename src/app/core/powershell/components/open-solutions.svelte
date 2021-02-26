<script>
    import ScriptAction, { fragment } from "./script-action.svelte";
    import { createEventDispatcher } from "svelte";
    import { cleanPwsOutput } from "../../utilities/cleanPwsOutput";

    import pwsConfig from "../../config/powershell.json";
    import type NodePowershell from "node-powershell";
    const shell = require("node-powershell");
    const dispatch = createEventDispatcher();

    let allSelected = true;
    let solutions: any[] = [
        "\\eye-share\\Eyeshare.sln",
        "\\eye-share-auth-server\\Eyeshare.AuthServer.sln",
        "\\eye-share-admin\\Admin.sln",
        "\\eye-share-integrations\\Integrations.sln",
        "\\eye-share-customers\\Customers.sln",
        "\\eye-share-customers-global\\CustomersGlobal.sln",
    ];

    solutions = solutions.reduce((acc, cur) => {
        const splitPath = cur.split("\\");

        acc.push({
            path: cur,
            name: splitPath[splitPath.length - 1].replace(".sln", ""),
            active: allSelected,
        });

        return acc;
    }, []);

    $: {
        allSelected = solutions.every((x) => x.active);
    }

    const openSolutions = () => {
        const ps: NodePowershell = new shell({
            executionPolicy: "Bypass",
            noProfile: true,
        });

        const basePath = pwsConfig.basePath;
        const shortcut = pwsConfig.vsShortcutPath;

        solutions
            .filter(({ active }) => active)
            .forEach(({ path }) => {
                ps.addCommand(
                    `& ${shortcut} /DoNotLoadProjects (${basePath}${path})`
                );
            });

        ps.invoke()
            .then((output) => {
                dispatch("output", cleanPwsOutput(output));
                console.log(output);
            })
            .catch((err) => {
                console.log(err);
                ps.dispose();
            });
    };
</script>

<!-- ---------------------------------------------------------------------- -->

<ScriptAction>
    <template use:fragment>
        <button class="action" on:click={openSolutions}>
            Open Solutions
        </button>
    </template>

    <template use:fragment slot="options">
        <div>
            <label for="all">All</label>
            <input
                id="all"
                type="checkbox"
                bind:checked={allSelected}
                on:click={() => {
                    solutions.forEach((x) => (x.active = !allSelected));
                }}
            />
        </div>
        {#each solutions as solution}
            <div>
                <label for={solution.name}>{solution.name}</label>
                <input
                    id={solution.name}
                    type="checkbox"
                    bind:checked={solution.active}
                />
            </div>
        {/each}
    </template>
</ScriptAction>

<!-- ---------------------------------------------------------------------- -->
<style lang="scss"></style>
