//This file contains all miscellaneous types used for utility functions.

//unique ID generator, included via closure.
let counter = 1;

/**Utility class to extend from,
 * Allows a class to have an automatically generated ID
 *
 * @type {number} id - The unique ID of the class.
 *
 * */
export class uniqueID {
	id: number;

	constructor() {
		this.id = counter++;
	}
}
