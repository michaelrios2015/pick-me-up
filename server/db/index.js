//could be split into models and database
const Sequelize = require("sequelize");
const { INTEGER, STRING, BOOLEAN, ENUM, DATE } = Sequelize;
const db = require("./db");
const Game = require("./models/Game");
const Request = require("./models/Request");
const UserGame = require("./models/UserGame");
const User = require("./models/User");

module.exports = {
	// Include your models in this exports object as well!
	db,
	models: {
		User,
		Request,
		Game,
		UserGame,
	},
};
