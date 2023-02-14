// This file contains all type information regarding vehicles

import inquirer from "inquirer";
import { GameGrid } from "../grid/grid";
import { uniqueID } from "../misc/counter";
import { AnyKey } from "../../types/utils/pressanykey";
import { ModuleList } from "../VehicleModule/VehicleModule";
type cardinals = "N" | "S" | "E" | "W";

/**
 * Abtract Class for Vehicle Information
 * @param {number} x - the vehicles X co-ordinates
 * @param {number} y - the vehicles Y co-ordinates
 * @param {cardinals} direction - the direction the vehicle is point. can be N,S,E or W
 */
abstract class vehicle extends uniqueID {
	board: GameGrid;
	x: number = 0;
	y: number = 0;
	direction: cardinals = "S";
	modules: { [key: string]: ModuleList[] };

	constructor(inputBoard: GameGrid) {
		super();
		this.board = inputBoard;
		this.modules = {
			Top: [],
			Bottom: [],
			Left: [],
			Right: [],
			Front: [],
			Back: [],
		};
	}

	initVic(x: number = 0, y: number = 0) {
		this.board.grid[y][x].vehicles = this;
		this.board.grid[y][x].features = [];
		this.x = x;
		this.y = y;
	}

	/**
	 * Moves the Vehicle Based on the cardinal direction contained in this.direction
	 * @param repeat
	 * @returns
	 */
	move(repeat: number = 1) {
		for (let i = 0; i < repeat; i++) {
			let moveX = this.x;
			let moveY = this.y;
			switch (this.direction) {
				case "S":
					moveY = this.y + 1;
					break;
				case "E":
					moveX = this.x + 1;
					break;
				case "W":
					moveX = this.x - 1;
					break;
				case "N":
					moveY = this.y - 1;
					break;
			}

			if (
				moveX < 0 ||
				moveY < 0 ||
				moveX >= this.board.grid.length ||
				moveY >= this.board.grid[0].length
			) {
				return "You have hit the edge of the world. Look onwards and dispaire";
			}

			if (
				this.board.grid[moveY][moveX].features.some(
					(feature) => feature.canPass === false
				)
			) {
				return "BONK - There's something in the way.";
			}
			this.board.grid[this.y][this.x].vehicles = "Empty";
			this.board.grid[moveY][moveX].vehicles = this;
			this.x = moveX;
			this.y = moveY;
			return 0;
		}
	}

	/**
	 * Turns the Vehicle 90 degrees per step (to one of the functional cardinal directions(N,S,E,W)
	 * Intercardinal directions (NW,SE,SW,NW) are not implemented.
	 * @param turnDirection - Which direction to turn accepts "Left" or "Right"
	 * @param repeat - How many times to turn
	 */
	turn(turnDirection: "Left" | "Right", repeat: number = 1) {
		const directions: cardinals[] = ["N", "E", "S", "W"];
		for (let i = 0; i < repeat; i++) {
			let currentIndex = directions.indexOf(this.direction);
			if (turnDirection === "Left") {
				this.direction = directions[(currentIndex + 3) % 4];
			} else if (turnDirection === "Right") {
				this.direction = directions[(currentIndex + 1) % 4];
			}
		}
	}

	reportLocation() {
		let obj = { gridLoc: `${this.y},${this.x}`, direction: this.direction };
		return obj;
	}

	addModule(newModule: ModuleList) {
		this.modules[newModule.location].push(newModule);
	}
}

/**
 * Class for a ground based Rover object
 */
export class Rover extends vehicle {
	constructor(inputBoard: GameGrid) {
		super(inputBoard);
	}
}