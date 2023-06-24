const config = {
	production: {
		serverAddress:"/api",
		//serverAddress: "https://api.kookbooks.app",
		serverPort: "443",
	},
	development: {
		serverPort: 3000,
		serverAddress: "/api",
	},
};

export default config;
