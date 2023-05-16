import { useRef, useState } from "react";
import { toast } from "react-toastify";

const fakeIngredientsPlaceholderText = "1 cup sugar\n2 cups flour";

export default function NewRecipeRoute() {
	const [page, setPage] = useState(0);
	const [canProgress, setCanProgress] = useState(true); //keep track of whether or not the user has filled out all required fields

	//keep all form values as states so that they can persist across the different pages, in case a user navigates back
	const [recipeName, setRecipeName] = useState("New Recipe");
	const [ingredients, setIngredients] = useState(
		fakeIngredientsPlaceholderText
	);
	const [description, setDescription] = useState("");
	const [thumbnail, setThumbnail] = useState([]);

	const pages = [
		//Recipe name, description, thumbnail
		<div className="flex items-end gap-5 flex-wrap lg:flex-nowrap ">
			<div className="flex-grow lg:flex-none">
				<div className="form-control">
					<label className="label">
						<span className="label-text">Recipe Name</span>
					</label>
					<input
						className="input input-bordered"
						type="text"
						maxLength="50"
						value={recipeName}
						onChange={(e) => setRecipeName(e.target.value)}
					></input>
				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Description</span>
						<span className="label-text text-xs font-light">(optional)</span>
					</label>
					<textarea
						className="textarea textarea-bordered"
						// ref={description}
						value={description}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					/>
				</div>
			</div>
			<div className="flex-grow lg:flex-none">
				<div className="form-control">
					<label className="label">
						<span className="label-text">Thumbnail</span>
						<span className="label-text text-xs font-light">(optional)</span>
					</label>
					<input
						className="file-input file-input-bordered"
						type="file"
						//TODO: Also include thumbnail preview
						onChange={(e) => {
							setThumbnail(e.target.files[0]);
						}}
					></input>
				</div>
			</div>
		</div>,
		//Recipe ingredients
		//TODO: Use parser on ingredients for better search capabilities: https://www.npmjs.com/package/recipes-parser
		<div>
			<h3 className="text-lg font-semibold">Ingredients</h3>
			<textarea
				className="textarea textarea-bordered w-full min-h-[10rem] mt-4"
				value={ingredients}
				//bit of hackiness to have a multiline "placeholder"
				onFocus={() => {
					if (ingredients === fakeIngredientsPlaceholderText)
						setIngredients("");
				}}
				onBlur={() => {
					if (ingredients === "") {
						setIngredients(fakeIngredientsPlaceholderText);
						setCanProgress(false);
					}
				}}
				onChange={(e) => {
					setIngredients(e.target.value);
					setCanProgress(true);
				}}
			/>
		</div>,
		//Recipe directions
		<div></div>,
		//Finalize and publish
		<div></div>,
	];

	return (
		<div className="hero min-h-[80vh]">
			<div className="card shadow-2xl bg-base-100 rounded-lg max-w-2xl">
				<div className="card-body px-4 lg:px-8">
					<h1 className="card-title text-2xl break-words overflow-hidden">
						{recipeName}
					</h1>
					<ul className="steps mt-4 ">
						<li className={page >= 0 ? "step step-primary" : "step"}>Info</li>
						{/* add a little extra spacing to fit everything on mobile screens */}
						<li className={page >= 1 ? "step step-primary mr-8" : "step mr-8"}>
							Ingredients
						</li>
						<li className={page >= 2 ? "step step-primary" : "step"}>
							Directions
						</li>
						<li className={page >= 3 ? "step step-primary " : "step"}>
							Publish!
						</li>
					</ul>
					<div>{pages[page]}</div>

					<div className="flex justify-between mt-4">
						<button
							className={
								page > 0 ? "btn btn-outline" : "btn btn-outline btn-disabled"
							}
							onClick={() => {
								setPage(page - 1);
							}}
						>
							Previous
						</button>
						<button
							className={
								page < pages.length
									? "btn btn-outline"
									: "btn btn-outline btn-disabled"
							}
							onClick={() => {
								setPage(page + 1);
							}}
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
