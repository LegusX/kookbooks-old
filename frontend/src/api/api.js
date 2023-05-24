import Axios from "axios";
import config from "../../../config";

//create custom axios instance
const axios = Axios.create();
if (import.meta.env.PROD)
	axios.defaults.baseURL = config.production.serverAddress;
else axios.defaults.baseURL = config.development.serverAddress;

export default axios;
