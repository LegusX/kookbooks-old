export default function Kookbook({ book }) {
	return (
		<div className="card card-compact w-full drop-shadow-md rounded-xl cursor-pointer">
			<figure className=" bg-primary min-h-8"></figure>
			<div className="card-body bg-base-100 rounded-b-md flex content-between">
				<h2 className="card-title">{book.name}</h2>
				{/* Maybe eventually replace this with stats about the book? Or at the very least add them */}
				<p className=" flex-shrink">{book.description}</p>
			</div>
		</div>
	);
}
