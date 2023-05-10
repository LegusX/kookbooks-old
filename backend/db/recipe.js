export default function (mongoose) {
	const schema = new mongoose.Schema({
		name: String,
		text: String,
		user: mongoose.ObjectId,
		ingredients: [mongoose.ObjectId],
		books: [mongoose.ObjectId],
		images: [mongoose.ObjectId],
	});
	schema.statics.init = function (models) {
		this.models = {};
		Object.getOwnPropertyNames((name) => {
			this.models[name] = models[name];
		});
	};
	const Model = mongoose.model("Recipe", schema);
}
