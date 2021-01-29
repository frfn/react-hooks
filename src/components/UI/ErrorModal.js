import React from "react";

import "./ErrorModal.css";
/* 
ErrorModal is just a div that shows an error occured!

Keep note:
the backdrop really is just a div with a CSS styling, we made into a Component so we can use it everywhere! , here is not the case!
~ if you click on div, it will execute the onClose function, which sets error to null, not showing the ErrorModal

ALSO KEEP NOTE:
you don't need the withErrorHandler HOC to show modals!
Read the withErrorHandler code in BurgerBuilder to see what it does!
*/

const ErrorModal = React.memo((props) => {
	return (
		<React.Fragment>
			<div className="backdrop" onClick={props.onClose} />
			<div className="error-modal">
				<h2>An Error Occurred!</h2>
				<h3>{props.children}</h3>
				<div className="error-modal__actions">
					<button type="button" onClick={props.onClose}>
						Okay
					</button>
				</div>
			</div>
		</React.Fragment>
	);
});

export default ErrorModal;
