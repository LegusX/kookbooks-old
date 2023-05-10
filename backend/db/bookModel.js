export default function (mongoose) {
	const schema = new mongoose.Schema({
		name: { type: String, required: true },
		description: String,
		user: { type: mongoose.ObjectId, ref: "User" },
		thumbnail: { type: mongoose.ObjectId, ref: "Image" },
		subscribers: [{ type: mongoose.ObjectId, ref: "User" }],
		recipes: [{ type: mongoose.ObjectId, ref: "Recipe" }],
	});
	const Model = mongoose.model("Book", schema);
	return Model;
}
