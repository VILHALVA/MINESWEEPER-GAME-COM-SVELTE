<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let gameSettings: {
        width: number;
        height: number;
        mines: number;
    };
</script>

<section class="wrapper">
    <div class="modal">
        <h1>Minesweeper</h1>
        <div class="group">
            <label for="size">TAMANHO:</label>
            <input type="number" id="size" min="5" max="100" bind:value={gameSettings.width} />
            <p>x</p>
            <input type="number" id="size" min="5" max="100" bind:value={gameSettings.height} />
        </div>

        <div class="group">
            <label for="mines">MINAS:</label>
            <input type="number" id="mines" min="1" max="999" bind:value={gameSettings.mines} />
        </div>

        <button class="button" on:click={() => dispatch("start")}>INICIAR</button>
    </div>
</section>

<style lang="scss" scoped>
    .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        padding: 1rem;
        max-width: 80vw;
        width: 400px;

        display: flex;
        flex-direction: column;
        gap: 1rem;

        background-color: var(--color-black-6);

        h1 {
            text-transform: uppercase;
            font-weight: 800;
            letter-spacing: 0.15rem;
            font-size: 2rem;
            line-height: 1;
            margin-bottom: 1rem;
        }

        .group {
            display: flex;
            align-items: center;
            gap: 0.5rem;

            input {
                width: 96px;
                padding: 0.25rem 0.5rem;
                border: none;
                background-color: var(--color-black-4);
                color: var(--color-white);
                font-size: 1.25rem;
            }
        }
    }
</style>
