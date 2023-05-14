import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { getBooksByUser } from "../api/books";
import Kookbook from "../components/kookbook";

export default function KookbooksRoute() {
	const { user } = useContext(UserContext);
	const [books, setBooks] = useState(null);

	useEffect(() => {
		if (user === null) return;
		getBooksByUser(user.id).then((data) => {
			setBooks(data);
		});
	}, [user]);

	if (books === null)
		return (
			<div className="radial-progress animate-spin" style={{ "--value": 70 }} />
		);
	const bookElements = books.map((book) => (
		<Kookbook book={book} key={book.id} />
	));
	return (
		<div className="flex gap-4 flex-wrap m-4 justify-start">{bookElements}</div>
	);
}
