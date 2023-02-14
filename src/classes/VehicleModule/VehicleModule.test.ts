import { Camera } from "./VehicleModule";

describe("Module init Tests", () => {
	test("should make a valid camera object", () => {
		const TESTCAMERA = new Camera("Top");
		expect(TESTCAMERA).toMatchObject<Camera>;
		expect(TESTCAMERA.location).toStrictEqual("Top");
	});
});
