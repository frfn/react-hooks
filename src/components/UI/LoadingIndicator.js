import React from "react";
import "./LoadingIndicator.css";

/* the divs are here for reason, check the loading indicator, probably outsourced tbh */

const LoadingIndicator = () => (
	<div className="lds-ring">
		<div />
		<div />
		<div />
		<div />
	</div>
);

export default LoadingIndicator;
