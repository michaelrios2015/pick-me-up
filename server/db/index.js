//could be split into models and database
const Sequelize = require("sequelize");
const { INTEGER, STRING, BOOLEAN, ENUM, DATE} = Sequelize;
const db = require('./db');
const Game = require('./models/Game');
const Request = require('./models/Request');
const UserGame = require('./models/UserGame');

// Auth
const bcrypt = require("bcrypt");

//So we can include a ton more personal information but just wanted to get
// us started
const User = db.define(
	"user",
	{
		email: {
			type: STRING,
		},
		password: {
			type: STRING,
		},
		name: {
			type: STRING,
		},
		age: {
			type: INTEGER,
		},
		height: {
			type: STRING,
		},
		description: {
			type: STRING,
		},
		photo: {
			type: STRING,
		},
	},
	{ timestamps: false }
);

// Salt passwords
User.beforeCreate(async (user, options) => {
	user.password = await bcrypt.hash(user.password, 10);
});

module.exports = {
  // Include your models in this exports object as well!
  db,
  models: {
    User, 
    Request,
    Game,
    UserGame
  }
}
