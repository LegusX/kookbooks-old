import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { signin } from "../shared/_api";
import { useNavigate } from "react-router-dom";

export default function LoginRoute() {
	const usernameInput = useRef();
	const passwordInput = useRef();
	const [errorText, setErrorText] = useState("");
	const navigate = useNavigate();
	var formError = false;
	var errorMessage = "";

	const submit = async () => {
		const username = usernameInput.current.value;
		const password = passwordInput.current.value;
		clearError();

		if (username === "") updateError("username");
		if (password === "") updateError("password");
		if (username.length < 3 && username.length > 0)
			updateError("usernamelength");
		if (password.length < 8 && password.length > 0)
			updateError("passwordlength");

		if (formError) return; //if there were any errors thus far, don't bother making a request

		const status = await signin(username, password);

		// if (status.id)

		if (formError) return; //Authentication failed, don't navigate away
		navigate("/home");
	};

	const updateError = (error) => {
		formError = true;
		switch (error) {
			case "notfound": {
				setErrorText("User not found");
				break;
			}
			case "username": {
				usernameInput.current.classList.add("border-error");
				break;
			}
			case "password": {
				passwordInput.current.classList.add("border-error");
				break;
			}
			case "usernamelength": {
				usernameInput.current.classList.add("border-error");
				errorMessage += "Username is invalid\n";
				break;
			}
			case "passwordlength": {
				passwordInput.current.classList.add("border-error");
				errorMessage += "Password is invalid\n";
				break;
			}
		}
		passwordInput.current.value = "";
		setErrorText(errorMessage);
	};

	const clearError = () => {
		errorMessage = "";
		formError = false;
		usernameInput.current.classList.remove("border-error");
		passwordInput.current.classList.remove("border-error");
		setErrorText("");
	};

	return (
		<div className="hero flex justify-center items-start">
			<div className="card shadow-2xl bg-base-100 mt-28">
				<div className="card-body text-center">
					<h2 className="text-2xl">Welcome!</h2>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Username</span>
						</label>
						<input
							className="input input-bordered"
							type="text"
							placeholder="username"
							ref={usernameInput}
							maxLength="20"
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
							ref={passwordInput}
							maxLength="32"
						></input>
					</div>
					<p className="text-error mb-0">{errorText}</p>
					<button
						className="btn btn-primary mt-5"
						onClick={() => {
							submit();
						}}
					>
						Sign in
					</button>
					<p>
						Don't have an account?
						<Link className="link ml-1" to="/signup">
							Sign up here!
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
