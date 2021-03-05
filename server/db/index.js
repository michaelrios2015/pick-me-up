//could be split into models and database
const Sequelize = require('sequelize');
const { INTEGER, STRING } = Sequelize;
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:JerryPine@localhost/basketball');
// const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/basketball');

//So we can include a ton more personal information but just wanted to get
// us started
const User = db.define('user', {
  email: { 
    type: STRING, 
  },
  password: { 
    type: STRING, 
  }     
},{ timestamps: false });

//Everything has been simplified to get us started :)
const Request = db.define('request', {
    location: {  
      type: STRING, 
    },
    // I think date and time can go together, keeping it very simple at the moment
    // just time date will be added back  
    time: { 
        type: INTEGER, 
      }     
  },{ timestamps: false });

const Game = db.define('game', {
    // i think this data needs to be repeated as it can be different from the 
    // requets 
    location: {  
      type: STRING, 
    },
    // I think date and time can go together, keeping it very simple at the moment
    // just time date will be added back  
    time: { 
        type: INTEGER, 
      },
    winner: { 
        type: STRING, 
      },  
    finalScore: { 
        type: STRING, 
      },       
  },{ timestamps: false });  

module.exports = {
    // Include your models in this exports object as well!
    db,
    models: {
      User, 
      Request,
      Game
    }
  }
