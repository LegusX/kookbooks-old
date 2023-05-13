import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import Modal from "./Modal";
import { auth } from "../api/api";

export default function Header() {
	const location = useLocation();
	const { user, setUser } = useContext(UserContext);
	const [logoutOpen, setLogout] = useState(false);
	const navigate = useNavigate();

	const loggedIn = user !== null;
	return (
		<>
			<div className="navbar bg-base-100">
				<div className="navbar-start">
					<div className="dropdown lg:hidden">
						<label tabIndex={0} className="btn btn-ghost btn-circle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h7"
								/>
							</svg>
						</label>
						<ul
							tabIndex={0}
							className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
						>
							<li>
								<Link to="/home">
									<img src="/icons/home.svg" />
									Home
								</Link>
							</li>
							<li>
								<Link to="/books">
									<img src="/icons/book.svg" />
									My kookbooks
								</Link>
							</li>
							{/* Probably to be added in phase 2 */}
							{/* <li>
							<Link to="/discover">
								<img src="/icons/compass.svg" />
								Discover
							</Link>
						</li> */}
							{/* <li>
							<Link to="/favorites">Favorites</Link>
						</li> */}
						</ul>
					</div>
					<a className="btn btn-ghost normal-case text-xl hidden lg:flex">
						kookbooks
					</a>
				</div>
				<div className="navbar-center lg:hidden">
					<Link to="/home">
						<span className="btn btn-ghost normal-case text-xl">kookbooks</span>
					</Link>
				</div>
				<div className="navbar-end">
					{!loggedIn && (
						<Link to="/login">
							<button className="btn btn-ghost">Sign In</button>
						</Link>
					)}
					{loggedIn && (
						<>
							<Link to="/home">
								<button className="btn btn-ghost hidden lg:block">Home</button>
							</Link>
							<Link to="/books">
								<button className="btn btn-ghost hidden lg:flex">
									My kookbooks
								</button>
							</Link>
							{/* To be added in phase 2 */}
							{/* <Link to="/discover">
							<button className="btn btn-ghost btn-circle sm:hidden">
								Discover
							</button>
						</Link> */}
							{/* <Link to="/favorites">
							<button className="btn btn-ghost btn-circle sm:hidden">
								Favorites
							</button>
						</Link> */}
							<div className="dropdown dropdown-end">
								<label className="btn btn-ghost btn-circle" tabIndex={0}>
									<img src="/icons/profilecircle.svg" />
								</label>
								<ul
									className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40"
									tabIndex={0}
								>
									<li>
										<Link to="/profile" className="justify-end">
											Profile
											<img src="/icons/profilecircle.svg" />
										</Link>
									</li>
									<li>
										<Link to="/settings" className="justify-end">
											Settings
											<img src="/icons/settings.svg" />
										</Link>
									</li>
									<div className="divider m-0"></div>
									<li>
										<Link
											className="justify-end"
											onClick={() => setLogout(true)}
										>
											Log Out
											<img src="/icons/log-out.svg" />
										</Link>
									</li>
								</ul>
							</div>
						</>
					)}
				</div>
			</div>
			<Modal
				id="logoutModal"
				title="Are you sure you want to log out?"
				primaryButton={{
					text: "Continue",
					callback: () => {
						setLogout(false);
						auth.logout(setUser);
						navigate("/");
					},
				}}
				secondaryButton={{
					text: "Cancel",
					callback: () => {
						setLogout(false);
					},
				}}
				open={logoutOpen}
			/>
		</>
	);
}
