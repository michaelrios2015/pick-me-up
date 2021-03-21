const { db, models: { User, Game, UserGame } } = require('./index');
const faker = require('faker');

//I am sure there us a more elegant way of doing this 

const syncAndSeed = async()=> {
  await db.sync({ force: true });
  //10 generic users
  for (let i = 1; i<= 20; i++){
    let age = Math.floor(Math.random() * 20 + 16);
    let description = faker.lorem.sentence();
    let email = "test"+i+"@email.com";
    let height = Math.ceil(Math.random() * 3 + 4) + '\'';
    let name = faker.name.firstName();
    await User.create({ age, description, email, height, name, password: '123'});
  }
  
  //8 generic open requests with UserGame
  for (let i = 1; i<= 8; i++){
    // let email = "test"+i+"@email.com";
    await Game.create({location: 'COURT 1', dateAndTime: new Date()});
    await UserGame.create({ userId: i, gameId: i });
    // await Request.create({ location: 'COURT 1', time: 9-i, userId: i, gameId: i});
  }

  //creating some data for user
  await User.create({ email: "MichaelJordan@gmail.com", name: 'Michael Jordan', age: 21, height:'6\'6', description: "GOAT", photo: 'https://media.gq.com/photos/5e99bf6fe5102200088e8eb2/3:4/w_1107,h_1476,c_limit/GQ-MichaelJordan-041720.jpg', password: "helloworld", })

  // an almost full game
  const gameNine = await Game.create({location: 'COURT 1', open: true, dateAndTime: new Date(), maxPlayers: 4});// adding time to the game start-time to simulate a future game 
  gameNine.time += 9000;
  await gameNine.save();
  await UserGame.create({ userId: 10, gameId: 9 });
  await UserGame.create({ userId: 9, gameId: 9 });

  // a finished game
  await Game.create({ winner: 'TEAM A', finalScore: '100 - 2', done: true, location: 'COURT 1', open: false, dateAndTime: new Date() });
  await UserGame.create({ userId: 1, gameId: 10, team: 'TEAM A' });
  await UserGame.create({ userId: 2, gameId: 10, team: 'TEAM A'  });
  await UserGame.create({ userId: 3, gameId: 10, team: 'TEAM B'  });
  await UserGame.create({ userId: 4, gameId: 10, team: 'TEAM B'  });

  //an ongoing game (or game about to happen) with one player on wait list
  await Game.create({ location: 'COURT 1', open: false, dateAndTime: new Date() });
  await UserGame.create({ userId: 5, gameId: 11 });
  await UserGame.create({ userId: 6, gameId: 11 });
  await UserGame.create({ userId: 3, gameId: 11 });
  await UserGame.create({ userId: 1, gameId: 11 });

  // another random game finished game
  await Game.create({ winner: 'TEAM B', finalScore: '60 - 42', done: true, location: 'COURT 2', open: false, dateAndTime: new Date() });
  await UserGame.create({ userId: 10, gameId: 12 });
  await UserGame.create({ userId: 9, gameId: 12 });
  await UserGame.create({ userId: 8, gameId: 12 });
  await UserGame.create({ userId: 7, gameId: 12 });

  // a finished game
  await Game.create({ winner: 'TEAM B', finalScore: '44 - 18', done: true, location: 'COURT 3', open: false, dateAndTime: new Date() });
  await UserGame.create({ userId: 1, gameId: 13, team: 'TEAM A' });
  await UserGame.create({ userId: 2, gameId: 13, team: 'TEAM A'  });
  await UserGame.create({ userId: 3, gameId: 13, team: 'TEAM B'  });
  await UserGame.create({ userId: 4, gameId: 13, team: 'TEAM B'  });

  await Game.create({ winner: 'TEAM B', finalScore: '67 - 45', done: true, location: 'COURT 5', open: false, dateAndTime: new Date() });
  await UserGame.create({ userId: 1, gameId: 14, team: 'TEAM A' });
  await UserGame.create({ userId: 2, gameId: 14, team: 'TEAM A'  });
  await UserGame.create({ userId: 3, gameId: 14, team: 'TEAM B'  });
  await UserGame.create({ userId: 4, gameId: 14, team: 'TEAM B'  });

  await Game.create({ winner: 'TEAM A', finalScore: '123 - 111', done: true, location: 'COURT 4', open: false, dateAndTime: new Date() });
  await UserGame.create({ userId: 1, gameId: 15, team: 'TEAM A' });
  await UserGame.create({ userId: 2, gameId: 15, team: 'TEAM A'  });
  await UserGame.create({ userId: 3, gameId: 15, team: 'TEAM B'  });
  await UserGame.create({ userId: 4, gameId: 15, team: 'TEAM B'  });
  

};

module.exports = syncAndSeed;