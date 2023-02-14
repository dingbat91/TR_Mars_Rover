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

//Factory Class
//Provides abstraction for constructing classes dynamically. Needed for ModuleMenu
export function ModuleFactory(
	buildClass: ModuleChoices,
	location: MountLocation,
	args?: any
) {
	//Camera Constructor
	if (buildClass == "Camera") {
		return new Camera(location);
	}
}
