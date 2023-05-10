export default function (mongoose) {
	const schema = new mongoose.Schema({
		name: String,
		username: String,
		password: String,
		email: String,
		subscribedBooks: [mongoose.ObjectId],
		ownedBooks: [mongoose.ObjectId],
		recipes: [mongoose.ObjectId],
		images: [mongoose.ObjectId],
	});
	schema.statics.init = function (models) {
		this.models = {};
		Object.getOwnPropertyNames((name) => {
			this.models[name] = models[name];
		});
	};
	const Model = mongoose.model("User", schema);
}
