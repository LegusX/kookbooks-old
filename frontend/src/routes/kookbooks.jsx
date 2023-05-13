import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { getBooksByUser } from "../api/books";

export default function KookbooksRoute() {
	const { user } = useContext(UserContext);
	const [books, setBooks] = useState(null);

	useEffect(() => {
		if (user === null) return;
		getBooksByUser(user.id).then((data) => {
			setBooks(data);
		});
	}, [user]);
	return <p>{books}</p>;
}
