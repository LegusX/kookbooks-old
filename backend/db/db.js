import * as mongoose from "mongoose";

import ImageModel from "./imageModel.js";
import RecipeModel from "./recipeModel.js";
import UserModel from "./userModel.js";
import IngredientModel from "./ingredientModel.js";
import BookModel from "./bookModel.js";

//`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}127.0.0.1:27017/${process.env.DB_NAME}`

export default async function db() {
	await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
	const models = {
		Image: ImageModel(mongoose),
		Recipe: RecipeModel(mongoose),
		User: UserModel(mongoose),
		Ingredient: IngredientModel(mongoose),
		Book: BookModel(mongoose),
	};
	return { mongoose, models };
}
