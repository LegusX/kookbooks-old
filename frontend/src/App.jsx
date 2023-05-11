import { useState } from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";

//routes
import { IndexRoute } from "./routes/index.jsx";
import LoginRoute from "./routes/login.jsx";

//components
import Header from "./components/Header.jsx";

import "./App.css";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<IndexRoute />}></Route>
			<Route path="/login" element={<LoginRoute />} />
		</>
	)
);

function App() {
	return (
		<>
			<Header />
			<RouterProvider router={router} />
		</>
	);
}

export default App;
