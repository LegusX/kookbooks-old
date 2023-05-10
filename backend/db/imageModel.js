export default function (mongoose) {
	const schema = new mongoose.Schema({
		size: { type: Number, required: true },
		user: { type: mongoose.ObjectId, ref: "User", required: true },
		recipe: { type: mongoose.ObjectId, ref: "User" },
		book: { type: mongoose.ObjectId, ref: "User" },
	});
	const Model = mongoose.model("Image", schema);
	return Model;
}
