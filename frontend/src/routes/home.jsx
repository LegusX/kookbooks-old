import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeRoute() {
	const navigate = useNavigate();

	//Until this route can be finished, just make the kookbooks page the home page
	useEffect(() => {
		navigate("/books");
	});
}
