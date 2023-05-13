import Axios from "axios";
import config from "../../../config";

//create custom axios instance
const axios = Axios.create();
axios.defaults.baseURL =
	config[process.env.NODE_ENV].serverAddress + config.api;

export async function signin(username, password, setUser) {
	try {
		await axios.post("/auth/password", {
			username: username,
			password: password,
		});
		const res = await axios.get("/auth/self");
		console.log(res.data);
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
	await axios.post("/auth/logout");
	setUser(null);
	return;
}
