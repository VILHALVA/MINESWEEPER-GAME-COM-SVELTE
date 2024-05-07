<script lang="ts">
    import type CellData from "@/interfaces/CellData";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let cell: CellData;

    const reveal = () => {
        if (cell.revealed || cell.flagged) return;
        dispatch("reveal", cell);
    };

    const flag = (e: Event) => {
        e.preventDefault();
        if (cell.revealed) return;
        dispatch("flag", cell);
    };
</script>

<button
    class="cell"
    class:revealed={cell.revealed}
    class:bomb={cell.value === -1}
    class:odd={cell.isOdd}
    on:click={reveal}
    on:contextmenu={flag}
    style="color: var(--color-primary-{cell.value})"
>
    {cell.flagged ? "🚩" : cell.revealed ? (cell.value === 0 ? "" : cell.value === -1 ? "💣" : cell.value) : ""}
</button>

<style lang="scss" scoped>
    .cell {
        border: none;
        font-size: 1rem;
        font-weight: bold;
        text-align: center;

        &:not(.revealed) {
            cursor: pointer;
        }

        &.odd {
            background-color: var(--color-black-6);

            &:hover {
                background-color: var(--color-black-8);
            }

            &.revealed {
                background-color: var(--color-black-4);
            }
        }

        &:not(.odd) {
            background-color: var(--color-black-7);

            &:hover {
                background-color: var(--color-black-9);
            }

            &.revealed {
                background-color: var(--color-black-3);
            }
        }

        &.revealed.bomb {
            background-color: var(--color-primary-1);
        }
    }
</style>
