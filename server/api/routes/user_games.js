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


//creates a user-game link
router.post('/', async(req, res, next)=> {
	try{
		res.status(201).send(await UserGame.create(req.body));
	}
	catch(ex){
		next(ex);
	}
})

module.exports = router;


