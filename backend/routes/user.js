import { Router } from "express";

const router = new Router();

//get information for given user id
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
