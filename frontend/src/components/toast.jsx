import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ToastComponent() {
	return (
		<ToastContainer
			position="bottom-right"
			autoClose={5000}
			draggable={false}
		/>
	);
}
