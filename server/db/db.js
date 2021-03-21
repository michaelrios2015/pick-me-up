const Sequelize = require("sequelize");

//taken from Nick
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

// console.log(process.env.LOGGING)

if(process.env.LOGGING){
  // console.log('in this if statement ---------------------------')
  delete config.logging
}

// const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:JerryPine@localhost/basketball', config);
const db = new Sequelize(
	process.env.DATABASE_URL || "postgres://localhost/basketball", config
);

module.exports = db;
