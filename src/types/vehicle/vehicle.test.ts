import { GameGrid } from "../grid/grid";
import { Rover } from "./vehicle";

describe("Vehicle Constructor Tests", () => {
	test("Rover initialization", () => {
		const TESTBOARD = new GameGrid();
		const TESTROVER = new Rover(TESTBOARD);
		TESTROVER.initVic(3, 3);
		expect(TESTBOARD.grid[3][3].vehicles).toBe(TESTROVER);
	});
	test("Rover initialization(default)", () => {
		const TESTBOARD = new GameGrid();
		const TESTROVER = new Rover(TESTBOARD);
		TESTROVER.initVic();
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

	test("Move South", () => {
		const TESTBOARD = new GameGrid();
		const TESTROVER = new Rover(TESTBOARD);
		TESTROVER.initVic(5, 5);
		TESTROVER.move();
		expect(TESTBOARD.grid[5][5].vehicles).toContain("Empty");
		expect(TESTBOARD.grid[5][6].vehicles).toStrictEqual(TESTROVER);
		expect(TESTROVER.y).toBe(6);
		expect(TESTROVER.x).toBe(5);
	});
	test("Move North", () => {
		const TESTBOARD = new GameGrid();
		const TESTROVER = new Rover(TESTBOARD);
		TESTROVER.initVic(5, 5);
		TESTROVER.turn("Right", 2);
		TESTROVER.move();
		expect(TESTBOARD.grid[5][5].vehicles).toContain("Empty");
		expect(TESTBOARD.grid[5][4].vehicles).toStrictEqual(TESTROVER);
		expect(TESTROVER.y).toBe(4);
		expect(TESTROVER.x).toBe(5);
	});

	describe("Misc Function Tests", () => {
		const TESTBOARD = new GameGrid();
		const TESTROVER = new Rover(TESTBOARD);
		TESTROVER.initVic(5, 5);
		expect(TESTROVER.reportLocation()).toStrictEqual({
			gridLoc: `5,5`,
			direction: "S",
		});
	});
});
