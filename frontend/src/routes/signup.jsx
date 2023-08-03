import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";

export default function SignupRoute() {
	const { user, setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const name = useRef();
	const username = useRef();
	const email = useRef();
	const password = useRef();
	const confirmPassword = useRef();

	//TODO: Validation
	let valid = true
	useEffect(()=>{
		name.current.addEventListener("change", ()=>{
			if (name.current.value.length < 3) name.current.style.borderColor = "red"
			else name.current.style.borderColor = ""
		})
	}, [])

	const submit = async () => {
		const result = await signup(
			{
				name: name.current.value,
				username: username.current.value,
				email: email.current.value,
				password: password.current.value,
			},
			setUser
		);
	};

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
								</div>
							</div>
							<div className="divider lg:hidden"></div>
							<div>
								<div className="form-control">
									<label className="label">
										<span className="label-text">Password</span>
									</label>
									<input
										className="input input-bordered"
										type="password"
										placeholder="********"
										ref={password}
										maxLength="32"
									></input>
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
