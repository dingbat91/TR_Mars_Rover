# Mars Rover Project

This is Matthew Hanson's github repository for the Tech Returners Mars Rover Project.

## Main Menu

![Main Menu Image](/docs/docimgs/MainMenu.png)

The main menu currently contains two options:
New Map - Starts a new session.
Exit - Closes the program

To be implemented:
Load Session - Load a session already made.

There is also music which stops after leaving this menu this requires a VLC player installed on the computer to function properly.
The program should run fine without however.

## Module menu

The module menu is opened at game start currently and allows the user to add or remove modules to the Rover.

New - will add a new module, prompting the user to pick a location, then a module type.
Edit - will allow a user to select an existing module, then edit it (Currently only supports deletion)
Deploy to surface - Moves onto the main screen.

## Map Screen

![Map Screen Image](/docs/docimgs/MapScreen.png)

The map Screen is the main interface for moving the rover. It displays the map as a grid.
Underneath is the Rovers location in XY coordinates (0,0 being the top left corner) and it's Cardinal Direction
Mountains are Randomly generated. There is a chance you can be boxed in.

### Key

[ R ] - Rover (Red coloured)
[ ] - Empty Space
[ ] - Mountain

### Menu

The Map Screen Menu has four function

Move - The move option will move the rover in it's current cardinal direction. It will prompty how many space you wish to move.
The Rover will stop upon hitting a mountain.

Turn - The turn option will allow you to turn the Rover. Each turn is 90 degrees, you will be prompted on direction and amount of turns. (2 being a 180 degree turn)

Display Modules - This will list out the Rovers installed Modules

Exit - This will exit the application.
