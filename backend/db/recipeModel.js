export default function (mongoose) {
	const schema = new mongoose.Schema({
		name: String,
		text: String,
		user: mongoose.ObjectId,
		ingredients: [{ type: mongoose.ObjectId, ref: "Ingredient" }],
		books: [{ type: mongoose.ObjectId, ref: "Book" }],
		images: [{ type: mongoose.ObjectId, ref: "Image" }],
	});
	schema.statics.init = function (models) {
		this.models = {};
		Object.getOwnPropertyNames((name) => {
			this.models[name] = models[name];
		});
	};
	const Model = mongoose.model("Recipe", schema);
	return Model;
}
