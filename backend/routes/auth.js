import { Router } from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import { compareSync } from "bcrypt";

passport.use(
	new LocalStrategy(
		{ passReqToCallback: true },
		(req, username, password, callback) => {
			req.db.User.findOne({ username: username }).then((user) => {
				if (user === null) return callback(403);

				if (compareSync(password, user.password)) {
					callback(null, user);
				} else {
					return callback(null, false);
				}
			});
		}
	)
);

export default function (models) {
	passport.serializeUser((user, done) => {
		process.nextTick(() => {
			done(null, user.id);
		});
	});

	passport.deserializeUser((id, done) => {
		process.nextTick(async () => {
			const user = await models.User.findById(id);
			if (user === null) return done("Cannot find user: " + id);
			return done(null, user);
		});
	});

	const router = new Router();

	router.post(
		"/password",
		passport.authenticate("local", {
			successReturnToOrRedirect: "/",
			failureRedirect: "/auth/login",
		})
	);

	router.post("/logout", (req, res, next) => {
		req.logout((err) => {
			if (err) return next(err);
			res.redirect("/");
		});
	});

	return router;
}

// export passport