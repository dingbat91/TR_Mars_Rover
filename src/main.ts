import Audic from "audic";
import chalk from "chalk";
import terminalkit from "terminal-kit";
import { GameMenu } from "./menus/GameMenu";
import { MainMenu } from "./menus/MainMenu";
import { GameGrid } from "./classes/grid/grid";
import { Rover } from "./classes/vehicle/vehicle";
import { ModuleMenu } from "./menus/ModuleMenu";

/*
Opening UI Menu
Not unit tested as it's UI
*/
async function main() {
	//Opening Screen Loading
	console.clear();
	const terminal = terminalkit.terminal;
	await terminal.drawImage("src\\media\\mars.png", {
		shrink: { width: 40, height: 40 },
	});
	console.log(chalk.bgRed.bold("---Welcome to the Mars Rover Program!---"));
	console.log(chalk.bgRed.bold("---    Written by Matthew Hanson!    ---"));
	//------------------

	//Audio Code--------
	const audic = new Audic("\\src\\media\\audio\\StarTrek.mp3");
	audic.volume = 0.3;
	audic.currentTime = 5000;
	await audic.play().catch((err) => {
		console.log("There was an error! No cool music for you :(");
	});
	//------------------

	//menu code---------
	let menuResult: string = await MainMenu();
	switch (menuResult) {
		case "new": {
			audic.destroy();
			GameLoop(new GameGrid());
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
async function GameLoop(grid: GameGrid) {
	let issue: string | number = 0;
	let activeRover = new Rover(grid);
	await ModuleMenu(activeRover);
	activeRover.initVic();
	let running = true;
	while (running) {
		let locData = activeRover.reportLocation();

		grid.displayGrid();
		console.log("----------");
		if (issue != 0) console.log(chalk.bgRedBright(issue));
		console.log(
			`--Location: ${locData.gridLoc} - Direction: ${locData.direction}--`
		);
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

main();
