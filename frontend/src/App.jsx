import { useState } from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";

import { IndexRoute } from "./pages/index.jsx";

import "./App.css";

const router = createBrowserRouter(
	createRoutesFromElements(<Route path="/" element={<IndexRoute />}></Route>)
);

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
