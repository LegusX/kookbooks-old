import axios from "./api";

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
	const res = await axios.post("/auth/logout");
	if (res.status !== 200) return console.error("Failed to log out!");
	setUser(null);
	return;
}
