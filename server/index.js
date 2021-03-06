const Sequelize = require('sequelize');
const { db, models: { User, Request, Game, User_Game } } = require('./db');
const app = require('./api')

// should be able to add relationships here

  //one to many relationship 
User.hasMany(Request);
Request.belongsTo(User);

Game.hasMany(Request);
Request.belongsTo(Game);



// sequelize makes us do this to use include 
User.belongsToMany(Game, { through: User_Game });
Game.belongsToMany(User, { through: User_Game });
User.hasMany(User_Game);
User_Game.belongsTo(User);
Game.hasMany(User_Game);
User_Game.belongsTo(Game);


const syncAndSeed = async()=> {
  await db.sync({ force: true });
  //10 generic users
  for (let i = 1; i<= 10; i++){
    let email = "test"+i+"@email.com";
    await User.create({ email, password: '123'});
  }
  //10 generic requests closed request so past requests
  for (let i = 1; i<= 10; i++){
    // let email = "test"+i+"@email.com";
    await Request.create({ location: 'Court 1', open: false, time: i, userId: i});
  }
  //10 generic open requests
  for (let i = 1; i<= 10; i++){
    // let email = "test"+i+"@email.com";
    await Request.create({ location: 'Court 1', time: 11-i, userId: i});
  }


    

  await Game.create({ location: 'Court 1', time: 1, winner: 'Team A', finalScore: '100 - 2', done: true});

  // The four request for game one, I cheated here.  Once we get 4 rquest we would make a game
  // then update the gameID for these guys and ideally make some sort of waiting list 
  await Request.create({ location: 'Court 1', open: false, time: 1, userId: 1, gameId: 1});
  await Request.create({ location: 'Court 1', open: false, time: 1, userId: 2, gameId: 1});
  await Request.create({ location: 'Court 1', open: false, time: 1, userId: 3, gameId: 1});
  await Request.create({ location: 'Court 1', open: false, time: 1, userId: 4, gameId: 1});
    
  await User_Game.create({ team: 'Team A', userId: 1, gameId: 1});
  await User_Game.create({ team: 'Team A', userId: 2, gameId: 1});
  await User_Game.create({ team: 'Team B', userId: 3, gameId: 1});
  await User_Game.create({ team: 'Team B', userId: 4, gameId: 1});

};

const init = async()=> {
    try {
      await syncAndSeed();
      const port = process.env.PORT || 3000;
      app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch(ex){
      console.log(ex);
    }
  };


init();