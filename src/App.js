import React, { useContext } from "react"; // useContext is enabled
import Auth from "./components/Auth";
import { AuthContext } from "./context/auth-context";
import Ingredients from "./components/Ingredients/Ingredients";

const App = (props) => {
	// this is how you implement context for functional components
	const authContext = useContext(AuthContext);

	// Auth component is just a div that will turn the boolean value of authContext.isAuth to true!
	let content = <Auth />;

	// which will enable us to go to the content
	// isAuth is initialized back in index.js, you can use it here now!
	if (authContext.isAuth) {
		content = <Ingredients />;
	}

	return content;
};

export default App;
