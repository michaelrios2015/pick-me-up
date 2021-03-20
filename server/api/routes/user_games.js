const router = require('express').Router();
const { models: {User, Game, UserGame}  } = require('../../db');

//gets all user_games
router.get("/", async (req, res, next) => {
	try {
		res.send(await UserGame.findAll({ include: [User, Game] }));
	} catch (ex) {
		next(ex);
	}
});


//gets players of a single game
router.get('/:gameId/players', async(req, res, next)=> {
  try{
    const gameUsers = await UserGame.findAll({
      where: {
        gameId: req.params.gameId
      },
      include: [ User ]
    });
    const players = gameUsers.map(user => user.user);
    res.send(players);
  }
  catch(ex){
    next(ex);
  }
})


//creates a user-game link --- joins a player to a game
router.post('/', async(req, res, next)=> {
	try{
		const addPlayerToGame = await UserGame.create(req.body);
		const gameInfo = (await UserGame.findAll({
			where: {
				gameId: req.body.gameId
			},
			include: [ Game ]
		}));
		const playerCount = gameInfo.length;
		const game = await Game.findByPk(req.body.gameId);
		
		if(playerCount === game.maxPlayerCount){
			await game.update({
				open: false
			})
		}
		res.status(201).send(addPlayerToGame);
	}
	catch(ex){
		next(ex);
	}
})

module.exports = router;


