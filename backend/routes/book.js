import { Router } from "express";

const router = new Router();

router.get("/", async (req, res) => {
	try {
		const id = req.query.id;
		const limit = parseInt(req.query.limit);

		const books = await req.db.Book.find({ _id: { $gt: id } }).limit(20);

		for (let i = 0; i < books.length; i++) {
			let book = books[i];
			delete book.subscribers;
			books[i] = book;
		}
		res.status(200).json(books);
	} catch (e) {
		console.error(e);
		res.status(500).send("Failed to GET recipes");
	}
});
