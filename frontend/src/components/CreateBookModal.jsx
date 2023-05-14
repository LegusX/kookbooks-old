import { useContext, useRef } from "react";
import { UserContext } from "../App";
import { createBook } from "../api/books";

export default function CreateBookModal({ open, setOpen }) {
	const { user } = useContext(UserContext);
	const input = useRef();
	const textarea = useRef();

	const submit = async () => {
		//form validation
		input.current.classList.remove("border-error");
		if (input.length < 3) return input.current.classList.add("border-error");
		else {
			const id = createBook({
				name: input.current.value,
				description: textarea.current.value,
			});
			// if ()
		}
	};

	return (
		<div className={open ? "modal-open modal" : "modal"}>
			<div className="modal-box ">
				<h1 className="text-4xl">Create New Kookbook</h1>
				<div className="divider"></div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Kookbook Name</span>
					</label>
					<input
						type="text"
						className="input input-bordered w-full input-sm"
						ref={input}
						maxLength="50"
					></input>
				</div>
				<div className="form-control flex-grow">
					<label className="label">
						<span className="label-text">Kookbook Description</span>
					</label>
					<textarea
						type="textarea"
						className="textarea textarea-bordered w-full input-sm h-40 lg:h-20"
						ref={textarea}
					></textarea>
				</div>
				{/* <div className="form-control">
						<label className="label">
							<span className="label-text">Thumbnail</span>
						</label>
						<input
							type="file"
							className="file-input file-input-primary file-input-sm md:file-input-md w-full"
							ref={file}
						></input>
					</div> */}
				<div className="modal-action">
					<button
						className="btn btn-error btn-outline"
						onClick={() => setOpen(false)}
					>
						Cancel
					</button>
					<button className="btn btn-primary" onClick={() => submit()}>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
