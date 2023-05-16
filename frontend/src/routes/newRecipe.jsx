import { useRef, useState } from "react";

export default function NewRecipeRoute() {
	const [recipeName, setRecipeName] = useState("New Recipe");
	const [page, setPage] = useState(0);
	const [canProgress, setCanProgress] = useState(false); //keep track of whether or not the user has filled out all required fields

	const description = useRef();
	const thumbnail = useRef();

	const pages = [
		<div className="flex items-end gap-5">
			<div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Recipe Name</span>
					</label>
					<input
						className="input input-bordered"
						type="text"
						maxLength="50"
						onChange={(e) => setRecipeName(e.target.value)}
					></input>
				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Description</span>
						<span className="label-text text-xs font-light">(optional)</span>
					</label>
					<textarea className="textarea textarea-bordered" ref={description} />
				</div>
			</div>
			<div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Thumbnail</span>
						<span className="label-text text-xs font-light">(optional)</span>
					</label>
					<input
						className="file-input file-input-bordered"
						type="file"
						ref={thumbnail}
					></input>
				</div>
			</div>
		</div>,
	];

	return (
		<div className="hero min-h-[80vh]">
			<div className="card shadow-2xl bg-base-100 rounded-lg max-w-2xl">
				<div className="card-body">
					<h1 className="card-title text-2xl break-words overflow-hidden">
						{recipeName}
					</h1>
					<div>{pages[page]}</div>
					<div>
						<button
							className={
								page > 0 ? "btn btn-outline" : "btn btn-outline btn-disabled"
							}
						>
							Previous
						</button>
						<button
							className={
								page < pages.length
									? "btn btn-outline"
									: "btn btn-outline btn-disabled"
							}
							onClick={() => {}}
							disabled={!canProgress}
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
