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
