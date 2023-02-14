export class uniqueID {
	private static _counter: number = 1;
	readonly id: number;

	constructor() {
		this.id = uniqueID._counter++;
	}
}
