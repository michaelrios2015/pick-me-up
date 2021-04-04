// Import User model
const {
	models: { User },
} = require("../../db");

// Passport JS
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

// Password Hashing
const bcrypt = require("bcrypt");

// Email + Password Local Login
passport.use(
	new LocalStrategy(
		// options
		{ usernameField: "email", passwordField: "password" },
		// verify callback
		async function (email, password, done) {
			try {
				const user = await User.findOne({
					where: { email: email },
				});

				if (!user) {
					return done(null, false, { message: "Incorrect email address" });
				}

				const auth = await user.validatePassword(password);

				if (!auth) {
					return done(null, false, { message: "Incorrect password" });
				}

				const sanitizedUser = {
					id: user.id,
					email: user.email,
				};

				return done(null, sanitizedUser);
			} catch (err) {
				console.log(err);
				return done(null, false, { message: err });
			}
		}
	)
);

// JWT API Authentication
passport.use(
	new JWTStrategy(
		{
			secretOrKey: process.env.JWT,
			jwtFromRequest: ExtractJWT.fromUrlQueryParameter("pickmeup-token"),
		},
		async function (token, done) {
			try {
				const user = await User.findOne({
					where: {
						id: token.id,
					},
				});

				if (!user) {
					return done(null, false, { message: "No user found" });
				}

				const sanitizedUser = {
					id: user.id,
					email: user.email,
				};

				return done(null, sanitizedUser);
			} catch (err) {
				done(err, false);
			}
		}
	)
);
