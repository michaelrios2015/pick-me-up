const router = require('express').Router();
const { models: {User, Game}  } = require('../../db');
const { Op } = require("sequelize");

//gets all games
router.get("/", async (req, res, next) => {
	try {
		res.send(await Game.findAll());
	} catch (ex) {
		next(ex);
	}
});

//gets all open games
router.get('/open/:zipcode', async(req, res, next)=> {
  try {
    res.send(await Game.findAll({
      where: {
        open: true,
				zipcode: req.params.zipcode
      },
			include: [ User ]
    }));
  }
  catch(ex){
    next(ex);
  }
});

//gets all closed games
router.get('/closed', async(req, res, next)=> {
  try {
    res.send(await Game.findAll({
			where: {
				[Op.and]: [
					{ open: false },
					{ finalScore: { [Op.not]: null } }
				],
			},
			include: { 
				model: User,
			} 
    }));
  }
  catch(ex){
    next(ex);
  }
});

//gets all closed games
router.get('/hosted/:id', async(req, res, next)=> {
  try {
    res.send(await Game.findAll({
			where: {
				host: req.params.id
			},
			include: { 
				model: User,
			} 
    }));
  }
  catch(ex){
    next(ex);
  }
});

//gets a game
router.get('/:id', async(req, res, next)=> {
  try {
    res.send(await Game.findByPk(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});

// creates a game
router.post("/", async (req, res, next) => {
	try {
		console.log(req.body)
		res.status(201).send(await Game.create(req.body));
	} catch (ex) {
		next(ex);
	}
});

// updates a game
router.put("/:id", async (req, res, next)=> {
	try{
		const game = await Game.findByPk(req.params.id);
		res.status(201).send(await game.update(req.body));
	}
	catch(ex){
		next(ex);
	}
})

//deletes a game
router.delete("/:id", async (req, res, next) => {
	try {
		const game = await Game.findByPk(req.params.id);
		await game.destroy();
		res.sendStatus(204);
	} catch (ex) {
		next(ex);
	}
});





module.exports = router;