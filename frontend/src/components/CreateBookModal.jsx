import { useContext } from "react";
import { UserContext } from "../App";

export default function CreateBookModal({ open }) {
	const { user } = useContext(UserContext);
	return (
		<div className={open ? "modal-open modal" : "modal"}>
			<div className="modal-box w-11/12 lg:w-1/2 max-w-5xl">
				<h1 className="text-4xl">Create New Kookbook</h1>
				<div className="divider"></div>
				<div className="flex flex-wrap">
					<div className="flex-grow flex justify-center flex-col">
						<div className="form-control flex-grow">
							<label className="label">
								<span className="label-text">Kookbook Name</span>
							</label>
							<input
								type="text"
								className="input input-bordered w-full max-w-xs input-sm"
							></input>
						</div>
						<div className="form-control flex-grow">
							<label className="label">
								<span className="label-text">Kookbook Description</span>
							</label>
							<textarea
								type="textarea"
								className="textarea textarea-bordered w-full max-w-xs input-sm h-40 lg:h-24"
							></textarea>
						</div>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Thumbnail</span>
						</label>
						<input
							type="file"
							className="file-input file-input-primary file-input-sm md:file-input-md w-full"
						></input>
					</div>
				</div>
				<div className="modal-action">
					<button className="btn btn-error btn-outline">Cancel</button>
					<button className="btn btn-primary">Save</button>
				</div>
			</div>
		</div>
	);
}
