/**
 * Class that gives each object a unique ID.
 * Exists in the future to allow for checking for specific instances of an object.
 * Probably a better way to do this, but it'll work for now.
 */
export class uniqueID {
	private static _counter: number = 1;
	readonly id: number;

	constructor() {
		this.id = uniqueID._counter++;
	}
}
