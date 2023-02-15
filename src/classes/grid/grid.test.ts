import chalk from "chalk";
import { Rover } from "../vehicle/vehicle";
import { VehicleModule } from "../VehicleModule/VehicleModule";
import { MapGrid, MapGridSquare } from "./grid";

describe("Grid Construction Tests", () => {
	test("should Initiate correct Grid", () => {
		const board = new MapGrid();
		board.grid.forEach((cellx) => {
			cellx.forEach((celly) => {
				expect(celly).toHaveProperty("id");
			});
		});
	});
});

describe("Grid Icon Testing", () => {
	test("should Display Rover Icon", () => {
		const TESTGRID = new MapGrid(10, 10);
		const TESTROVER = new Rover(TESTGRID);
		TESTROVER.initVic(5, 5);
		// @ts-expect-error
		expect(TESTGRID.getSquareIcon(TESTGRID.grid[5][5])).toEqual(
			chalk.redBright("[ R ]")
		);
	});
	test("should Display Empty Icon", () => {
		const TESTGRID = new MapGrid(10, 10);
		const TESTROVER = new Rover(TESTGRID);
		TESTROVER.initVic(5, 5);
		TESTGRID.grid[1][1].features = [];
		// @ts-expect-error
		expect(TESTGRID.getSquareIcon(TESTGRID.grid[1][1])).toEqual("[   ]");
	});
	test("should Display Mountain Icon", () => {
		const TESTGRID = new MapGrid(10, 10);
		const TESTROVER = new Rover(TESTGRID);
		TESTROVER.initVic(5, 5);
		TESTGRID.grid[1][1].features.push(
			//@ts-expect-error
			structuredClone(MapGridSquare._featurelist.mountain)
		);
		// @ts-expect-error
		expect(TESTGRID.getSquareIcon(TESTGRID.grid[1][1])).toEqual("[ ^ ]");
	});
});
