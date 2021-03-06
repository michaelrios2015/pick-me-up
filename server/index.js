const Sequelize = require('sequelize');
const { db, models: { User, Request, Game, User_Game } } = require('./db');
const app = require('./api')

// should be able to add relationships here

//one to many relationship 
User.hasMany(Request);
Request.belongsTo(User);

Game.hasMany(Request);
Request.belongsTo(Game);

// not using for the moment leaving in just in case
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
    await Request.create({ location: 'COURT 1', open: false, time: i, userId: i});
  }
  //8 generic open requests
  for (let i = 1; i<= 8; i++){
    // let email = "test"+i+"@email.com";
    await Request.create({ location: 'COURT 1', time: 9-i, userId: i});
  }
  // an almost full game
  await Request.create({ location: 'COURT 1', time: 3, userId: 10});
  await Request.create({ location: 'COURT 1', time: 3, userId: 9});

  // a finished game
  await Game.create({ winner: 'Team A', finalScore: '100 - 2', done: true});

  // with scores and two people who were wait listed  
  await Request.create({ location: 'COURT 1', open: false, time: 1, userId: 1, gameId: 1, team: 'TEAM A', baskets: 98});
  await Request.create({ location: 'COURT 1', open: false, time: 1, userId: 2, gameId: 1, team: 'TEAM A', baskets: 2});
  await Request.create({ location: 'COURT 1', open: false, time: 1, userId: 3, gameId: 1, team: 'TEAM B', baskets: 0});
  await Request.create({ location: 'COURT 1', open: false, time: 1, userId: 4, gameId: 1, team: 'TEAM B', baskets: 2});
  await Request.create({ location: 'COURT 1', open: false, time: 1, userId: 5, gameId: 1, waitlist: true});
  await Request.create({ location: 'COURT 1', open: false, time: 1, userId: 6, gameId: 1, waitlist: true});

  //an ongoing game with one player on wait list
  await Game.create({});
  await Request.create({ location: 'COURT 1', time: 9, userId: 5, gameId: 2});
  await Request.create({ location: 'COURT 1', time: 9, userId: 6, gameId: 2});
  await Request.create({ location: 'COURT 1', time: 9, userId: 3, gameId: 2});
  await Request.create({ location: 'COURT 1', time: 9, userId: 1, gameId: 2});
  await Request.create({ location: 'COURT 1', time: 9, userId: 8, gameId: 2, waitlist: true});
  // await User_Game.create({ team: 'Team A', userId: 1, gameId: 1});
  // await User_Game.create({ team: 'Team A', userId: 2, gameId: 1});
  // await User_Game.create({ team: 'Team B', userId: 3, gameId: 1});
  // await User_Game.create({ team: 'Team B', userId: 4, gameId: 1});

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