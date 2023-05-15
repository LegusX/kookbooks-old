import { Router } from "express";
import { hash } from "bcrypt";
import mongoose from "mongoose";

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const emailRegex = new RegExp(
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
);

const router = new Router();

router.get("/:id", async (req, res) => {
	try {
		//eventually include check for authenticated user, and if they are requesting themselves, give full details
		const user = await req.db.User.findById(req.params.id);
		if (user === null) res.status(404).end();
		else res.status(200).json(user.clean());
	} catch (e) {
		console.error(e);
		res.status(500).send("Failed to GET user");
	}
});

//TODO: Authenticate both requests so that you can only see your own books and recipes

//get all recipes written by user
router.get("/:id/recipes", async (req, res) => {
	try {
		const recipes = await req.db.Recipe.find({ user: req.params.id });
		res.json(recipes.map((recipe) => recipe.clean()));
	} catch (e) {
		console.error(e);
		res.status(500).send("Failed to GET user's recipes");
	}
});

//get all books subscribed to by user
router.get("/:id/books", async (req, res) => {
	try {
		const books = await req.db.Book.find({
			subscribers: req.params.id,
		});
		res.json(books.map((book) => book.clean()));
	} catch (e) {
		console.error(e);
		res.status(500).send("Failed to GET user's subscribed booksa");
	}
});

export default router;
