import { Router } from "express";

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
			let book = books[i];
			delete book.subscribers;
			books[i] = book;
		}
		res.status(200).json(books);
	} catch (e) {
		console.error(e);
		res.status(500).send("Failed to GET book");
	}
});

router.post("/", async (req, res) => {
	try {
	} catch (e) {
		console.error(e);
		res.status(500).send("Failed to POST book");
	}
});

export default router;
