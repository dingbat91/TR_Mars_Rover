import { MapGrid } from "../grid/grid";
import { Camera } from "../VehicleModule/VehicleModule";
import { Rover } from "./vehicle";

describe("Vehicle Constructor Tests", () => {
	test("Rover initialization", () => {
		const TESTBOARD = new MapGrid();
		const TESTROVER = new Rover(TESTBOARD);
		TESTROVER.initVic(3, 3);
		expect(TESTBOARD.grid[3][3].vehicles).toBe(TESTROVER);
	});
	test("Rover initialization(default)", () => {
		const TESTBOARD = new MapGrid();
		const TESTROVER = new Rover(TESTBOARD);
		TESTROVER.initVic();
		expect(TESTBOARD.grid[0][0].vehicles).toBe(TESTROVER);
	});
});

describe("Rover Function tests", () => {
	describe("Turning Tests", () => {
		test("Left Turn", () => {
			const testboard = new MapGrid();
			const testRover = new Rover(testboard);
			testRover.turn("Left");
			expect(testRover.direction).toBe("E");
		});

		test("Right Turn", () => {
			const testboard = new MapGrid();
			const testRover = new Rover(testboard);
			testRover.turn("Right");
			expect(testRover.direction).toBe("W");
		});

		test(" 180 Right Turn", () => {
			const testboard = new MapGrid();
			const testRover = new Rover(testboard);
			testRover.turn("Right");
			testRover.turn("Right");
			expect(testRover.direction).toBe("N");
		});

		test(" 180 Left Turn", () => {
			const testboard = new MapGrid();
			const testRover = new Rover(testboard);
			testRover.turn("Left");
			testRover.turn("Left");
			expect(testRover.direction).toBe("N");
		});

		test("OH BOY A 360!", () => {
			const testboard = new MapGrid();
			const testRover = new Rover(testboard);
			testRover.turn("Right");
			testRover.turn("Right");
			testRover.turn("Right");
			testRover.turn("Right");
			expect(testRover.direction).toBe("S");
		});
	});

	describe("Moving Tests", () => {
		test("Move South", () => {
			const TESTBOARD = new MapGrid();
			const TESTROVER = new Rover(TESTBOARD);
			TESTROVER.initVic(5, 5);
			TESTROVER.move();
			expect(TESTBOARD.grid[5][5].vehicles).toStrictEqual("Empty");
			expect(TESTBOARD.grid[6][5].vehicles).toStrictEqual(TESTROVER);
			expect(TESTROVER.y).toBe(6);
			expect(TESTROVER.x).toBe(5);
		});
		test("Move North", () => {
			const TESTBOARD = new MapGrid();
			const TESTROVER = new Rover(TESTBOARD);
			TESTROVER.initVic(5, 5);
			TESTROVER.turn("Right", 2);
			TESTROVER.move();
			expect(TESTBOARD.grid[5][5].vehicles).toStrictEqual("Empty");
			expect(TESTBOARD.grid[4][5].vehicles).toStrictEqual(TESTROVER);
			expect(TESTROVER.y).toBe(4);
			expect(TESTROVER.x).toBe(5);
		});
	});

	describe("Module tests", () => {
		const TESTBOARD = new MapGrid();
		const TESTROVER = new Rover(TESTBOARD);
		describe("Camera Mounting Tests", () => {
			test("should add Front Camera", () => {
				TESTROVER.addModule("Camera", "Front");
				expect(TESTROVER.modules["Front"].values).toContain<Camera>;
			});

			test("should add Back Camera", () => {
				TESTROVER.addModule("Camera", "Back");
				expect(TESTROVER.modules["Back"].values).toContain<Camera>;
			});

			test("should add Left Camera", () => {
				TESTROVER.addModule("Camera", "Left");
				expect(TESTROVER.modules["Left"].values).toContain<Camera>;
			});

			test("should add Right Camera", () => {
				TESTROVER.addModule("Camera", "Right");
				expect(TESTROVER.modules["Right"].values).toContain<Camera>;
			});

			test("should add Back Camera", () => {
				TESTROVER.addModule("Camera", "Top");
				expect(TESTROVER.modules["Top"].values).toContain<Camera>;
			});

			test("should add Bottom Camera", () => {
				TESTROVER.addModule("Camera", "Bottom");
				expect(TESTROVER.modules["Bottom"].values).toContain<Camera>;
			});
		});
	});

	describe("Misc Function Tests", () => {
		test("Location Report Test", () => {
			const TESTBOARD = new MapGrid();
			const TESTROVER = new Rover(TESTBOARD);
			TESTROVER.initVic(5, 5);
			expect(TESTROVER.reportLocation()).toStrictEqual({
				gridLoc: `5,5`,
				direction: "S",
			});
		});
	});
});
