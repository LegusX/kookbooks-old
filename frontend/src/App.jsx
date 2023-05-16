import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

//Contexts
import { ToastComponent } from "./components/Toast.jsx";
export const UserContext = createContext({});

//routes
import { IndexRoute } from "./routes/index.jsx";
import LoginRoute from "./routes/login.jsx";
import KookbooksRoute from "./routes/kookbooks.jsx";

//components
import Header from "./components/Header.jsx";

import "./App.css";
import { auth } from "./api/api.js";
import KookbookRoute from "./routes/kookbook.jsx";
import SignupRoute from "./routes/signup.jsx";
import NewRecipeRoute from "./routes/newRecipe.jsx";
import RecipeRoute from "./routes/recipe.jsx";

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		auth.getSelf().then((self) => {
			setUser(self.data);
		});
	}, []);

	return (
		<UserContext.Provider value={{ user: user, setUser: setUser }}>
			<div className="min-h-screen bg-base-200">
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path="/" element={<IndexRoute />}></Route>
						<Route path="/login" element={<LoginRoute />} />
						<Route path="/books" element={<KookbooksRoute />} />
						<Route path="/books/:bookID" element={<KookbookRoute />} />
						<Route path="/signup" element={<SignupRoute />} />
						<Route path="/recipes/new/:bookID" element={<NewRecipeRoute />} />
						<Route path="/recipes/:recipeID" element={<RecipeRoute />} />
					</Routes>
				</BrowserRouter>
				<ToastComponent />
			</div>
		</UserContext.Provider>
	);
}

export default App;
