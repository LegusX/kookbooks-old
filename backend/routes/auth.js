import { Router } from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import { compareSync } from "bcrypt";

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
			successReturnToOrRedirect: "/api",
			failureRedirect: "/asdf",
		})
	);

	router.post("/logout", (req, res, next) => {
		req.logout((err) => {
			if (err) return next(err);
			res.json(null);
		});
	});

	router.get("/logout", (req, res) => {
		res.json(null);
	});

	router.get("/self", (req, res) => {
		console.log(req.user);
		if (req.user)
			res.status(200).json({
				name: req.user.name,
				username: req.user.username,
				id: req.user.id,
			});
		else res.status(200).json(null);
	});

	router.post("/", async (req, res) => {
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
				user.save();

				//authenticate user
				req.login(user, (err) => {
					if (err) return console.log(err); //idk what kind of errors are going to appear so we'll just ditch them
					res.redirect("/home");
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
