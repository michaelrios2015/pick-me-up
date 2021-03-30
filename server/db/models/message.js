const db = require('../db');
const Sequelize = require('sequelize');
const { STRING, INTEGER } = Sequelize;

const Message = db.define('message', {
  content: {
    type: STRING(1000)
  },
  chatId: {
    type: INTEGER
  },
  sender: {
    type: STRING
  },
  date: {
    type: STRING
  }
});

module.exports = Message;