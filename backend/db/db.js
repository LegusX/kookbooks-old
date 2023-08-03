import * as dotenv from "dotenv"
import * as mongoose from "mongoose";

import ImageModel from "./imageModel.js";
import RecipeModel from "./recipeModel.js";
import UserModel from "./userModel.js";
import IngredientModel from "./ingredientModel.js";
import BookModel from "./bookModel.js";

dotenv.config()
export const connectURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@kookbooks.rdrly0o.mongodb.net/?retryWrites=true&w=majority`

export default async function db() {
	await mongoose.connect(connectURI);
	const models = {
		Image: ImageModel(mongoose),
		Recipe: RecipeModel(mongoose),
		User: UserModel(mongoose),
		Ingredient: IngredientModel(mongoose),
		Book: BookModel(mongoose),
	};
	return { mongoose, models };
}

