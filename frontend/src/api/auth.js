import { toast } from "react-toastify";
import axios from "./api";

export async function signin(username, password, setUser) {
	try {
		await axios.post("/auth/password", {
			username: username,
			password: password,
		});
		const res = await axios.get("/auth/self");
		setUser(res.data);
		return true;
	} catch (e) {
		if (e.message.includes("404")) return false;
		console.error(e.message);
		return false;
	}
	return false;
}

export async function getSelf() {
	return await axios.get("/auth/self");
}

export async function logout(setUser) {
	const res = await axios.post("/auth/logout");
	if (res.status !== 200) return console.error("Failed to log out!");
	setUser(null);
	return;
}

export async function signup(newUser, setUser) {
	try {
		const res = await axios.post("/auth/signup", newUser);
		if ((res.status = 200)) {
			//for some reason, passport isn't creating a session for the new user properly, so we have to resort to this.
			await axios.post("/auth/password", {
				username: newUser.username,
				password: newUser.password,
			});
			const self = await axios.get("/auth/self");
			setUser(self.data);
			toast("Account successfully created!");
			return true;
		} else {
			return res.data.error; //should explain to the user what is wrong with their signup
		}
	} catch (e) {
		console.error(e);
		return null;
	}
}
