export default function (mongoose) {
	const schema = new mongoose.Schema({
		user: { type: mongoose.ObjectId, ref: "User", required: true },
	});
	const Model = mongoose.model("Image", schema);
	return Model;
}
