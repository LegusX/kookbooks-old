export default function (mongoose) {
	const schema = new mongoose.Schema({
		name: String,
		description: String,
		directions: [String],
		user: mongoose.ObjectId,
		// ingredients: [{ type: mongoose.ObjectId, ref: "Ingredient" }],
		ingredients: [String],
		books: [{ type: mongoose.ObjectId, ref: "Book" }],
		images: [{ type: mongoose.ObjectId, ref: "Image" }],
		thumbnail: { type: mongoose.ObjectId, ref: "Image" },
	});
	schema.query.byUser = function (id) {
		return this.where({ user: id });
	};
	schema.query.byBook = function (id) {
		return this.where({ id: { $in: this.books } });
	};
	schema.methods.clean = function () {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			directions: this.directions,
			ingredients: this.ingredients,
			user: this.id,
			thumbnail: this.thumbnail,
		};
	};
	const Model = mongoose.model("Recipe", schema);
	return Model;
}
