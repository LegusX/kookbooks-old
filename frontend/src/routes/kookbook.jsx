import { useParams } from "react-router-dom";

export default function KookbookRoute() {
	const { bookID } = useParams();
	return <p>{bookID}</p>;
}
