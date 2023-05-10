import * as mongoose from "mongoose";

import ImageModel from "./image.js";
import RecipeModel from "./recipe.js";
import UserModel from "./user.js";
import IngredientModel from "./ingredient.js";
import BookModel from "./book.js";

mongoose
	.connect(
		`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}127.0.0.1:27017/${process.env.DB_NAME}`
	)
	.then(() => {
		const models = {
			Image: ImageModel(mongoose),
			Recipe: RecipeModel(mongoose),
			User: UserModel(mongoose),
			Ingredient: IngredientModel(mongoose),
			Book: BookModel(mongoose),
		};
		Object.getOwnPropertyNames(models).forEach((modelName) => {
			models[modelName].init(models);
		});
	});

export default async function db() {
	await mongoose.connect(
		`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}127.0.0.1:27017/${process.env.DB_NAME}`
	);
	const models = {
		Image: ImageModel(mongoose),
		Recipe: RecipeModel(mongoose),
		User: UserModel(mongoose),
		Ingredient: IngredientModel(mongoose),
		Book: BookModel(mongoose),
	};
	Object.getOwnPropertyNames(models).forEach((modelName) => {
		models[modelName].init(models);
	});
	return { mongoose, models };
}
