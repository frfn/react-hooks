import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import AuthContextProvider from "./context/auth-context"; // provided the auth context!

/* Note the .Provider isn't need else where, and can just access the context because the context is initialized here already, if you look at App.js it just uses the context isAuth */
ReactDOM.render(
	<AuthContextProvider>
		<App />
	</AuthContextProvider>,
	document.getElementById("root")
);
