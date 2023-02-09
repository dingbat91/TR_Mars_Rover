import inquirer, { Answers, ListQuestion, Question } from "inquirer";
import Choice from "inquirer/lib/objects/choice";

/**
 * Main menu
 * included options
 * new - start a new game
 * quit - quit the game
 * for menu customisation please refer to instructions located here: https://www.npmjs.com/package/inquirer
 */

async function menu() {
	//initial root menu choices
	const mainMenuChoices: Choice[] = [
		{
			name: "new game",
			value: "new",
			short: "new",
			disabled: false,
		},
		{
			name: "quit",
			value: "quit",
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

	console.log("Welcome to the Mars Rover Program");
	console.log("================================");
	console.log("Made by Matthew Hanson");
	const RESULT = await inquirer.prompt(menuOptions).catch((error) => {
		console.log(error);
		return -1;
	});
	console.log(RESULT);
}

menu();
