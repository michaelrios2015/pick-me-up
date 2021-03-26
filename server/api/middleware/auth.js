// Import User model
const {
	models: { User },
} = require("../../db");

// Passport JS
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Password Hashing
const bcrypt = require("bcrypt");

passport.use(
	new LocalStrategy(
		// options
		{ usernameField: "email", passwordField: "password" },
		// verify callback
		async function (email, password, done) {
			//	try {
			const user = await User.findOne({
				where: { email: email },
			});

			console.log(user);

			/* if (!user) {
					return done(null, false, { message: "Incorrect email address" });
				} */

			const auth = await user.validatePassword(password);

			console.log(auth);

			/* if (!auth) {
					return done(null, false, { message: "Incorrect password" });
				} */

			return done(null, user);
			//	} catch (err) {
			//		console.log(err);
			//		return done(null, false, { message: err });
			//	}
		}
	)
);
