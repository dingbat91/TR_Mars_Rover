import Audic from "audic";
import chalk from "chalk";
import terminalkit from "terminal-kit";
import { GameMenu } from "./menus/GameMenu";
import { MainMenu } from "./menus/MainMenu";
import { GameGrid } from "./types/grid/grid";
import { Rover } from "./types/vehicle/vehicle";

async function main() {
	//Opening Screen Loading
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

//UI functionality - not unit tested
async function GameLoop(grid: GameGrid) {
	let activeRover = new Rover(grid);
	activeRover.initVic();
	let running = true;
	while (running) {
		let locData = activeRover.reportLocation();
		grid.displayGrid();
		console.log("----------");
		console.log(
			`--Location: ${locData.gridLoc} - Direction: ${locData.direction}--`
		);
		const choice = await GameMenu();
		console.log(choice);
		switch (choice.gamemenu) {
			case "move": {
				activeRover.move(choice.repeatval);
				break;
			}
			case "turn": {
				activeRover.turn(choice.turnmenu, choice.repeatval);
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
