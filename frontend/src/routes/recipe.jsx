import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipe } from "../api/recipe";

export default function RecipeRoute() {
	const { recipeID } = useParams();
	const [recipe, setRecipe] = useState(null);

	useEffect(() => {
		getRecipe(recipeID).then((data) => {
			if (data === null) return; //TODO: Handle 404 better
			setRecipe(data);
		});
	}, []);

	if (recipe === null)
		return (
			<div className="flex min-w-full min-h-full justify-center items-center mt-10">
				<div
					className="radial-progress animate-spin"
					style={{ "--value": 70 }}
				/>
			</div>
		);

	return (
		<div className="hero">
			<div className="card bg-base-100 w-full lg:shadow-xl rounded-none lg:rounded-lg lg:max-w-[50rem] lg:mt-14">
				<figure
					style={{
						"background-image": `url('/api/images/${recipe.thumbnail}.webp')`,
					}}
					className="h-32 bg-no-repeat bg-cover"
				>
					<h2 className="bg-[rgba(255,255,255,0.8)] w-full text-2xl font-bold px-4 py-2">
						{recipe.name}
					</h2>
				</figure>
				<div className="card-body"></div>
			</div>
		</div>
	);
}
