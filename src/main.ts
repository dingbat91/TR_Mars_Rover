import Audic from "audic";
import chalk from "chalk";
import terminalkit from "terminal-kit";
import { GameMenu } from "./menus/GameMenu";
import { MainMenu } from "./menus/MainMenu";
import { MapGrid } from "./classes/grid/grid";
import { Rover } from "./classes/vehicle/vehicle";
import { ModuleMenu } from "./menus/ModuleMenu";
import inquirer, { Answers } from "inquirer";

/*
Opening UI Menu
Not unit tested as it's UI
*/
async function main() {
	//Opening Screen Loading
	console.clear();
	const terminal = terminalkit.terminal;
	const PBAR = terminal.progressBar({
		title: "Loading...",
		width: 50,
		barHeadChar: "#",
	});
	await terminal.drawImage("src\\media\\mars.png", {
		shrink: { width: 40, height: 40 },
	});
	PBAR.update({ progress: 0.25 });
	console.log(
		chalk.bgRed.bold("---Welcome to the Australian Mars Rover Program!---")
	);
	console.log(chalk.bgRed.bold("---    Written by Matthew Hanson!    ---"));
	PBAR.update({ progress: 0.5 });
	//------------------

	//Audio Code--------
	const audic = new Audic("\\src\\media\\audio\\StarTrek.mp3");
	PBAR.update({ progress: 0.75 });
	audic.volume = 0.3;
	audic.currentTime = 5000;
	await audic.play().catch((err) => {
		console.log("There was an error! No cool music for you :(");
	});
	PBAR.update({ progress: 1, title: "Done!" });
	//------------------

	//menu code---------
	let menuResult: Answers = await MainMenu();
	switch (menuResult.mainMenuChoice) {
		case "new": {
			audic.destroy();
			GameLoop(
				new MapGrid(menuResult.xLength + 1, menuResult.yLength + 1, true)
			);
			break;
		}
		case "exit": {
			console.log("Goodbye!");

			audic.destroy();
			return;
		}
	}
	//-----------------
}

/*
Core loop for the program
Mostly UI so not unit tested.
*/
async function GameLoop(mapGrid: MapGrid) {
	//Error Code Variable
	let issue: string | number = 0;

	//Initialise Rover
	let activeRover = new Rover(mapGrid);

	//adjust modules on rover
	await ModuleMenu(activeRover);

	//Inquirer for Rovers starter location and direction, located here due to a limitation of Inquirer
	console.clear();
	const ROVERANS: Answers = await inquirer.prompt([
		{
			type: "number",
			name: "vehX",
			message: "Where would you like the vehicle to start on the X axis?",
			validate: (ans: number) =>
				ans <= mapGrid.grid.length ? true : "It's fallen into space!",
		},
		{
			type: "number",
			name: "vehY",
			message: "Where would you like the vehicle to start on the Y axis?",
			validate: (ans: number) =>
				ans <= mapGrid.grid[0].length ? true : "It's fallen into space!",
		},
		{
			type: "list",
			name: "cardinal",
			message: "What direction is it facing in",
			choices: [
				{
					name: "North",
					value: "N",
				},
				{
					name: "East",
					value: "E",
				},
				{
					name: "South",
					value: "S",
				},
				{ name: "West", value: "W" },
			],
		},
	]);
	//Places the rover on the grid
	activeRover.initVic(ROVERANS.vehX, ROVERANS.vehY, ROVERANS.cardinal);

	// Main Loop
	let running = true;
	while (running) {
		//display map
		console.clear();
		let locData = activeRover.reportLocation();
		mapGrid.displayGrid();
		console.log("----------");
		if (issue != 0) console.log(chalk.bgRedBright(issue));
		console.log(
			`--Location: ${locData.gridLoc} - Direction: ${locData.direction}--`
		);

		//menu functions
		const choice = await GameMenu();
		console.log(choice);
		switch (choice.gamemenu) {
			case "move": {
				issue = activeRover.move(choice.repeatval)!;
				break;
			}
			case "turn": {
				activeRover.turn(choice.turnmenu, choice.repeatval);
				break;
			}
			case "display": {
				console.clear();
				activeRover.displayModules();
				break;
			}
			case "exit": {
				running = false;
				return;
			}
		}
	}
}

//initiation
main();
