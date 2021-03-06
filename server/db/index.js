//could be split into models and database
const Sequelize = require('sequelize');
const { INTEGER, STRING, BOOLEAN } = Sequelize;
// const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:JerryPine@localhost/basketball');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/basketball');

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
    },
  //it would be better if it just checked the time to see if it was an
  //open and closed request but this should work for now 
  open:{
    type:BOOLEAN,
    defaultValue: true
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
  // this should not be necessary, but seems like a nice safety measure for the moment
  done:{
    type:BOOLEAN,
    defaultValue: false
  }

},{ timestamps: false });  

  //this is the through table to connect users to a game 
const User_Game = db.define(
  "user_game",
  {
    team: Sequelize.STRING,
  },
  { timestamps: false }
);

module.exports = {
  // Include your models in this exports object as well!
  db,
  models: {
    User, 
    Request,
    Game,
    User_Game
  }
}
