import { GameMenu } from "./menus/GameMenu";
import { MainMenu } from "./menus/MainMenu";
import { GameGrid } from "./types/grid/grid";
import { Rover } from "./types/vehicle/vehicle";

async function main() {
	let menuResult: string = await MainMenu();

	switch (menuResult) {
		case "new": {
			gameloop(new GameGrid());
			break;
		}
		case "exit": {
			console.log("Goodbye!");
			return 0;
			break;
		}
	}
}

//UI functionality - not unit tested
async function gameloop(grid: GameGrid) {
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
