//could be split into models and database
const Sequelize = require("sequelize");
const { INTEGER, STRING, BOOLEAN, ENUM, DATE} = Sequelize;
const { db } = require('./index');

console.log('*****************************************')
console.log(db)

const a = 'hi'

const b = 'bye'

module.exports = { a, b };
