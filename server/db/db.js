//could be split into models and database
//could be split into models and database
const Sequelize = require("sequelize");
const { INTEGER, STRING, BOOLEAN, ENUM, DATE} = Sequelize;


//to see logging, do 'npm run start:dev:logger'
const config = {
  logging: false
};

if(process.env.LOGGING === 'true'){
  delete config.logging
}

// const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:JerryPine@localhost/basketball');
const db = new Sequelize(
	process.env.DATABASE_URL || "postgres://localhost/basketball", config
);

module.exports = db;
