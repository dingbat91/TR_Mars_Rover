//all types and classes containing the layout.

import { uniqueID } from "../misc/counter";
import { TerrainFeature } from "../../types/features/feature";
import { Rover } from "../vehicle/vehicle";
import chalk from "chalk";
import chalkTemplate from "chalk-template";

/**
 * Class for the grid squares, should be constructed in an multidimension array, each item representing that square on the grid.
 *
 * Extends UniqueID for a unique Identifier number
 * @param Title - Title
 * @param features[] - an array consisting of {@link TerrainFeature} objects
 * @param vehicles - Contains either "Empty" or a reference to the vehicle located there.
 */
export class GameGridSquare extends uniqueID {
	Title?: string;
	features: TerrainFeature[] = [];
	vehicles: Rover | "Empty";
	private static _featurelist: { [key: string]: TerrainFeature } = {
		mountain: {
			type: "Mountain",
			icon: "^",
			canPass: false,
			color: "red",
			displayPriority: 1,
		},
	};

	constructor() {
		super();
		this.vehicles = "Empty";
		this.TerrainGeneration();
	}

	//random terrain feature generation
	private TerrainGeneration() {
		const chance = Math.random();
		if (chance > 0.6) {
			this.features?.push(
				structuredClone(GameGridSquare._featurelist.mountain)
			);
		}
	}
}

export class GameGrid {
	grid: GameGridSquare[][];

	//Constructor - builds inital grid
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

	//UI code, not unit tested
	displayGrid() {
		//
		let displaygrid: string[][] = [];

		for (let x in this.grid[0]) {
			displaygrid[x] = [];
			for (let y in this.grid[1]) {
				//check terrain icons
				displaygrid[x][y] = this.getSquareIcon(this.grid[x][y]);
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
		let icon = "[   ]";
		if (square.vehicles instanceof Rover) {
			icon = chalk.redBright("[ R ]");
			return icon;
		} else if (square.features.length > 0) {
			const HIGHESTFEATURE = square.features.reduce((prev, curr) => {
				return prev.displayPriority > curr.displayPriority ? prev : curr;
			});
			if (HIGHESTFEATURE.color) {
				icon = `[ ${HIGHESTFEATURE.icon} ]`;
			} else {
				icon = `[ ${HIGHESTFEATURE.icon} ]`;
			}
		} else {
			return icon;
		}
		return icon;
	}
}
