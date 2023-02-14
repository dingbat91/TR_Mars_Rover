import inquirer, { Answers, ListQuestion } from "inquirer";
import Choice from "inquirer/lib/objects/choice";

/**
 * Main menu
 * includes the following options:
 *
 * New - stars a new session
 *
 * quit - quits the session
 *
 * @returns The {@link Answers} object from Inquirer
 */
export async function MainMenu() {
	//initial root menu choices
	const mainMenuChoices: Choice[] = [
		{
			name: "New Map",
			value: "new",
			short: "new",
			disabled: false,
		},
		{
			name: "Exit",
			value: "exit",
			short: "quit",
			disabled: false,
		},
	];

	//Menu options object, add new options here for the menu layout
	const menuOptions: ListQuestion[] = [
		{
			type: "list",
			name: "mainMenuChoice",
			message: "Main menu",
			choices: mainMenuChoices,
			prefix: "",
		},
	];

	const RESULT = await inquirer.prompt(menuOptions);
	return RESULT.mainMenuChoice;
}
