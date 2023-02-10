import { GameGrid } from "../grid/grid";
import { Rover } from "./vehicle";

describe("Vehicle Constructor Tests", () => {
	test("Rover initialization", () => {
		const TESTBOARD = new GameGrid();
		const TESTROVER = new Rover(TESTBOARD);
		TESTROVER.initRover(3, 3);
		expect(TESTBOARD.grid[3][3].vehicles).toBe(TESTROVER);
	});
	test("Rover initialization(default)", () => {
		const TESTBOARD = new GameGrid();
		const TESTROVER = new Rover(TESTBOARD);
		TESTROVER.initRover();
		expect(TESTBOARD.grid[0][0].vehicles).toBe(TESTROVER);
	});
});

describe("Rover Function tests", () => {
	describe("Turning Tests", () => {
		test("Left Turn", () => {
			const testboard = new GameGrid();
			const testRover = new Rover(testboard);
			testRover.turn("Left");
			expect(testRover.direction).toBe("E");
		});

		test("Right Turn", () => {
			const testboard = new GameGrid();
			const testRover = new Rover(testboard);
			testRover.turn("Right");
			expect(testRover.direction).toBe("W");
		});

		test(" 180 Right Turn", () => {
			const testboard = new GameGrid();
			const testRover = new Rover(testboard);
			testRover.turn("Right");
			testRover.turn("Right");
			expect(testRover.direction).toBe("N");
		});

		test(" 180 Left Turn", () => {
			const testboard = new GameGrid();
			const testRover = new Rover(testboard);
			testRover.turn("Left");
			testRover.turn("Left");
			expect(testRover.direction).toBe("N");
		});

		test("OH BOY A 360!", () => {
			const testboard = new GameGrid();
			const testRover = new Rover(testboard);
			testRover.turn("Right");
			testRover.turn("Right");
			testRover.turn("Right");
			testRover.turn("Right");
			expect(testRover.direction).toBe("S");
		});
	});
});
