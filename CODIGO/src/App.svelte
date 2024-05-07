<script lang="ts">
    import Game from "@/lib/game/Game.svelte";
    import Menu from "@/lib/menu/Menu.svelte";

    let gameSettings = {
        width: 10,
        height: 10,
        mines: 10,
    };

    let started = false;
</script>

<main>
    {#if started}
        <Game
            width={gameSettings.width}
            height={gameSettings.height}
            mines={gameSettings.mines}
            on:restart={() => {
                started = false;
            }}
        />
    {:else}
        <Menu
            {gameSettings}
            on:start={() => {
                started = true;
            }}
            on:settings={(e) => {
                gameSettings = e.detail;
            }}
        />
    {/if}
</main>

<style lang="scss" scoped>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>
