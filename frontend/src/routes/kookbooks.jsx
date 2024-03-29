import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { getBooksByUser } from "../api/books";
import Kookbook from "../components/Kookbook";
import { useNavigate } from "react-router-dom";
import CreateBookModal from "../components/CreateBookModal";

export default function KookbooksRoute() {
	const { user } = useContext(UserContext);
	const [books, setBooks] = useState(null);
	const [query, setQuery] = useState("");
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		if (user === null) return;
		getBooksByUser(user.id).then((data) => {
			setBooks(data);
		});
	}, [user]);

	if (books === null)
		return (
			<div className="flex min-w-full min-h-full justify-center items-center">
				<div
					className="radial-progress animate-spin"
					style={{ "--value": 70 }}
				/>
			</div>
		);
	const bookElements = books.map((book) => {
		if (book.name.toLowerCase().includes(query.toLowerCase()))
			return <Kookbook book={book} key={book.id} />;
	});

	// TODO: Replace drawer with a floating search box instead, likely at the bottom of the screen? Can't really think of any reason to filter the subscribed kookbooks
	return (
		<>
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
								console.error(e);
								setQuery(e.target.value);
							}}
						></input>
						<div className="divider m-0" />
						<button
							className="btn btn-secondary"
							onClick={() => setModalOpen(true)}
						>
							New Kookbook
						</button>
					</div>
				</div>
			</div>
			<CreateBookModal open={modalOpen} setOpen={setModalOpen} />
		</>
	);
}
