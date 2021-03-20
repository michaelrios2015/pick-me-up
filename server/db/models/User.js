const db = require('../db')
const Sequelize = require('sequelize')
const { STRING, FLOAT, INTEGER, ENUM, BOOLEAN, DATE } = Sequelize;

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


module.exports = User;
