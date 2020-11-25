import axios from "axios";

const instance = axios.create({
	baseURL: "https://react-hooks-project-dc5a7.firebaseio.com/",
});

export default instance;
