//all type information about Terrain features

import { ColorName } from "chalk";

/**
 * The base interface for terrain features
 * @param {string} type - The name for the terrain feature type ("Mountain","Lake","Forest")
 * @param {string} icon - The icon to display for that Terrain feature in ascii art. No more than three characters ("Mountain=/\","Lake=(~)")
 * @param {boolean} canPass - Can this feature be passed through by the rover?
 * @param {string} color - The color of the grid icon for this feature. Uses Chalk for coloring purposes (optional)
 * @param {number} displayPriority - The order of display priority for the feature. The feature with the lower value will have it's icon and color displayed.(optional)
 */
export interface TerrainFeature {
	type: String;
	icon: string;
	canPass: boolean;
	color?: ColorName;
	displayPriority: number;
}
