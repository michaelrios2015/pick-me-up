//could be split into models and database
//could be split into models and database
const Sequelize = require("sequelize");
const { INTEGER, STRING, BOOLEAN, ENUM, DATE} = Sequelize;


//to see logging, do 'npm run start:dev:logger'
// const config = {
//   logging: false
// };




// if(process.env.LOGGING === 'true'){
//   delete config.logging
// }


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
    operatorsAliases: false,
  }
}


const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:JerryPine@localhost/basketball', config);
// const db = new Sequelize(
// 	process.env.DATABASE_URL || "postgres://localhost/basketball", config
// );

module.exports = db;
