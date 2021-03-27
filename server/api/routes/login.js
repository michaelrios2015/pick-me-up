const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

require("../middleware/auth");

// POST /login
router.post(
	"/",
	passport.authenticate("local", { session: false }),
	(req, res) => {
		console.log(req.user);
		res.status(200).send(req.user);
	}
);

module.exports = router;
