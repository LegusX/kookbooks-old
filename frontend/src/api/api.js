import { signin, getSelf, logout } from "./auth";
import { getBooksByUser } from "./books";

export const auth = {
	signin,
	getSelf,
	logout,
};

export const books = {
	getBooksByUser,
};
