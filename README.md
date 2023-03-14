# Basic Concept and Terminology

This project is primarily designed to build cubes and/or keep track of card collections for Magic: The Gathering. Traditionally a box of Magic card booster packs you would buy at the store would be drafted among players who would then build a deck to play with. Since this way of play only allows for one draft before the booster packs are used up and is limited to the cards contained in the particular set of the booster box, a cube is a system that allows for a customizable and repeatable draft experience using cards from any of the sets printed throughout the game's history that a player might have access to.

# Starting the Redis Client

This project uses Redis for authentication. It will check a username and password associated in the database then create a session ID which allows the user to create/update/delete whole cubes and/or cards within specific cubes.

Redis must be installed which can be done at https://redis.io/docs/getting-started/
Once you have Redis up and running, and can connect using the command `redis-cli` in the terminal

# Starting the Node Server

This Project uses Node.js to build the server which handles API requests to the Magic card database called Scryfall and updates to the database containing information about users and their cubes.

After starting the redis client one can start the server which will run locally on port 3001. To do this change directory into the /api folder in the terminal. Once in this directory run the following commands:

1. `npm install`
2. `node server.js`

# Starting the Application

After starting the Redis Client and the Node server navigate to the root directory and run the following commands:

1. `npm install`
2. `npm start`

# Some Notes

-Creating a new account will not automatically log the user in with those credentials. They must log in after creating an account

-As of now creating a new cube will not automatically render it to the user's list of cubes. After creating a cube the page must be refreshed to see to cube on the user's list of cubes.

-When adding cards to a cube the name of the card added must be identical to an existing card within the Scryfall API. Typos will result in a card not being added a cube. Once a card is added the icon to the left of the card's listing can be hovered over to show a pop-up of the card.

-Some card names to try adding within a cube could be cards like Black Lotus, Time Walk, Dark Ritual, Giant Growth, Etc.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
