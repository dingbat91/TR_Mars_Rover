import { uniqueID } from "../misc/counter";

//List of mounting locations for a module
type MountLocation =
	| "Top"
	| "Bottom"
	| "Left"
	| "Right"
	| "Front"
	| "Back"
	| "Internal";

//Base module abstract class
abstract class VehicleModule extends uniqueID {
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
