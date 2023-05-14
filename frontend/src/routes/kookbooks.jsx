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
		<div className="drawer drawer-mobile bg-base-100">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content rounded-tl-sm bg-base-200">
				<div className="grid grid-flow-row gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-4">
					{bookElements}
				</div>
			</div>
			<div className="drawer-side">
				<label htmlFor="my-drawer-2" className="drawer-overlay"></label>
				<ul className="menu p-4 w-80 bg-base-100 text-base-content">
					<li>
						<a>Sidebar Item 1</a>
					</li>
					<li>
						<a>Sidebar Item 2</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

// <div className="flex gap-4 flex-wrap m-4 justify-start">{bookElements}</div>
