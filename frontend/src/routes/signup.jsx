import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import { passwordStrength } from "check-password-strength";

const emailRegex = new RegExp(
	// eslint-disable-next-line no-control-regex
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
);
const usernameRegex = new RegExp(
	/[0-9a-zA-z\-_+.]+/
)

export default function SignupRoute() {
	const { user, setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const name = useRef();
	const username = useRef();
	const email = useRef();
	const password = useRef();
	const confirmPassword = useRef();
	const passwordCheck = useRef();

	let invalid = []

	const submit = async () => {
		if (invalid.length === 0) {
			const result = await signup(
				{
					name: name.current.value,
					username: username.current.value,
					email: email.current.value,
					password: password.current.value,
				},
				setUser
			);
		}
	};

	useEffect(() => {
		name.current.addEventListener("focusout", () => {
			if (name.current.value.length === 0 || name.current.value.replace(" ", "") === 0) {
				name.current.classList.add("border-error")
				name.current.nextElementSibling.classList.remove("invisible")
				invalid.push("name")
			}
			else {
				name.current.classList.remove("border-error")
				name.current.nextElementSibling.classList.add("invisible")
				invalid.splice(invalid.indexOf("name"), 1)
			}
		})
		username.current.addEventListener("focusout", () => {
			console.log(username.current.value.match(usernameRegex))
			if (username.current.value.length < 3) {
				username.current.classList.add("border-error")
				username.current.nextElementSibling.classList.remove("invisible")
				username.current.nextElementSibling.firstChild.innerText = "Your username must be 3 characters or more"
			}
			else if (username.current.value.match(usernameRegex)[0].length !== username.current.value.length) {
				username.current.classList.add("border-error")
				username.current.nextElementSibling.firstChild.innerText = "Username can only contain alphanumeric characters and -_+."
				username.current.nextElementSibling.classList.remove("invisible")
			}
			else {
				username.current.classList.remove("border-error")
				username.current.nextElementSibling.classList.add("invisible")
			}
		})
		email.current.addEventListener("focusout", () => {
			if (email.current.value.match(emailRegex) === null) {
				email.current.classList.add("border-error")
				email.current.nextElementSibling.classList.remove("invisible")
			}
			else {
				email.current.classList.remove("border-error")
				email.current.nextElementSibling.classList.add("invisible")
			}
		})
		password.current.addEventListener("focusout", () => {
			if (password.current.value.length < 8) {
				password.current.classList.add("border-error")
				password.current.nextElementSibling.classList.remove("invisible")
			}
			else {
				password.current.classList.remove("border-error")
				password.current.nextElementSibling.classList.add("invisible")
			}

		})
		password.current.addEventListener("input", () => {
			passwordCheck.current.classList.remove("hidden")

			const strength = passwordStrength(password.current.value)
			passwordCheck.current.classList.remove("badge-warning")
			passwordCheck.current.classList.remove("badge-error")
			passwordCheck.current.classList.remove("badge-primary")
			passwordCheck.current.classList.remove("badge-success")

			switch (strength.id) {
				case 0:
					passwordCheck.current.classList.add("badge-error")
					break
				case 1:
					passwordCheck.current.classList.add("badge-warning")
					break
				case 2:
					passwordCheck.current.classList.add('badge-primary')
					break
				case 3:
					passwordCheck.current.classList.add("badge-success")
					break
			}
			passwordCheck.current.innerText = strength.value;
		})

		confirmPassword.current.addEventListener("focusout", () => {
			if (confirmPassword.current.value !== password.current.value) {
				confirmPassword.current.classList.add("border-error")
				confirmPassword.current.nextElementSibling.classList.remove("invisible")
			}
			else {
				confirmPassword.current.classList.remove("border-error")
				confirmPassword.current.nextElementSibling.classList.add("invisible")
			}

		})
	}, [])

	if (user !== null && user.id) navigate("/home");

	if (user === null) {
		return (
			<div className="hero flex flex-col algin-middle bg-base-100 lg:bg-base-200 min-h-full">
				<div className="card lg:shadow-2xl bg-base-100 lg:mt-28 card-normal">
					<div className="card-body">
						<h2 className="card-title justify-center">Sign up</h2>
						<div className="flex flex-wrap gap-4 lg:gap-8 justify-center">
							<div>
								<div className="form-control">
									<label className="label">
										<span className="label-text">Your name</span>
									</label>
									<input
										className="input input-bordered"
										type="text"
										placeholder="John Doe"
										ref={name}
										maxLength="30"
									></input>
									<label className="label invisible">
										<span className="label-text text-error ">A name is required</span>
									</label>
								</div>
								<div className="form-control">
									<label className="label">
										<span className="label-text">Username</span>
									</label>
									<input
										className="input input-bordered"
										type="text"
										placeholder="john.doe"
										ref={username}
										maxLength="20"
									></input>
									<label className="label invisible">
										<span className="label-text text-error">Your username must be 3 characters or more</span>
									</label>
								</div>
								<div className="form-control">
									<label className="label">
										<span className="label-text">Email</span>
									</label>
									<input
										className="input input-bordered"
										type="text"
										placeholder="john.doe@site.com"
										ref={email}
										maxLength="100"
									></input>
									<label className="label invisible">
										<span className="label-text text-error">Your email address is invalid</span>
									</label>
								</div>
							</div>
							<div className="divider lg:invisible"></div>
							<div>
								<div className="form-control">
									<label className="label">
										<span className="label-text">Password</span>
										<span ref={passwordCheck} className="badge badge-success label-text-alt hidden">strong</span>
									</label>
									<input
										className="input input-bordered"
										type="password"
										placeholder="********"
										ref={password}
										maxLength="32"
									></input>
									<label className="label invisible">
										<span className="label-text text-error">Your password must be at least 8 characters</span>
									</label>
								</div>
								<div className="form-control">
									<label className="label">
										<span className="label-text">Confirm Password</span>
									</label>
									<input
										className="input input-bordered"
										type="password"
										placeholder="********"
										ref={confirmPassword}
										maxLength="32"
									></input>
									<label className="label invisible">
										<span className="label-text text-error">Your password doesn&apos;t match!</span>
									</label>
								</div>
							</div>
						</div>
						<button
							className="btn btn-primary btn-outline mt-4"
							onClick={() => submit()}
						>
							Sign up
						</button>
					</div>
				</div>
			</div>
		);
	}
}
