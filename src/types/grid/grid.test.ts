import { GameGrid, GameGridSquare } from "./grid";

describe("Grid Construction Tests", () => {
	test("should Initiate correct Grid", () => {
		const board = new GameGrid();
		board.grid.forEach((cellx) => {
			cellx.forEach((celly) => {
				expect(celly).toHaveProperty("id");
			});
		});
	});
});
