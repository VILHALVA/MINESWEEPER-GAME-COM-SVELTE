<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Header from "./Header.svelte";
    import Map from "./Map.svelte";

    const dispatch = createEventDispatcher();

    export let width = 10;
    export let height = 10;
    export let mines = 10;
    let remainingFlags = mines;
    let timer = 0;
    let status: "playing" | "won" | "lost" = "playing";

    const interval = setInterval(() => {
        if (timer < 999) timer++;
    }, 1000);

    const changeStatus = (newStatus: "won" | "lost") => {
        status = newStatus;
        clearInterval(interval);
    };
</script>

<main>
    <Header {timer} {remainingFlags} />
    <Map
        {width}
        {height}
        {mines}
        {remainingFlags}
        on:flag={(e) => {
            remainingFlags = e.detail;
        }}
        on:status={(e) => {
            changeStatus(e.detail);
        }}
    />
    {#if status !== "playing"}
        <div class="overlay">
            <h1>{status === "won" ? "You won!" : "You lost!"}</h1>
            <button
                class="button"
                on:click={() => {
                    dispatch("restart");
                }}>REINICIAR</button
            >
        </div>
    {/if}
</main>

<style lang="scss" scoped>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        gap: 1.5rem;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        width: 100%;
        height: 100%;
        background-color: var(--color-black-1);
        backdrop-filter: blur(16px);
        opacity: 0.8;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
    }
</style>
