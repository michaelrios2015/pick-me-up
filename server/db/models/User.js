const db = require("../db");
const Sequelize = require("sequelize");
const { STRING, INTEGER } = Sequelize;

// Auth
const bcrypt = require("bcrypt");

const User = db.define("user", {
	email: {
		type: STRING,
		unique: true,
		allowNull: false,
		validate: {
			isEmail: true,
		},
	},
	password: {
		type: STRING,
		allowNull: false,
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
});

User.prototype.validatePassword = async function (password) {
	const authStatus = await bcrypt.compare(password, this.password);
	console.log("AuthStatus" + authStatus);
	return authStatus;
};

// Salt passwords
User.beforeCreate(async (user, options) => {
	user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;
