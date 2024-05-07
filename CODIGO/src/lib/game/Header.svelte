<script lang="ts">
    export let timer = 0;
    export let remainingFlags = 0;
</script>

<header>
    <h1>Minesweeper</h1>
    <div class="group">
        <div class="section">
            <span>⏱</span>
            <span>{timer}</span>
        </div>
        <div class="section">
            <span>🚩</span>
            <span>{remainingFlags}</span>
        </div>
    </div>
</header>

<style lang="scss" scoped>
    h1 {
        text-transform: uppercase;
        font-weight: 800;
        letter-spacing: 0.1rem;
        font-size: 1.25rem;
        line-height: 1;
    }

    header {
        background: var(--color-black-7);
        padding: 1rem;
        max-width: 80vw;
        width: 400px;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .group {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .section {
        padding: 0.5rem;
        background: var(--color-black-5);
    }
</style>
