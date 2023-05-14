import { createContext } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastContext = createContext();

export function ToastComponent() {
	return (
		<ToastContainer
			position="bottom-right"
			autoClose={5000}
			draggable={false}
		/>
	);
}

export function notify(text, type) {
	if (typeof toast[type] !== "function")
		return console.error(type + " is not a valid toast type!");
	return toast[type](t);
}
