import { useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LoginRoute() {
	const username = useRef();
	const password = useRef();

	const submit = () => {
		//submit username/password
	};
	return (
		<div className="hero flex justify-center items-start">
			<div className="card shadow-2xl bg-base-100 mt-28">
				<div className="card-body">
					<div className="form-control">
						<label className="label">
							<span className="label-text">Username</span>
						</label>
						<input
							className="input input-bordered"
							type="text"
							placeholder="username"
							ref={username}
						></input>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Password</span>
						</label>
						<input
							className="input input-bordered"
							type="password"
							placeholder="password"
							ref={password}
						></input>
					</div>
					<button
						className="btn btn-primary mt-5"
						onClick={() => {
							submit;
						}}
					>
						Sign in
					</button>
					<p>
						Don't have an account?
						<Link className="link" to="/signup">
							Sign up here!
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
