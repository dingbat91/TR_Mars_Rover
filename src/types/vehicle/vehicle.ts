// This file contains all type information regarding vehicles

import { GameGrid } from "../grid/grid";
import { uniqueID } from "../utils/counter";
type cardinals = "N" | "S" | "E" | "W";

/**
 * Abtract Class for Vehicle Information
 * @param {number} x - the vehicles X co-ordinates
 * @param {number} y - the vehicles Y co-ordinates
 * @param {cardinals} direction - the direction the vehicle is point. can be N,S,E or W
 */
abstract class vehicle extends uniqueID {
	x: number = 0;
	y: number = 0;
	direction: cardinals = "S";

	constructor() {
		super();
	}
}

export class Rover extends vehicle {
	private board: GameGrid;

	constructor(inputBoard: GameGrid) {
		super();
		this.board = inputBoard;
	}

	private move(board: GameGrid, moveX?: number, moveY?: number) {
		//Check if we go out of grid boundry
		if (!moveX) {
			moveX = this.x;
		}
		if (!moveY) {
			moveY = this.y;
		}

		if (
			moveX >= board.grid[0].length ||
			moveY >= board.grid[1].length ||
			board.grid[0].length - moveX < 0 ||
			board.grid[1].length - moveX < 0
		) {
			console.log(
				"You Stand at the edge of the void, gaze into it and dispair"
			);
			return;
		}
		this.x = moveX;
		this.y = moveY;
	}

	turn(turnDirection: "Left" | "Right") {
		const directions: cardinals[] = ["N", "E", "S", "W"];
		const currentIndex = directions.indexOf(this.direction);

		if (turnDirection === "Left") {
			this.direction = directions[(currentIndex + 3) % 4];
		} else if (turnDirection === "Right") {
			this.direction = directions[(currentIndex + 1) % 4];
		}
	}
	initRover(x: number = 0, y: number = 0) {
		this.board.grid[x][y].vehicles = this;
	}
}
