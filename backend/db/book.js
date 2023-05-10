export default function (mongoose) {
	const schema = new mongoose.Schema({
		name: String,
		description: String,
		user: mongoose.ObjectId,
		thumbnail: mongoose.ObjectId,
		subscribers: [mongoose.ObjectId],
		recipes: [mongoose.ObjectId],
	});
	schema.statics.init = function (models) {
		this.models = {};
		Object.getOwnPropertyNames((name) => {
			this.models[name] = models[name];
		});
	};
	const Model = mongoose.model("Recipe", schema);
}
