import inquirer from "inquirer";

export async function AnyKey() {
	await inquirer.prompt({
		type: "input",
		name: "enterkey",
		message: "Press enter to continue...",
	});
}
