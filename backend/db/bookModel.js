export default function (mongoose) {
	const schema = new mongoose.Schema({
		name: { type: String, required: true },
		description: String,
		user: { type: mongoose.ObjectId, ref: "User" },
		thumbnail: { type: mongoose.ObjectId, ref: "Image" },
		subscribers: [{ type: mongoose.ObjectId, ref: "User" }],
		recipes: [{ type: mongoose.ObjectId, ref: "Recipe" }],
	});
	schema.statics.init = function (models) {
		this.models = {};
		Object.getOwnPropertyNames((name) => {
			this.models[name] = models[name];
		});
	};
	const Model = mongoose.model("Book", schema);
	return Model;
}
