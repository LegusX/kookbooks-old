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
			<div className="card bg-base-100 w-full md:shadow-xl rounded-none md:rounded-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl md:mt-14">
				<figure
					style={{
						"background-image": `url('/api/images/${recipe.thumbnail}.webp')`,
					}}
					className="h-32 bg-no-repeat bg-cover bg-center"
				>
					<h2 className="bg-[rgba(255,255,255,0.8)] w-full text-2xl font-bold px-4 py-2">
						{recipe.name}
					</h2>
				</figure>
				<div className="card-body items-center">
					{recipe.description.length > 0 && (
						<>
							<div className="prose max-w-none w-full">
								<h3>About</h3>
								{recipe.description}
							</div>
							<div className="divider"></div>
						</>
					)}

					<div className="flex w-full gap-10 prose justify-between max-w-none flex-col sm:flex-row">
						<div className="prose flex-grow">
							<h3 className=" capitalize">Ingredients</h3>
							<ul>
								{recipe.ingredients.map((item, i) => (
									<li key={i}>{item}</li>
								))}
							</ul>
						</div>
						<div className="prose flex-grow">
							<h3 className="capitalize">Directions</h3>
							<ol>
								{recipe.directions.map((item, i) => (
									<li key={i}>{item}</li>
								))}
							</ol>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
