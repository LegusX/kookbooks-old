import { defineConfig } from "vite";
import config from "../config.mjs";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		cors: false,
		proxy: {
			"/api": {
				target: "http://localhost:3002",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
				secure: false,
			},
		},
	},
});
