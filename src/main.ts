import { GameMenu } from "./menus/GameMenu";
import { MainMenu } from "./menus/MainMenu";
import { GameGrid } from "./types/grid/grid";

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
	let running = true;
	while (running) {
		grid.displayGrid();
		console.log("----------");
		const choice = await GameMenu();

		if (choice === "exit") {
			running = false;
			return;
		}
	}
}

main();
