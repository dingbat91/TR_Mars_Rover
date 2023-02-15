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
export class MapGridSquare extends uniqueID {
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

	constructor(Mountains: Boolean = true) {
		super();
		this.vehicles = "Empty";
		this.TerrainGeneration(Mountains);
	}

	//random terrain feature generation
	//Not sure how to test this in jest right now since it's randomised
	private TerrainGeneration(Mountains: Boolean = true) {
		const chance = Math.random();
		if (Mountains) {
			if (chance > 0.6) {
				this.features?.push(
					structuredClone(MapGridSquare._featurelist.mountain)
				);
			}
		}
	}
}

export class MapGrid {
	grid: MapGridSquare[][];

	//Constructor - builds inital grid
	constructor(x = 5, y = 5, Mountains: boolean = true) {
		const XLENGTH = x;
		const YLENGTH = y;
		this.grid = [];
		for (let i = 0; i < XLENGTH - 1; i++) {
			this.grid[i] = [];
			for (let j = 0; j < YLENGTH - 1; j++) {
				this.grid[i][j] = new MapGridSquare(Mountains);
			}
		}
	}

	//UI code, not unit tested
	//Displays the current grid in a square of output [ ]
	// Rovers have an R, Mountains have ^ and empty space are just [ ]
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
	 * @returns String "[X]" where X is the icon selected. If empty it will result in an icon of "[   ]" Rover is an "[ R ]" and a mountain is an "[ ^ ]"
	 */
	private getSquareIcon(square: MapGridSquare) {
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
