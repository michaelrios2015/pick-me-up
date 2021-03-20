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
	// console.log('---------------------------');
	// console.log(jwtSecret);
	const token = await jwt.sign(user, jwtSecret);
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
	let hash = "";

	// look up user
	try {
		user = await User.findOne({
			where: {
				email: req.body.email,
			},
		});

		hash = user.password;
	} catch (er) {
		res.status(401).send("User not found");
	}

	// compare hash with submitted password
	try {
		const authStatus = await authenticate(req.body.password, hash);
		if (authStatus) {
			const token = await generateAccessToken(req.body.email);
			res.status(200).json(token);
		} else {
			res.status(401).send("Invalid password");
		}
	} catch (er) {
		// throw new Error(er);
	}
});

// ------------------------------USERS--------------------------------------------

//Update user
app.put('/api/users/update/:id', async (req,res,next) => {
  try {
		const user = await User.findByPk(req.params.id)
		console.log(req.body);
    res.send(await user.update({
			email: req.body.email,
			name: req.body.name,
			height: req.body.height,
			description: req.body.description,
			photo: req.body.photo
		}))
  }
  catch(error) {
    next(error)
  }
})

//gets all users
app.get("/api/users", async (req, res, next) => {
	try {
		res.send(await User.findAll());
	} catch (ex) {
		next(ex);
	}
});

//gets a user
app.get("/api/users/:id", async (req, res, next) => {
	try {
		res.send(await User.findByPk(req.params.id));
	} catch (ex) {
		next(ex);
	}
});

// creates a user
app.post("/api/users", async (req, res, next) => {
	try {
		res.status(201).send(await User.create(req.body));
	} catch (ex) {
		next(ex);
	}
});

//deletes a user
app.delete("/api/users/:id", async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.id);
		await user.destroy();
		res.sendStatus(204);
	} catch (ex) {
		next(ex);
	}
});


app.use('/api', require('./routes'))

//final error catcher 
app.use((err, req, res, next)=>{
  res.status(500).send({ error: err });
});
