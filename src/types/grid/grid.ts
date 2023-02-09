//all types and classes containing the layout.

import { uniqueID } from "../utils/counter";
import { TerrainFeature } from "../features/feature";

/**
 * Class for the grid squares, should be constructed in an multidimension array, each item representing that square on the grid.
 *
 * Extends UniqueID for a unique Identifier number
 * @param Title - Title
 * @param features[] - an array consisting of {@link TerrainFeature} objects
 *
 */
export class GameGridSquare extends uniqueID {
	Title?: string;
	features?: TerrainFeature[];

	constructor() {
		super();
	}
}

/**
 * Class for the main game grid.
 * @param grid - The array of the game grid itself, consisting of an array of {@link GameGridSquare} objects
 */
export class GameGrid {
	grid: GameGridSquare[][];

	constructor() {
		const XLENGTH = 10;
		const YLENGTH = 10;
		this.grid = [];
		for (let i = 0; i < XLENGTH; i++) {
			this.grid[i] = [];
			for (let j = 0; j < YLENGTH; j++) {
				this.grid[i][j] = new GameGridSquare();
			}
		}
	}
}
