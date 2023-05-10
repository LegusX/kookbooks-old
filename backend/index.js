import express, { json } from "express";
import * as dotenv from "dotenv";
import db from "./db/db.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";

//routes
import UserRoute from "./routes/user.js";
import AuthRoute from "./routes/auth.js";

dotenv.config();
db().then(({ mongoose, models }) => {
	//setup authentication

	const app = express();

	app.use((req, res, next) => {
		req.db = { mongoose, ...models };
		next();
	});

	app.use(
		session({
			secret: process.env.SECRET,
			saveUninitialized: false,
			resave: false,
			store: MongoStore.create({
				mongoUrl: `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`,
				touchAfter: 24 * 3600, //only update session once per 24 hours
				ttl: 60 * 60 * 24 * 30, //session lasts for a month
			}),
		})
	);

	app.use(passport.authenticate("session"));

	app.use(json());

	app.use("/user", UserRoute);

	app.use("/auth", AuthRoute(models));

	app.get("/", (req, res) => {
		res.send("Hello world");
	});

	app.listen(process.env.PORT, "127.0.0.1", () => {
		console.log("Server listening on port: " + process.env.PORT);
	});
});
