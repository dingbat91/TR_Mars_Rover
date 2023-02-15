import inquirer, {
	Answers,
	InputQuestion,
	ListQuestion,
	NumberQuestion,
} from "inquirer";
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
	const menuOptions: (ListQuestion | NumberQuestion)[] = [
		{
			type: "list",
			name: "mainMenuChoice",
			message: "Main menu",
			choices: mainMenuChoices,
			prefix: "",
		},
		{
			type: "number",
			name: "xLength",
			message: "How long in the X Axis?",
			when: (ans) => ans.mainMenuChoice === "new",
			validate: (ans) => (!isNaN(ans) ? true : "Must be a Number! Try Again"),
		},
		{
			type: "number",
			name: "yLength",
			message: "How long in the Y Axis?",
			when: (ans) => ans.mainMenuChoice === "new",
			validate: (ans) => (!isNaN(ans) ? true : "Must be a Number! Try Again"),
		},
	];

	const RESULT = await inquirer.prompt(menuOptions);
	return RESULT;
}
