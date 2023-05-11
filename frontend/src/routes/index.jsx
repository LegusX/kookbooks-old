import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

//TODO put landing page here for anybody not signed in. features/pricing/etc etc
export function IndexRoute() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/login");
	}, []);
}
