import { useState } from "react";
// import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<div data-theme="cupcake">
			<button class="btn">Hello world</button>
		</div>
	);
}

export default App;
