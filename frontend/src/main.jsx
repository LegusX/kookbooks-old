import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode data-theme="cupcake">
		<App data-theme="cupcake" />
	</React.StrictMode>
);
