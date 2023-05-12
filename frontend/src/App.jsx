import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//routes
import { IndexRoute } from "./routes/index.jsx";
import LoginRoute from "./routes/login.jsx";

//components
import Header from "./components/Header.jsx";

import "./App.css";

function App() {
	return (
		<div className="min-h-screen bg-base-200">
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<IndexRoute />}></Route>
					<Route path="/login" element={<LoginRoute />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
