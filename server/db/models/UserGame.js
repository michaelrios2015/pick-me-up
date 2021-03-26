const db = require('../db')
const Sequelize = require('sequelize')
const { STRING } = Sequelize;

//this is the through table to connect users to a game 
const UserGame = db.define('usergame', {
  team: {
    type: STRING,
  }
});


module.exports = UserGame;
