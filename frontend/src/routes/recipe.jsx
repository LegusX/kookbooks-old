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

	return <p>{recipe.id}</p>;
}
