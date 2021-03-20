const router = require("express").Router();

const {
	models: { User },
} = require("../../db");

// Authentication
const bcrypt = require("bcrypt");

async function authenticate(password, hash) {
	const authStatus = await bcrypt.compare(password, hash);
	return authStatus;
}

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT;

async function generateAccessToken(user) {
	const token = await jwt.sign({ userId: user.id }, jwtSecret);
}

// login user
router.post("/", async (req, res, next) => {
	// look up user
	try {
		user = await User.findOne({
			where: {
				email: req.body.email,
			},
		});
		console.log(user.password);
		const authStatus = await authenticate(req.body.password, user.password);
		console.log(authStatus);

		if (authStatus) {
			const token = await generateAccessToken(user);
			res.status(200).json({ token: token, userId: user.id });
		} else {
			res.status(401).send("Invalid password");
		}
	} catch (er) {
		res.status(401).send("User not found");
	}

	// compare hash with submitted password
});

module.exports = router;
