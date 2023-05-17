import { useRef } from "react";
import { Link } from "react-router-dom";

export default function RecipeComponent({ recipe }) {
	const figure = useRef();

	return (
		//TODO: Make thumbnail zoom in a little when you hover over it
		//TODO: Expand card to show more ingredients when you hover over it, will require grid overlapping:
		// https://stackoverflow.com/questions/49361243/overlapping-items-in-css-grid
		<div className="card card-compact w-full drop-shadow-md" key={recipe.id}>
			<Link to={"/recipes/" + recipe.id}>
				<div className="cursor-pointer hover:scale-105 transition:all ease-in-out duration-100 rounded-t-xl overflow-hidden">
					<figure
						className="bg-primary h-48 max-h-48 bg-cover bg-center"
						style={{
							"background-image": `url('/api/images/${recipe.thumbnail}.webp')`, //not the most graceful thing, but gets the job done
						}}
						ref={figure}
					></figure>
					<div className="card-body bg-base-100 rounded-b-md flex content-between">
						<h2 className="card-title break-words max-w-full">{recipe.name}</h2>
						<div className="divider m-0"></div>
						<div className="grid grid-flow-row grid-cols-3 px-2">
							{recipe.ingredients.map((ingredient) => Ingredient(ingredient))}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}

function Ingredient(name) {
	return (
		<p className="text-ellipsis list-item list-inside whitespace-nowrap overflow-hidden">
			{name}
		</p>
	);
}
