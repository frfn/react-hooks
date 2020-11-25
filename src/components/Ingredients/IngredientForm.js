import React, {
	// useEffect,
	useRef,
	useState,
} from "react";
import LoadingIndicator from "../UI/LoadingIndicator";
import Card from "../UI/Card";
import "./IngredientForm.css";

/* Component rerenders every time a keystroke is entered... is there a way to fix? React.memo? useMemo()? setTimeout()? */

const IngredientForm = React.memo((props) => {
	const [currentItem, setItem] = useState("");
	const [currentTitle, setTitle] = useState("");
	const [currentAmount, setAmount] = useState("");
	const titleRef = useRef();

	console.log("RERENDER after each key stroke?");

	const submitHandler = (event) => {
		event.preventDefault();
		props.onAddIngredient({
			item: currentItem,
			title: currentTitle,
			amount: currentAmount,
		});
	};

	/* decommissioned */
	// const inputHandler = (event) => {
	// 	event.preventDefault();

	// 	/* I had to create variables outside of
	//   prevState, because it is a closure,
	//   and I am not able to get the event object to be passed in to INNER function
	//   because it will lock the event object in as it is the inital valued, by creating
	//   the variables below, this solves this 'initial' issue */
	// 	const newValue = event.target.value;
	// 	const id = event.target.id;

	// 	/* setState is function, that calls a function

	//   creating 'newValue' and 'id' is needed. We must create the variables because
	//   if we grab 'event.target.value' or 'event.target.id' straight from the parameter,
	//   THEN go into the anonymous function where we update the state...
	//   the value will not be correct as the event values, INITIALLY will be locked in.

	//   if i don't use closures correctly

	//   if i type:
	//   hello, it will lock in 'h', and resuse it the whole time, it is locked in for the object

	//   a function, that returns a function, that can return a value, here it return a JSON object which are the updated states

	//   RULE. Always create new variables when dealing with a function that returns a function, that returns a value...
	//   */

	// 	// I did ...prevState for merging purposes

	// 	// Now decommissioned.
	// 	/* setState((prevState) => ({
	// 		...prevState,
	// 		[id]: newValue,
	// 	})); */
	// };

	return (
		<section className="ingredient-form">
			<Card>
				<form onSubmit={submitHandler}>
					<div className="form-control">
						<label htmlFor="title">Name</label>

						{/* two way binding */}
						<input
							ref={titleRef}
							type="text"
							id="title"
							name="title"
							value={currentTitle}
							onChange={(event) => {
								// const newTitle = event.target.value;
								// setTitle(newTitle);
								setTitle(event.target.value); // updating will always cause a rerender
							}}
						/>
					</div>

					<div className="form-control">
						<label htmlFor="item">Item</label>

						{/* two way binding */}
						<input
							type="text"
							id="item"
							name="item"
							value={currentItem}
							onChange={(event) => {
								// const newTitle = event.target.value;
								// setTitle(newTitle);
								setItem(event.target.value); // updating will always cause a rerender
							}}
						/>
					</div>

					<div className="form-control">
						<label htmlFor="amount">Amount</label>
						<input
							type="number"
							id="amount"
							name="amount"
							value={currentAmount}
							onChange={(event) => {
								// const newAmount = event.target.value;
								// setAmount(newAmount);
								setAmount(event.target.value);
							}}
						/>
					</div>
					<div className="ingredient-form__actions">
						<button onSubmit={submitHandler} type="submit">
							Add Ingredient
						</button>
						{/* {console.log(props.loading)} */}
						{props.loading && <LoadingIndicator />}
					</div>
				</form>
			</Card>
		</section>
	);
});

export default IngredientForm;
