import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function KookbookRoute() {
	const { bookID } = useParams();
	const navigate = useNavigate();
	const [recipes, setRecipes] = useState(null);

	useEffect(() => {
		//get books
	}, []);
	if (recipes === null)
		return (
			<div className="flex min-w-full min-h-full justify-center items-center mt-10">
				<div
					className="radial-progress animate-spin"
					style={{ "--value": 70 }}
				/>
			</div>
		);
	return (
		<>
			<div className="drawer drawer-mobile bg-base-100">
				<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content rounded-tl-sm bg-base-200">
					<div className="grid grid-flow-row gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-4">
						<p>hello world</p>
						<p>hello world</p>
						<p>hello world</p>
					</div>
				</div>
				<div className="drawer-side">
					<label htmlFor="my-drawer-2" className="drawer-overlay"></label>
					<div className="p-4 flex flex-col gap-4">
						<input
							type="text"
							className="input input-sm input-bordered"
							placeholder="Search recipes..."
							onChange={(e) => {
								console.log(e);
								setQuery(e.target.value);
							}}
						></input>
						<div className="divider m-0" />
						<button
							className="btn btn-secondary"
							onClick={() => navigate("/recipes/new")}
						>
							New Recipe
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
