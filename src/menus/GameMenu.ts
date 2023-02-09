import inquirer, { ListQuestion } from "inquirer";
import Choice from "inquirer/lib/objects/choice";

export async function GameMenu() {
	//---Inquirer Menu config --------------------------------
	const GAMEMENUCHOICE: Choice[] = [
		{
			name: "Move",
			value: "move",
			short: "move",
			disabled: false,
		},
		{
			name: "Exit",
			value: "exit",
			short: "exit",
			disabled: false,
		},
	];
	const GAMEMENUOPTIONS: ListQuestion[] = [
		{
			type: "list",
			name: "gamemenu",
			message: "What do you want to do?",
			choices: GAMEMENUCHOICE,
			prefix: "",
		},
	];
	//-------------------------------------------------
	const RESULT = await inquirer.prompt(GAMEMENUOPTIONS);
	return RESULT.gamemenu;
}
