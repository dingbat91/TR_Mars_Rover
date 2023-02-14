import inquirer, { Answers, ListChoiceMap, ListQuestion } from "inquirer";
import Choice from "inquirer/lib/objects/choice";
import { object2attr } from "terminal-kit/ScreenBufferHD";
import { Rover } from "../classes/vehicle/vehicle";
import {
	ModuleChoices,
	ModuleFactory,
	ModuleList,
	MountLocation,
} from "../classes/VehicleModule/VehicleModule";

/**
 * Initiates the Module editing menu for the selected vehicle (Currently bound to the Rover class)
 * @param Rover - The Rover to edit.
 */
export async function ModuleMenu(Rover: Rover) {
	//Iteration Variable
	let inmenu = true;
	// Root Menu choices
	const MODULEMENUROOT: Choice[] = [
		{
			name: "new",
			value: "new",
			short: "new",
			disabled: false,
		},
		{
			name: "edit",
			value: "edit",
			short: "edit",
			disabled: false,
		},
		{
			name: "Deploy to Surface",
			value: "exit",
			short: "exit",
			disabled: false,
		},
	];

	//Module Location list - Match to the list in VehicleModules
	const LOCATIONCHOICE: MountLocation[] = [
		"Top",
		"Bottom",
		"Left",
		"Right",
		"Front",
		"Back",
		"Internal",
	];

	const EDITCHOICES: Choice[] = [
		{
			name: "delete",
			value: "delete",
			short: "delete",
			disabled: false,
		},
	];

	//Menu tree
	const MODULEMENUQUESTIONS: ListQuestion[] = [
		{
			type: "list",
			name: "rootMenu",
			message: "Module Menu: Please adjust your Modules",
			choices: MODULEMENUROOT,
		},
		{
			type: "list",
			name: "location",
			message: "Which area of the Rover?",
			choices: LOCATIONCHOICE,
			when: (ans) => ans.rootMenu === "edit" || ans.rootMenu === "new",
		},
		{
			type: "list",
			name: "editObject",
			message: "What object would you like to edit?",
			choices: (ans) => MakeInstalledModuleList(ans, Rover),
			when: (ans) => ans.rootMenu === "edit",
		},
		{
			type: "list",
			name: "module",
			message: "What module type would you like to add?",
			choices: ["Camera"],
			when: (ans) => ans.rootMenu === "new",
		},
		{
			type: "list",
			name: "editFunction",
			message: "what do you want to do to it?",
			choices: EDITCHOICES,
			when: (ans) => ans.rootMenu === "edit",
		},
	];

	//Menu Execution code
	while (inmenu) {
		console.clear();
		let menu = await inquirer.prompt(MODULEMENUQUESTIONS);
		if (menu.rootMenu === "exit") {
			return;
		}
		if (menu.rootMenu === "new") {
			Rover.addModule(menu.module, menu.location);
		}
		if (menu.rootMenu === "edit") {
			if (menu.editFunction === "delete") {
				Rover.removeModule(menu.editObject, menu.location);
			}
		}
	}
}

/**
 * Creates an inquirer choice object for the given vehcle
 * Requires an the answer from ans.Locations to be provided
 * @param ans - Answer object from Inquirer, created in it's choices parameter
 * @param Rover -- Rover to select the menu's from
 * @returns -- Returns a Choice object array containing the filtered modules
 */
function MakeInstalledModuleList(ans: Answers, Rover: Rover) {
	let editchoices: Choice[] = [];

	Rover.modules[ans.location].map((item) => {
		editchoices.push({
			name: item.name,
			value: item,
			short: item.id.toString(),
			disabled: false,
		});
	});
	return editchoices;
}
