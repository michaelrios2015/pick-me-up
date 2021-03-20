// THey put this top part in something app for grace shopper

//as this get's bigger you can seperate things out more
const express = require("express");
const { static } = express;
const path = require("path");
const axios = require("axios");
const {
	db,
	models: { User , Request, Game, UserGame },
} = require("../db");
// i think there is a way to get it from db...?
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

// Authentication
const bcrypt = require("bcrypt");

async function authenticate(password, hash) {
	const authStatus = await bcrypt.compare(password, hash);
	return authStatus;
}

const jwt = require("jsonwebtoken");
const jwtSecret = require("../../secrets");

async function generateAccessToken(user) {
	const token = await jwt.sign({ userId: user.id }, jwtSecret);
}

const app = express();
module.exports = app;

app.use(express.json());

app.use("/dist", static(path.join(__dirname, "..", "..", "dist")));
// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "..", "public")));

// is this supposed to be here??
app.get("/", (req, res, next) =>
	res.sendFile(path.join(__dirname, "..", "..", "public/index.html"))
);

// login user
app.post("/login", async (req, res, next) => {
	// look up user
	try {
		user = await User.findOne({
			where: {
				email: req.body.email,
			},
		});

		const authStatus = await authenticate(req.body.password, user.password);

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


app.use('/api', require('./routes'))

//final error catcher
app.use((err, req, res, next) => {
	res.status(500).send({ error: err });
});
