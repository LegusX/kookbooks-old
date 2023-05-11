import express from "express";
import models from "./db/models/index.cjs";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
	res.send("Hello world");
});

app.listen(process.env.PORT, () => {
	console.log("Server listening on port: " + process.env.PORT);
});
