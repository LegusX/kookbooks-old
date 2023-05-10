export default function (mongoose) {
	const schema = new mongoose.Schema({
		name: String,
		recipes: [mongoose.ObjectId],
	});
	schema.statics.init = function (models) {
		this.models = {};
		Object.getOwnPropertyNames((name) => {
			this.models[name] = models[name];
		});
	};
	const Model = mongoose.model("Ingredient", schema);
}
