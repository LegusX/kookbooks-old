export default function Kookbook({ book }) {
	return (
		<div className="card card-compact w-full md:w-[35%] 2xl:w-[20%] drop-shadow-md rounded-xl">
			<figure className=" bg-primary min-h-8"></figure>
			<div className="card-body bg-base-100 rounded-b-md">
				<h2 className="card-title">{book.name}</h2>
				<p>{book.description}</p>
			</div>
		</div>
	);
}
