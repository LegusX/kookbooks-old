import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import profileCircle from "../../public/icons/profilecircle.svg";
import compassIcon from "../../public/icons/compass.svg";
import heartIcon from "../../public/icons/heart.svg";
import homeIcon from "../../public/icons/home.svg";

export default function Header() {
	const location = useLocation();
	const loggedIn = true; //eventually pull this from parents
	return (
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
								<img src="/icons/heart.svg" />
								Home
							</Link>
						</li>
						<li>
							<Link to="/books">
								<img src="/icons/book.svg" />
								My Kookbooks
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
					<a className="btn btn-ghost normal-case text-xl">kookbooks</a>
				</Link>
			</div>
			<div className="navbar-end">
				{loggedIn && (
					<Link to="/login">
						<button className="btn btn-ghost">Sign In</button>
					</Link>
				)}
				{!loggedIn && (
					<>
						<Link to="/home">
							<button className="btn btn-ghost btn-circle sm:hidden">
								Home
							</button>
						</Link>
						<Link to="/books">
							<button className="btn btn-ghost btn-circle sm:hidden">
								My Kookbooks
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
						<button className="btn btn-ghost btn-circle">
							<div className="indicator">
								<img src={profileCircle} />
							</div>
						</button>
					</>
				)}
			</div>
		</div>
	);
}
