import { Router } from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import { compareSync } from "bcrypt";
import db from "../db/db.js";

passport.use(
	new LocalStrategy(
		{ passReqToCallback: true },
		(req, username, password, callback) => {
			console.log(req);
			req.db.User.findOne({ username: username }).then((user) => {
				if (user === null) return callback(403);

				if (compareSync(password, user.password)) {
					console.log("authenticated");
					callback(null, user);
				} else {
					console.log("failed to authenticate");
					return callback(404);
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
			successRedirect: "/",
			failureRedirect: "/auth/login",
		})
	);

	router.post("logout", (req, res, next) => {
		req.logout((err) => {
			if (err) return next(err);
			res.redirect("/");
		});
	});

	return router;
}
