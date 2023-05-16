import { useParams } from "react-router-dom";

export default function RecipeRoute() {
	const { recipeID } = useParams();

	return <p>{recipeID}</p>;
}
