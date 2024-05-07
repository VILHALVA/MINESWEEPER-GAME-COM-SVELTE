<script lang="ts">
    import { generateMap, generateEmptyMap } from "@/utils/generateMap";
    import Cell from "@/lib/game/Cell.svelte";
    import type CellData from "@/interfaces/CellData";
    import type Coord from "@/interfaces/Coord";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let width = 10;
    export let height = 10;
    export let mines = 10;
    export let remainingFlags = mines;

    const flattenMap = (map: number[][]) => {
        return map.flat().map((cellValue, index) => {
            let xIndex = index % width;
            let yIndex = Math.floor(index / width);

            return {
                isOdd: (xIndex + yIndex) % 2,
                value: cellValue,
                revealed: false,
                flagged: false,
            };
        });
    };

    // Generate a map of cells
    const generate = (safePoints: Coord[] = []) => {
        return flattenMap(generateMap(width, height, mines, safePoints));
    };

    let map: CellData[] = flattenMap(generateEmptyMap(width, height));
    let firstClick = true;

    // Calculate the size of the map
    let styleWidth = 0;
    let styleHeight = 0;

    const recalcSize = () => {
        const aspectRatio = width / height;

        const maxWidth = width * 32;
        const maxHeight = height * 32;

        // Get the smallest size of the map that fits in the window
        let mapWidth = Math.min(window.innerWidth * 0.8, maxWidth);
        let mapHeight = Math.min(window.innerHeight * 0.8, maxHeight);

        if (mapWidth / mapHeight > aspectRatio) {
            mapWidth = mapHeight * aspectRatio;
        } else {
            mapHeight = mapWidth / aspectRatio;
        }

        styleWidth = mapWidth;
        styleHeight = mapHeight;
    };

    recalcSize();
    window.addEventListener("resize", recalcSize);

    const revealCell = (index: number) => {
        if (firstClick) {
            const safePoint = {
                x: index % width,
                y: Math.floor(index / width),
            };

            map = generate([safePoint]);
            firstClick = false;
        }

        if (index < 0 || index >= map.length || map[index].revealed || map[index].flagged) {
            return;
        }

        map[index].revealed = true;

        // If the cell is a bomb, lose the game
        if (map[index].value === -1) {
            dispatch("status", "lost");
            return;
        }

        // If all non-bomb cells are revealed and there are no flags left, win the game
        if (map.filter((cell) => cell.value !== -1 && !cell.revealed).length === 0 && remainingFlags === 0) {
            dispatch("status", "won");
            return;
        }

        // If the cell is empty, reveal the surrounding cells
        if (map[index].value === 0) {
            revealCell(index - width); // Top
            revealCell(index + width); // Bottom

            if (index % width !== 0) {
                revealCell(index - width - 1); // Top left
                revealCell(index - 1); // Left
                revealCell(index + width - 1); // Bottom left
            }

            if ((index + 1) % width !== 0) {
                revealCell(index - width + 1); // Top right
                revealCell(index + 1); // Right
                revealCell(index + width + 1); // Bottom right
            }
        }
    };

    const flagCell = (index: number) => {
        if (index < 0 || index >= map.length) {
            return;
        }

        if (firstClick) {
            return;
        }

        if (map[index].revealed) {
            return;
        }

        if (map[index].flagged) {
            map[index].flagged = false;
            console.log(remainingFlags);
            dispatch("flag", remainingFlags + 1);
        } else {
            if (remainingFlags === 0) {
                return;
            }

            // If all non-bomb cells are revealed and there are no flags left, win the game
            else if (remainingFlags === 1 && map.filter((cell) => cell.value !== -1 && !cell.revealed).length === 0) {
                dispatch("status", "won");
                return;
            }

            map[index].flagged = true;
            dispatch("flag", remainingFlags - 1);
        }
    };
</script>

<div
    class="map"
    style="
        --width: {width};
        --height: {height};
        --style-width: {styleWidth}px;
        --style-height: {styleHeight}px
    "
>
    {#each map as cell, index}
        <Cell {cell} on:reveal={() => revealCell(index)} on:flag={() => flagCell(index)} />
    {/each}
</div>

<style lang="scss" scoped>
    .map {
        display: grid;
        grid-template-columns: repeat(var(--width), 1fr);
        grid-template-rows: repeat(var(--height), 1fr);

        width: var(--style-width);
        height: var(--style-height);
    }
</style>
