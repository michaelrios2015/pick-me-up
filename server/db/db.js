//could be split into models and database
//could be split into models and database
const Sequelize = require("sequelize");

let config;
if (process.env.DATABASE_URL) {
  config = {
    logging: false,
    operatorsAliases: false,
    dialect: "postgres",
    protocol: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
} else {
  config = {
    logging: false,
    // operatorsAliases: false,
  }
}
// const client = new Sequelize(dbUrl, config)

//to see logging, do 'npm run start:dev:logger'
// const config = {
//   logging: false
// };

if(process.env.LOGGING === 'true'){
  delete config.logging
}

// const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:JerryPine@localhost/basketball');
const db = new Sequelize(
	process.env.DATABASE_URL || "postgres://localhost/basketball", config
);

module.exports = db;
