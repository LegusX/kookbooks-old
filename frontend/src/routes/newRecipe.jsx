import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { publishRecipe } from "../api/recipe";

const fakeIngredientsPlaceholderText = "1 cup sugar\n2 cups flour";

export default function NewRecipeRoute() {
	const { bookID } = useParams();
	const navigate = useNavigate();

	const [page, setPage] = useState(0);
	//the max page number a user can navigate to. when a page passes validation, this number will increment
	const [canProgress, setCanProgress] = useState(0);

	//keep all form values as states so that they can persist across the different pages, in case a user navigates back
	const [recipeName, setRecipeName] = useState("New Recipe");
	const [ingredients, setIngredients] = useState(
		fakeIngredientsPlaceholderText
	);
	const [description, setDescription] = useState("");
	const [thumbnail, setThumbnail] = useState([]);
	const [directions, setDirections] = useState([]);

	const directionsElement = useRef();

	const addDirections = () => {
		if (directionsElement.current.value.length > 0) {
			setDirections([...directions, directionsElement.current.value]);
			directionsElement.current.value = "";
		} else return;
	};

	const publish = async () => {
		const recipe = {
			name: recipeName,
			description,
			ingredients: ingredients.split("\n"),
			directions,
			thumbnail,
			book: bookID,
		};
		const result = await publishRecipe(recipe);
		switch (result) {
			case "image": {
				toast.error("Failed to upload image!");
				break;
			}
			default: {
				navigate("/recipes/" + result.id);
			}
		}
	};

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
						maxLength="100"
						value={recipeName}
						onChange={(e) => {
							setRecipeName(e.target.value);
							if (e.target.value.length >= 3) setCanProgress(1);
						}}
					></input>
				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Description</span>
						<span className="label-text text-xs font-light">(optional)</span>
					</label>
					{/* TODO: make description box bigger for those people who like to write autobiographies in their recipes */}
					<textarea
						className="textarea textarea-bordered"
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
							setThumbnail(e.target.files);
						}}
						accept="image/*"
						max="1"
					></input>
				</div>
			</div>
		</div>,
		//Recipe ingredients
		//TODO: Use parser on ingredients for better search capabilities: https://www.npmjs.com/package/recipes-parser
		<div>
			<h3 className="text-lg font-semibold">Ingredients</h3>
			<textarea
				className="textarea textarea-bordered w-full min-h-[10rem] mt-4 lg:min-w-[30rem]"
				value={ingredients}
				//bit of hackiness to have a multiline "placeholder"
				onFocus={() => {
					if (ingredients === fakeIngredientsPlaceholderText)
						setIngredients("");
				}}
				onBlur={() => {
					if (ingredients === "") {
						setIngredients(fakeIngredientsPlaceholderText);
						setCanProgress(1);
					}
				}}
				onChange={(e) => {
					setIngredients(e.target.value);
					setCanProgress(2);
				}}
			/>
		</div>,
		//Recipe directions
		<>
			<h3 className="text-lg font-semibold">Directions</h3>
			<div className="flex flex-row flex-wrap lg:flex-nowrap gap-5 mt-5  min-w-[40vw] justify-start">
				<div className="flex-grow lg:flex-none flex flex-col gap-5 items-center">
					<textarea
						className="textarea textarea-bordered min-h-[14rem] w-full"
						ref={directionsElement}
					></textarea>
					<button
						className="btn btn-primary btn-wide max-w-[10rem]"
						onClick={() => {
							if (directions.length + 1 >= 2) setCanProgress(3);
							addDirections();
						}}
					>
						Add
					</button>
				</div>
				<div className=" flex flex-col items-center flex-wrap prose min-w-0 flex-grow">
					<ol className="overflow-y-scroll overflow-x-auto max-h-56 border rounded-lg prose p-2 flex-grow min-w-full list-inside break-words max-w-[30rem]">
						{directions.map((direction, i) => {
							return (
								<li key={i} className="break-words">
									{direction}
								</li>
							);
						})}
					</ol>
					<button
						className="btn btn-error btn-wide max-w-[10rem] btn-outline"
						onClick={() => {
							if (directions.length < 2) setCanProgress(2);
							directions.pop();
							setDirections([...directions]);
						}}
					>
						Remove
					</button>
				</div>
			</div>
		</>,
		//Finalize and publish
		<div className="pt-5">
			{description.length > 0 && (
				<div className="prose pb-5 max-w-none">
					<h3>Description</h3>
					<p>{description}</p>
				</div>
			)}
			<div className="flex flex-wrap lg:flex-nowrap flex-col lg:flex-row justify-between min-w-[20rem]">
				<div className="prose">
					<h3>Ingredients</h3>
					<ul>
						{ingredients.split("\n").map((item, i) => (
							<li key={i}>{item}</li>
						))}
					</ul>
				</div>
				<div className="prose basis-1/2">
					<h3>Directions</h3>
					<ol className=" w-full">
						{directions.map((direction, i) => {
							return <li key={i}>{direction}</li>;
						})}
					</ol>
				</div>
			</div>
		</div>,
	];

	return (
		<div className="hero min-h-[80vh]">
			<div className="card shadow-2xl bg-base-100 rounded-lg max-w-[50rem] md:mt-28">
				<div className="card-body px-4 lg:px-8 lg:min-w-[45rem]">
					<h1 className="card-title text-2xl break-words overflow-hidden">
						{recipeName}
					</h1>
					<ul className="steps mt-4 ">
						<li className={page >= 0 ? "step step-primary" : "step"}>Info</li>
						{/* add a little extra spacing to fit everything on mobile screens */}
						<li
							className={
								page >= 1
									? "step step-primary mr-8 lg:mr-0"
									: "step mr-8 lg:mr-0"
							}
						>
							Ingredients
						</li>
						<li className={page >= 2 ? "step step-primary" : "step"}>
							Directions
						</li>
						<li className={page >= 3 ? "step step-primary " : "step"}>
							Review
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
						{page !== pages.length - 1 && (
							<button
								className={
									page < pages.length
										? "btn btn-outline"
										: "btn btn-outline btn-disabled"
								}
								onClick={() => {
									setPage(page + 1);
								}}
								disabled={page === canProgress}
							>
								Next
							</button>
						)}
						{page === pages.length - 1 && (
							<button className="btn" onClick={() => publish()}>
								Publish
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
