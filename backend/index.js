import express, { json } from "express";
import * as dotenv from "dotenv";
import db from "./db/db.js";

//routes
import UserRoute from "./routes/user.js";

dotenv.config();
db().then(({ mongoose, models }) => {
	const app = express();

	app.use((req, res, next) => {
		req.db = { mongoose, ...models };
		next();
	});

	app.use(json());

	app.use("/user", UserRoute);

	app.get("/", (req, res) => {
		res.send("Hello world");
	});

	app.listen(process.env.PORT, "127.0.0.1", () => {
		console.log("Server listening on port: " + process.env.PORT);
	});
});
