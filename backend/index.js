import express, { json } from "express";
import db from "./db/models/index.cjs";
import * as dotenv from "dotenv";

//routes
import UserRoute from "./routes/user/user.js";

dotenv.config();

const app = express();

app.use((req, res, next) => {
	req.db = db;
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
