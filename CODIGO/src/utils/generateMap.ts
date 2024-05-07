import type Coord from "@/interfaces/Coord";

/**
 * Creates a 2D array of numbers representing a minesweeper map
 * 0 = empty cell
 * 1-8 = number of adjacent mines
 * -1 = mine
 *
 * @param width The width of the map
 * @param height The height of the map
 * @param numberOfMines The number of mines to place
 * @returns A 2D array of numbers representing the map
 */
export function generateMap(width: number, height: number, numberOfMines: number = 0, safePoints: Coord[] = []): number[][] {
    const grid: number[][] = [];

    // Initialize all cells to 0
    for (let i = 0; i < height; i++) {
        grid[i] = [];
        for (let j = 0; j < width; j++) {
            grid[i][j] = 0;
        }
    }

    // Secure adjacent safe cells
    const securePoints: Coord[] = [];
    for (let i = 0; i < safePoints.length; i++) {
        const x = safePoints[i].x;
        const y = safePoints[i].y;
        securePoints.push({ x: x, y: y });

        securePoints.push({ x: x - 1, y: y - 1 });
        securePoints.push({ x: x, y: y - 1 });
        securePoints.push({ x: x + 1, y: y - 1 });

        securePoints.push({ x: x - 1, y: y });
        securePoints.push({ x: x + 1, y: y });

        securePoints.push({ x: x - 1, y: y + 1 });
        securePoints.push({ x: x, y: y + 1 });
        securePoints.push({ x: x + 1, y: y + 1 });
    }

    // Place mines
    for (let k = 0; k < numberOfMines; k++) {
        let mineX: number, mineY: number;
        do {
            mineX = Math.floor(Math.random() * width);
            mineY = Math.floor(Math.random() * height);
        } while (grid[mineY][mineX] < 0 || securePoints.some((point) => point.x === mineX && point.y === mineY));

        // Mark mine location
        grid[mineY][mineX] = -1;

        // Increment adjacent cells
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (x === 0 && y === 0) continue;
                if (mineX + x >= 0 && mineX + x < width && mineY + y >= 0 && mineY + y < height) {
                    if (grid[mineY + y][mineX + x] >= 0) grid[mineY + y][mineX + x]++;
                }
            }
        }
    }

    return grid;
}

/**
 * Creates an empty 2D array of numbers representing a minesweeper map
 *
 * @param width The width of the map
 * @param height The height of the map
 * @returns
 */
export function generateEmptyMap(width: number, height: number): number[][] {
    return generateMap(width, height);
}
