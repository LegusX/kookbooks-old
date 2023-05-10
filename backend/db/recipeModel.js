export default function (mongoose) {
	const schema = new mongoose.Schema({
		name: String,
		text: String,
		user: mongoose.ObjectId,
		ingredients: [{ type: mongoose.ObjectId, ref: "Ingredient" }],
		books: [{ type: mongoose.ObjectId, ref: "Book" }],
		images: [{ type: mongoose.ObjectId, ref: "Image" }],
	});
	schema.query.byUser = function (id) {
		return this.where({ user: id });
	};
	schema.query.byBook = function (id) {
		return this.where({ id: { $in: this.books } });
	};
	const Model = mongoose.model("Recipe", schema);
	return Model;
}
