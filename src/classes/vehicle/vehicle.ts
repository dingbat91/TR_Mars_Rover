// This file contains all type information regarding vehicles

import inquirer from "inquirer";
import { MapGrid } from "../grid/grid";
import { uniqueID } from "../misc/counter";
import {
	Camera,
	ModuleChoices,
	ModuleTypes,
	MountLocation,
	VehicleModule,
} from "../VehicleModule/VehicleModule";
type cardinals = "N" | "S" | "E" | "W";

/**
 * Abtract Class for Vehicle Information
 * @param {number} x - the vehicles X co-ordinates
 * @param {number} y - the vehicles Y co-ordinates
 * @param {cardinals} direction - the direction the vehicle is point. can be N,S,E or W
 */
abstract class vehicle extends uniqueID {
	board: MapGrid;
	x: number = 0;
	y: number = 0;
	direction: cardinals = "S";
	modules: { [key: string]: ModuleTypes[] };

	constructor(inputBoard: MapGrid) {
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

	/**
	 * Places the Vehicle on the Grid
	 * @param x - X position of the Vehicle
	 * @param y - Y position of the Vehicle
	 */
	initVic(x: number = 0, y: number = 0, direction: cardinals = "S") {
		this.board.grid[y][x].vehicles = this;
		this.board.grid[y][x].features = [];
		this.x = x;
		this.y = y;
		this.direction = direction;
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

	/**
	 * Gives the rovers location and direction as an object
	 * @returns {object} - Gridloc: X,Y string. direction: direction string.
	 */
	reportLocation() {
		let obj = { gridLoc: `${this.y},${this.x}`, direction: this.direction };
		return obj;
	}

	/**
	 * Adds a module to the vehicle list
	 * @param name String name of the Module, check VehicleModule for details
	 * @param location - Location of the Module on the Rover. Can be "Top","Bottom","Left","Right","Front","Back"
	 */
	addModule(name: ModuleChoices, location: MountLocation) {
		if (name === "Camera") {
			this.modules[location].push(new Camera(location));
		}
	}
	/**
	 * Adds a module to the vehicle list
	 * @param name String name of the Module, check VehicleModule for details
	 * @param location - Location of the Module on the Rover. Can be "Top","Bottom","Left","Right","Front","Back"
	 */
	removeModule(module: VehicleModule, location: MountLocation) {
		this.modules[location].splice(
			this.modules[location].findIndex(
				(installedmodule) => installedmodule.id === module.id
			)
		);
	}

	/**
	 * Displays a list of modules currently installed on the vehicle.
	 */
	async displayModules() {
		console.log(`Module list:`);
		for (const [key, value] of Object.entries(this.modules)) {
			console.log(`------${key}-----`);
			for (let x in value) {
				if (value.length > 0) {
					console.log(`- ${this.modules[key][x].name}`);
				} else {
					console.log(" ");
				}
			}
			console.log(`--------------------------------`);
			await inquirer.prompt({
				type: "confirm",
				name: "pressany",
				message: "press enter to continue...",
			});
		}
	}

	/**
	 * Allows the vehicle to move via a prefefined Input String
	 * @param input - Input String: L for left turn, R for right turn, M for Move
	 */
	inputMove(input: String) {
		const Ifilter = ["L", "R", "M"];
		const splitInput = input
			.toLocaleUpperCase()
			.split("")
			.filter((item) => Ifilter.includes(item));
		splitInput.forEach((val) => {
			switch (val) {
				case "L":
					this.turn("Left", 1);
					break;
				case "R":
					this.turn("Right", 1);
					break;
				case "M":
					this.move(1);
					break;
			}
		});
	}
}

/**
 * Class for a ground based Rover object
 */
export class Rover extends vehicle {
	constructor(inputBoard: MapGrid) {
		super(inputBoard);
	}
}
