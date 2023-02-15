# Documentation

This folder contains plans for my code
I would usually not include these in a repo, but for marking purposes I have done so here.

## Tasks

### v0.01

The initial functionality of the project will be:

1. An opening menu - this will be implemented first to allow for new features to be added ongoing (save/load for example)
2. An initial grid - there will be a grid of land objects, the land objects will contain the state of that "patch" of land
3. An initial rover - the rover will be an object that contains details of the rovers capabilties, it will be able to move around the grid and report it's location

### v0.02

Functionality will include:

1. adding terrain features. These features will be able to influence the rover in some way (mountains stopping movement, pitfalls)
2. adding new rover functionality. Idea's so far includes sample grabbers, cameras
3. Rover customisation. The rover will have "parts", additional objects that can be coded on to add features to the rover. Initial object will be a thruster for Z axis movement

### v0.03

Functionality will include

1. Z axis movement. This will allow the rover to go up or down, displaying the grid.
2. Random Grid generation/infinite grid generation - attempting to generate a random planet "surface" to work from.
3. "Vision" system - implement a basic concept of raytracing to enable vision, only allowing the user to see the grid that the drone can actually see.

## Layout

I plan to lay the code out into a few seperate files and folders

Grid - this will contain all data in relation to grid generation and maintanence. It should resolve down into a grid object that can be passed around to functions involving the rover
vehicle - this will contain all the data and functions in regard to vehicle functionality, this will not include any installed modules. Which will extend off a different function
Features - this will contain all code and information to terrain features and their effect on the game world.
Modules - this will contain all code and information in regards to modules installable onto the rover object.

## Testing and Development processes

I plan to use jest for unit testing, however I also hope to use github for issue tracking and making sure tests build properly before they are pushed to the main branch.

I hope to keep to a strong TDD methodology. However I expect initial code will be done code first testing after. Just to get the initial baselines for future tests completed first.
