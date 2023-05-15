import { Link } from "react-router-dom";

export default function Kookbook({ book }) {
	return (
		<div className="card card-compact w-full drop-shadow-md rounded-xl">
			<Link to={"/books/" + book.id}>
				<div className="cursor-pointer hover:scale-105 transition:all ease-in-out duration-100">
					<figure className=" bg-primary min-h-8 rounded-t-xl"></figure>
					<div className="card-body bg-base-100 rounded-b-md flex content-between">
						<h2 className="text-xl break-words font-bold">{book.name}</h2>
						{/* Maybe eventually replace this with stats about the book? Or at the very least add them */}
						<p className=" flex-shrink break-words">{book.description}</p>
					</div>
				</div>
			</Link>
		</div>
	);
}
