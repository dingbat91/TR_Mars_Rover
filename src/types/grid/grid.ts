//all types and classes containing the layout.

import { uniqueID } from "../utils/counter";
import { TerrainFeature } from "../features/feature";
import { Rover } from "../vehicle/vehicle";

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
	vehicles: Rover | "Empty";

	constructor() {
		super();
		this.vehicles = "Empty";
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
		for (let i = 0; i < XLENGTH - 1; i++) {
			this.grid[i] = [];
			for (let j = 0; j < YLENGTH - 1; j++) {
				this.grid[i][j] = new GameGridSquare();
			}
		}
	}

	//UI Output - not unit tested.
	displayGrid() {
		//
		let displaygrid: string[][] = [];

		for (let x in this.grid[0]) {
			displaygrid[x] = [];
			for (let y in this.grid[1]) {
				//check terrain icons
				if (this.grid[x][y].features === undefined) {
					displaygrid[x][y] = this.getSquareIcon(this.grid[x][y]);
				}
			}
		}

		for (let x in displaygrid[0]) {
			let rowstring = "";
			for (let y in displaygrid[1]) {
				rowstring += displaygrid[x][y];
			}
			console.log(rowstring);
		}
	}

	/**
	 * Returns the icon to display on the Grid
	 * @param square - Square to be checked
	 * @returns String "[X]" where X is the icon selected. If empty it will result in an icon of "[ ]"
	 */
	private getSquareIcon(square: GameGridSquare) {
		let icon = "[ ]";
		if (square.vehicles instanceof Rover) {
			icon = "[R]";
		} else if (square.features) {
			// add logic to determine icon based on square.features
		}
		return icon;
	}
}
