import { Router } from "express";
import { ensureLoggedIn } from "connect-ensure-login";
import mongoose from "mongoose";

const router = new Router();

// allows user to go through public books, page by page
// kookbooks.app/book?id={{ObjectId}}&limit=20
router.get("/", async (req, res) => {
	try {
		const id = req.query.id;
		//don't allow more than 50 books to be requested at a time
		const limit =
			parseInt(req.query.limit) > 50 ? 50 : parseInt(req.query.limit);
		let books = [];

		if (id == 0) books = await req.db.Book.find().limit(limit);
		else books = await req.db.Book.find({ _id: { $gt: id } }).limit(limit);

		for (let i = 0; i < books.length; i++) {
			books[i] = books[i].clean();
		}
		res.status(200).json(books);
	} catch (e) {
		console.error(e);
		res.status(500).send("Failed to GET books");
	}
});

//create book
router.post("/", ensureLoggedIn("/login"), async (req, res) => {
	try {
		if (req.body.name.length < 3) res.status(400).send("name");

		const book = new req.db.Book({
			name: req.body.name,
			description: req.body.description,
			user: req.user._id,
			// thumbnail:???
			subscribers: [req.user._id],
		});
		book.save();
		res.status(201).json(book.clean());
	} catch (e) {
		console.error(e);
		res.status(500).send("Failed to POST book");
	}
});

//get book by id
router.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		if (id.length !== 24) return res.status(400).end();

		const book = await req.db.Book.findById(id);
		if (book === null) return res.status(404).end();
		else res.json(book.clean());
	} catch (e) {
		console.error(e);
		res.status(500).send("Failed to GET book");
	}
});

export default router;
