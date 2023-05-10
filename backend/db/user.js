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
	schema.methods.clean = function () {
		return {
			name: this.name,
			username: this.username,
			id: this.id,
		};
	};
	const Model = mongoose.model("User", schema);
}
