import React, { useState } from "react";

// created the context here!
export const AuthContext = React.createContext({
	isAuth: false,
	login: () => {},
});

// this is where we feed the AuthContext!
export const AuthContextGiver = (props) => {
	const [isAuth, setAuth] = useState(false); // currently FALSE to showcase the <Auth /> component

	const loginHandler = () => {
		setAuth(true); // to go to the app!
	};

	/* We feed the state and the loginHandler into the .Provider! */
	/* This is used in index.js, and wraps the whole App */
	return (
		<AuthContext.Provider value={{ isAuth: isAuth, login: loginHandler }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextGiver;
