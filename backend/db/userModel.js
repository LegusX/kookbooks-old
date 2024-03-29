export default function (mongoose) {
	const schema = new mongoose.Schema({
		name: { type: String, required: true },
		username: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String, required: true },
		avatar: { type: mongoose.ObjectId, ref: "Image" },
	});
	schema.methods.clean = function () {
		return {
			name: this.name,
			username: this.username,
			id: this.id,
		};
	};
	const Model = mongoose.model("User", schema);
	return Model;
}
