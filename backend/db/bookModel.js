export default function (mongoose) {
	const schema = new mongoose.Schema({
		name: { type: String, required: true },
		description: String,
		user: { type: mongoose.ObjectId, ref: "User", required: true },
		thumbnail: { type: mongoose.ObjectId, ref: "Image" },
		subscribers: [{ type: mongoose.ObjectId, ref: "User" }],
		recipes: [{ type: mongoose.ObjectId, ref: "Recipe" }],
	});
	schema.methods.clean = function () {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			thumbnail: this.thumbnail,
			recipes: this.recipes,
			user: this.user,
		};
	};
	const Model = mongoose.model("Book", schema);
	return Model;
}
