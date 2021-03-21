const router = require('express').Router();
const { models: {Request, User, Game}  } = require('../../db');

// not being used at the moment but could be if we have enough time

//gets all request
router.get("/", async (req, res, next) => {
	try {
		res.send(await Request.findAll({ include: [User, Game] }));
	} catch (ex) {
		next(ex);
	}
});

//gets all requests for a user joined with user and game :)
router.get("/user/:id", async (req, res, next) => {
	try {
		res.send(
			await Request.findAll({
				where: { userId: req.params.id },
				include: [User, Game],
			})
		);
	} catch (ex) {
		next(ex);
	}
});

//gets all requests for a user when they are associated with a game they might have been waitlisted
router.get("/user/game/:userId", async (req, res, next) => {
	try {
		res.send(
			await Request.findAll({
				where: {
					[Op.and]: [
						{ userId: req.params.userId },
						{ gameId: { [Op.not]: null } },
					],
				},
				include: [User, Game],
			})
		);
	} catch (ex) {
		next(ex);
	}
});

//gets all requests for a user when they are associated with a game and were not waitlisted so they most have played (in theory should check if game is over)
router.get("/user/game/played/:userId", async (req, res, next) => {
	try {
		res.send(
			await Request.findAll({
				where: {
					[Op.and]: [
						{ userId: req.params.userId },
						{ gameId: { [Op.not]: null } },
						{ waitlist: false },
					],
				},
				include: [User, Game],
			})
		);
	} catch (ex) {
		next(ex);
	}
});

//trying to just get the games won by user
// NOT WORKING, works with {winner: "TEAM A"}
router.get("/user/game/played/won/:userId",
	async (req, res, next) => {
		try {
			res.send(
				await Request.findAll({
					where: {
						[Op.and]: [
							{ userId: req.params.userId },
							{ gameId: { [Op.not]: null } },
							{ waitlist: false },
						],
					},
					include: [
						{ model: Game, where: { winner: Sequelize.col("request.team") } },
					],
				})
			);
		} catch (ex) {
			console.log(ex);
			next(ex);
		}
	}
);

//gets a request not sure if we will need this but it's easy to write
router.get("/:id", async (req, res, next) => {
	try {
		res.send(await Request.findByPk(req.params.id, { include: [User, Game] }));
	} catch (ex) {
		next(ex);
	}
});

// creates a request
router.post("/", async (req, res, next) => {
	try {
		res.status(201).send(await Request.create(req.body));
	} catch (ex) {
		next(ex);
	}
});

//deletes a user
router.delete("/:id", async (req, res, next) => {
	try {
		const request = await Request.findByPk(req.params.id);
		await request.destroy();
		res.sendStatus(204);
	} catch (ex) {
		next(ex);
	}
});

module.exports = router;