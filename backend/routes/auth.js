import { Router } from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import { compareSync } from "bcrypt";
import { hash } from "bcrypt";

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const emailRegex = new RegExp(
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
);

passport.use(
	new LocalStrategy(
		{ passReqToCallback: true },
		(req, username, password, callback) => {
			req.db.User.findOne({ username: username }).then((user) => {
				if (user === null) return callback(null, false);

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
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		const user = await models.User.findById(id);
		if (user === null) return done("Cannot find user: " + id);
		return done(null, user);
	});

	const router = new Router();

	router.post(
		"/password",
		passport.authenticate("local", {
//			successReturnToOrRedirect: "/api",
			successReturnToOrRedirect: "/",
			failureRedirect: "/asdf",
		})
	);

	router.post("/logout", (req, res, next) => {
		req.logout((err) => {
			if (err) return next(err);
			res.json(null);
		});
	});

	//allow client to get basic information about the signed in user, mainly for session management
	router.get("/self", (req, res) => {
		if (req.user)
			res.status(200).json({
				name: req.user.name,
				username: req.user.username,
				id: req.user.id,
			});
		else res.status(404).json(null);
	});

	router.post("/signup", async (req, res) => {
		try {
			//new user validation
			if (req.body.name.length < 3) res.status(400).send("name");
			else if (req.body.username.length < 4) res.status(400).send("username");
			else if (req.body.password.length < 8) res.status(400).send("password");
			else if (emailRegex.exec(req.body.email)[0] !== req.body.email)
				res.status(400).send("email");
			//check if email is already in use
			else if ((await req.db.User.findOne({ email: req.body.email })) !== null)
				res.status(409).send("email");
			//check if username is already in use
			else if (
				(await req.db.User.findOne({ username: req.body.username })) !== null
			)
				res.status(409).send("username");
			else {
				const password = await hash(req.body.password, SALT_ROUNDS);
				const user = new req.db.User({
					name: req.body.name,
					username: req.body.username,
					email: req.body.email,
					password,
					subscribedBooks: [],
					ownedBooks: [],
					recipes: [],
					images: [],
				});
				await user.save();

				//authenticate user
				req.login(user, (err) => {
					if (err) {
						res.status(500).end();
						return console.log(err);
					} //idk what kind of errors are going to appear so we'll just ditch them
					return res.status(200).end();
				});
			}
		} catch (e) {
			console.error(e);
			res.status(500).send("Failed to POST user");
		}

		res.end();
	});

	return router;
}
