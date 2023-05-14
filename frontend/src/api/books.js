import Axios from "axios";
import config from "../../../config";

//create custom axios instance
const axios = Axios.create();
axios.defaults.baseURL =
	config[process.env.NODE_ENV].serverAddress + config.api;

export async function getBooksByUser(id) {
	const books = await axios.get(`/user/${id}/books`);
	return books.data;
}
