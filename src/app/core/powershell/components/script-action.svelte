<script context="module">
    import { fragment as f } from "../../utilities/fragment";
    export const fragment = f;
</script>

<!-- ---------------------------------------------------------------------- -->
<div class="wrapper">
    <div class="action-wrapper">
        <slot />
    </div>

    <div class="options-wrapper">
        <slot name="options" />
    </div>
</div>

<!-- ---------------------------------------------------------------------- -->
<style lang="scss">
    :global(.wrapper) {
        display: grid;
        grid-auto-columns: min-content;
        column-gap: 1em;
    }

    :global(.wrapper > *) {
        grid-row: 1;
        min-height: 3em;
    }

    :global(.wrapper .options-wrapper) {
        display: grid;
        grid-auto-columns: auto;
        column-gap: 1em;
    }
    :global(.wrapper .options-wrapper > *) {
        grid-row: 1;

        white-space: nowrap;

        display: grid;
        place-items: center;
        text-align: center;
        row-gap: 0.2em;
    }

    :global(.wrapper .action-wrapper > *) {
        width: clamp(10em, 20vw, 20em);
        height: 100%;

        border-radius: 0.2rem;

        background-color: rgba(var(--button-1));
        color: rgba(var(--button-text-1));
        border: 1px solid rgba(var(--shadow-1));

        // lift effect
        box-shadow: rgba(var(--shadow-1), 0.06) 0px 2px 4px,
            rgba(var(--shadow-1), 0.05) 0px 0.5px 1px;
        transition: all 0.2s ease-in-out;

        &:hover {
            background-color: rgba(var(--button-hover-1), 0.3);
            text-shadow: -1px -1px 0 rgba(var(--button-text-invert-1)),
                1px -1px 0 rgba(var(--button-text-invert-1)),
                -1px 1px 0 rgba(var(--button-text-invert-1)),
                1px 1px 0 rgba(var(--button-text-invert-1));

            // lift effect
            box-shadow: rgba(var(--shadow-1), 0.22) 0px 5px 5px,
                rgba(var(--shadow-1), 0.18) 0px 2px 4px;
        }
    }
</style>
