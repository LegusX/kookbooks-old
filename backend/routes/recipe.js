import { Router } from "express";
import { ensureLoggedIn } from "connect-ensure-login";

const router = new Router();

//create new recipe
router.post("/", ensureLoggedIn("/login"), async (req, res) => {
	try {
		//validation
		if (req.body.name && req.body.name.length < 3)
			return res.status(400).send("name");
		if (typeof req.body.description !== "string") return res.status(400).end();
		if (!req.body.ingredients && !req.body.ingredients.length)
			return res.status(400).end();
		if (req.body.ingredients.length < 1)
			return res.status(400).send("ingredients");
		if (!req.body.directions && !req.body.directions.length)
			return res.status(400).end();
		if (req.body.directions.length < 1)
			return res.status(400).send("directions");

		const book = await req.db.Book.findById(req.body.book);
		if (book === null) return res.status(404).end("Book not found!");
		//check if user has authority to add recipes to this cookbook
		//will have to test more thoroughly when we add permissions
		if (
			book.user.equals(req.user._id) ||
			book.editors.some((user) => user.equals(req.user._id)).length === 1
		) {
			const recipe = new req.db.Recipe({
				name: req.body.name,
				description: req.body.description,
				directions: req.body.directions,
				user: req.user._id,
				ingredients: req.body.ingredients,
				books: [book._id],
				images: [],
				thumbnail: req.body.thumbnail,
			});
			recipe.save();
			res.status(201).json(recipe.clean());
		} else return res.status(403).send("Unauthorized");
	} catch (e) {
		console.error(e);
		res.status(500).send("Failed to POST recipe");
	}
});

//get recipe by id
router.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const recipe = await req.db.Recipe.findById(id);
		if (recipe === null) return res.status(404).end();
		else {
			res.status(200).json(recipe.clean());
		}
	} catch (e) {
		console.error(e);
		res.status(500).send("Failed to GET recipe");
	}
});

export default router;
