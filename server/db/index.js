const db = require("./db");
const Game = require("./models/Game");
const Request = require("./models/Request");
const UserGame = require("./models/UserGame");
const User = require("./models/User");
const Message = require("./models/Message");
require('dotenv').config();

module.exports = {
	// Include your models in this exports object as well!
	db,
	models: {
		User,
		Request,
		Game,
		UserGame,
		Message
	},
};

//one to many relationship
User.hasMany(Request);
Request.belongsTo(User);

Game.hasMany(Request);
Request.belongsTo(Game);

// sequelize makes us do this to use include 
User.belongsToMany(Game, { through: UserGame });
Game.belongsToMany(User, { through: UserGame });
User.hasMany(UserGame);
UserGame.belongsTo(User);
Game.hasMany(UserGame);
UserGame.belongsTo(Game);

Message.belongsToMany(User, { through: UserGame });
User.belongsToMany(Message, { through: UserGame });
Message.belongsToMany(Game, { through: UserGame });
Game.belongsToMany(Message, { through: UserGame });
Message.hasMany(UserGame);
UserGame.belongsTo(Message);
