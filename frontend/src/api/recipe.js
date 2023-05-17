import axios from "./api";

export async function getRecipesByBook(id) {
	try {
		const recipes = await axios.get(`/book/${id}/recipes`);
		return recipes.data;
	} catch (e) {
		console.error(e);
		return null;
	}
}

export async function publishRecipe(recipe) {
	//upload thumbnail first, if it exists
	if (recipe.thumbnail.length > 0) {
		const formData = new FormData();
		formData.append("thumbnail", recipe.thumbnail[0]);

		try {
			const res = await axios.post("/image/", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			recipe.thumbnail = res.data;
		} catch (e) {
			console.error(e);
			return "image";
		}
	} else delete recipe.thumbnail;

	try {
		const res = await axios.post("/recipe/", recipe);
		return res.data;
	} catch (e) {
		console.error(e);
	}
}

export async function getRecipe(id) {
	try {
		const res = await axios.get("/recipe/" + id);
		return res.data;
	} catch (e) {
		console.error(e);
		return null;
	}
}
