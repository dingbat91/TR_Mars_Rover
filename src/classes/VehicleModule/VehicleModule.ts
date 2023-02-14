import { Answers } from "inquirer";
import { uniqueID } from "../misc/counter";
import { Rover } from "../vehicle/vehicle";

//List of mounting locations for a module
export type MountLocation =
	| "Top"
	| "Bottom"
	| "Left"
	| "Right"
	| "Front"
	| "Back"
	| "Internal";

//Base module abstract class
export abstract class VehicleModule extends uniqueID {
	location: MountLocation;

	constructor(location: MountLocation) {
		super();
		this.location = location;
	}
}

//Camera Class
export class Camera extends VehicleModule {
	name: string;

	constructor(location: MountLocation) {
		super(location);
		this.name = `Camera ${this.id}`;
	}
}

//Types and array list of Modules, Insert a union type or new entry for each module
export const ModuleList = ["Camera"];
export type ModuleChoices = "Camera";
export type ModuleTypes = Camera;

/**
 * A factory pattern for creating modules dynamically using Inquirer
 * @param buildClass - name of Class to be built
 * @param location - Passed on Location on the vehicle
 * @param args -- any additional arguments
 * @returns
 */
export function ModuleFactory(
	buildClass: ModuleChoices,
	location: MountLocation,
	args?: any
) {
	//Add Module constructors as if statements here
	//Camera Constructor
	if (buildClass == "Camera") {
		return new Camera(location);
	}
}
