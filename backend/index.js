import express, { json } from "express";
import * as dotenv from "dotenv";
import db, {connectURI} from "./db/db.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import { ensureLoggedIn } from "connect-ensure-login";
import cors from "cors";

dotenv.config();

//routes
import UserRoute from "./routes/user.js";
import AuthRoute from "./routes/auth.js";
import BookRoute from "./routes/book.js";
import RecipeRoute from "./routes/recipe.js";
import ImageRoute from "./routes/image.js";

db().then(({ mongoose, models }) => {
	try {
		//setup authentication

		const app = express();

		app.use(cors());

		app.use((req, res, next) => {
			req.db = { mongoose, ...models };
			next();
		});

		app.use(express.static("public"));

		app.use(
			session({
				secret: process.env.SECRET,
				saveUninitialized: false,
				resave: false,
				store: MongoStore.create({
					mongoUrl: connectURI,
					touchAfter: 24 * 3600, //only update session once per 24 hours
					ttl: 60 * 60 * 24 * 30, //session lasts for a month
				}),
				cookie: {
					sameSite: "strict",
					// secure: true,
					// httpOnly: process.env.NODE_ENV === "development",
				},
			})
		);

		app.use(passport.authenticate("session"));

		app.use(json());

		app.use("/user", UserRoute);
		app.use("/book", BookRoute);
		app.use("/recipe", RecipeRoute);
		app.use("/auth", AuthRoute(models));
		app.use("/image", ensureLoggedIn("/login"), ImageRoute);

		app.get("/", (req, res) => {
			res.send("Hello world");
		});

		app.listen(process.env.PORT, "127.0.0.1", () => {
			console.log("Server listening on port: " + process.env.PORT);
		});
	} catch (e) {
		console.error(e);
	}
});

//an attempt to make nodemon actually kill the process after a crash

process.once("SIGUSR2", function () {
	process.kill(process.pid, "SIGUSR2");
});

process.on("SIGINT", function () {
	// this is only called on ctrl+c, not restart
	process.kill(process.pid, "SIGINT");
});
