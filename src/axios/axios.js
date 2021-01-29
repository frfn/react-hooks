import axios from "axios";

/* axios.create to set our URL for a base path */
const instance = axios.create({
	baseURL: "https://react-hooks-project-dc5a7.firebaseio.com/",
});

export default instance;
