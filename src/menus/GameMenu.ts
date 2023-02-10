import inquirer, {
	ListQuestion,
	InputQuestion,
	NumberQuestion,
} from "inquirer";
import Choice from "inquirer/lib/objects/choice";
import Choices from "inquirer/lib/objects/choices";

export async function GameMenu() {
	//choices -------------------------------------------------

	//Move Menu Configuration -----------------------------

	const MOVEMENUCHOICE: Choice[] = [
		{ name: "Left", value: "Left", short: "Left", disabled: false },
		{ name: "Right", value: "Right", short: "Right", disabled: false },
	];
	//----------------------------------------------------

	//Root Menu Choices ----------------------------------
	const GAMEMENUCHOICE: Choice[] = [
		{
			name: "Move",
			value: "move",
			short: "move",
			disabled: false,
		},
		{
			name: "Turn",
			value: "turn",
			short: "turn",
			disabled: false,
		},
		{
			name: "Exit",
			value: "exit",
			short: "exit",
			disabled: false,
		},
	];
	//------------------------------------------------------

	//----------------------------------------------------------

	//Questions ------------------------------------------------

	//Repeating Questions --------------------------------------
	const REPEATMENU: NumberQuestion = {
		type: "number",
		name: "repeatNum",
		message: "How many times? (Max of 5)",
		validate: (ans) => Number(ans) <= 5 || ans > -1,
	};
	//---------------------------------------------------------

	//---Root Questions ---------------------------------------

	const GAMEMENUOPTIONS: (ListQuestion | InputQuestion | NumberQuestion)[] = [
		{
			type: "list",
			name: "gamemenu",
			message: "What do you want to do?",
			choices: GAMEMENUCHOICE,
			prefix: "",
		},
		{
			type: "list",
			name: "turnmenu",
			message: "Which way do you want to turn?",
			choices: MOVEMENUCHOICE,
			when: (ans) => ans.gamemenu === "turn",
		},
		{
			type: "input",
			name: "repeatval",
			message: "How many times?",
			when: (ans) => ans.gamemenu === "move" || ans.gamemenu === "turn",
		},
	];

	//--------------------------------------------------------

	return await inquirer.prompt(GAMEMENUOPTIONS);
}
