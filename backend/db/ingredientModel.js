export default function (mongoose) {
	const schema = new mongoose.Schema({
		name: String,
		recipes: [{ type: mongoose.ObjectId, ref: "Recipe" }],
	});
	const Model = mongoose.model("Ingredient", schema);
	return Model;
}
