const db = require('../db')
const Sequelize = require('sequelize')
const { STRING, FLOAT, INTEGER, ENUM, BOOLEAN, DATE } = Sequelize;

// we are not using this for the moment but going to leave in just in case
//this is the through table to connect users to a game 
const UserGame = db.define('usergame', {
  team: {
    type: STRING,
  }
},{ timestamps: false });


// console.log(db);

module.exports = UserGame;
