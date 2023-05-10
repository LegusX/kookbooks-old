export default function (mongoose) {
	const schema = new mongoose.Schema({
		size: Number,
		user: mongoose.ObjectId,
		recipe: mongoose.ObjectId,
		book: mongoose.ObjectId,
	});
	schema.statics.init = function (models) {
		this.models = {};
		Object.getOwnPropertyNames((name) => {
			this.models[name] = models[name];
		});
	};
	const Model = mongoose.model("Image", schema);
	return Model;
}
