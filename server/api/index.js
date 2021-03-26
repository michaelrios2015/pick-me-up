const express = require("express");
const { static } = express;
const path = require("path");
const passport = require("passport");

const app = express();
module.exports = app;

app.use(express.json());
app.use(passport.initialize());

app.use("/dist", static(path.join(__dirname, "..", "..", "dist")));
// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "..", "public")));

app.get("/", (req, res, next) =>
	res.sendFile(path.join(__dirname, "..", "..", "public/index.html"))
);

//the router :)
app.use("/api", require("./routes"));

//final error catcher
app.use((err, req, res, next) => {
	res.status(500).send({ error: err });
});
