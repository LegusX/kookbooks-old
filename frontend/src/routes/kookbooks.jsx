import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { getBooksByUser } from "../api/books";
import Kookbook from "../components/kookbook";
import { useNavigate } from "react-router-dom";

export default function KookbooksRoute() {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);
	const [books, setBooks] = useState(null);
	const [query, setQuery] = useState("");

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
	const bookElements = books.map((book) => {
		console.log(book);
		if (book.name.toLowerCase().includes(query.toLowerCase()))
			return <Kookbook book={book} key={book.id} />;
	});

	// TODO: Replace drawer with a floating search box instead, likely at the bottom of the screen? Can't really think of any reason to filter the subscribed kookbooks
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
				<div className="p-4 flex flex-col gap-4">
					<input
						type="text"
						className="input input-sm input-bordered"
						placeholder="Search kookbooks..."
						onChange={(e) => {
							console.log(e);
							setQuery(e.target.value);
						}}
					></input>
					<div className="divider m-0" />
					<button
						className="btn btn-secondary"
						onClick={() => navigate("/books/new")}
					>
						New Cookbook
					</button>
				</div>
			</div>
		</div>
	);
}
