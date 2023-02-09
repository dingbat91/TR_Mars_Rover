import { MainMenu } from "./menus/MainMenu";
import { GameGrid } from "./types/grid/grid";

async function main() {
	let menuResult = await MainMenu();
	console.log(menuResult);

	if ((menuResult.mainMenuChoice = "new")) {
		gameloop(new GameGrid());
	}
}

async function gameloop(grid: GameGrid) {}

main();
