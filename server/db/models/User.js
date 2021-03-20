const db = require("../db");
const Sequelize = require("sequelize");
const { STRING, FLOAT, INTEGER, ENUM, BOOLEAN, DATE } = Sequelize;

// Auth
const bcrypt = require("bcrypt");

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

module.exports = User;
