import Axios from "axios";
import config from "../../../config";

//create custom axios instance
const axios = Axios.create();
axios.defaults.baseURL =
	config[process.env.NODE_ENV].serverAddress + config.api;

export async function getBooksByUser(id) {
	try {
		const books = await axios.get(`/user/${id}/books`);
		return books.data;
	} catch (e) {
		console.error("Failed to get user's books!");
		return null;
	}
}

export async function createBook(book) {
	try {
		const res = await axios.post("/book", book);
		return res.data.id;
	} catch (e) {
		console.error("Failed to create kookbook!");
		return null;
	}

	return null;
}
