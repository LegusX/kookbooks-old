import Axios from "axios";
import config from "../../../config";

//create custom axios instance
const axios = Axios.create();
axios.defaults.baseURL =
	config[process.env.NODE_ENV].serverAddress + config.api;

export default axios;
