import React, { useState, useEffect, useRef } from "react";
import axios from "../../axios/axios";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import "./Search.css";
// import LoadingIndicator from "../UI/LoadingIndicator";

// React.memo === shouldComponentUpdate, so update if there is a change!
// check 1a. burgerbuilder to see the SECOND argument that it takes, Modal.js! It also explains in burgerbuilder OG, that React.memo === shouldComponentUpdate!
const Search = React.memo((props) => {
	console.log("rerender");
	const { onLoadIngredients } = props; // this is the SETTER for the array in Ingredients.js

	/* user input */
	const [filter, setFilter] = useState("");

	const [refFilter, setRefFilter] = useState(""); // this works, but it IS not the same as useRef, useRef if the ACTUAL value

	/* if any errors that comes from axios */
	const [error, setError] = useState();

	/* for loading! */
	const [loading, setLoading] = useState(false);

	/* for reference! so we can use the current value of filter, once the filter value goes into closure, setTimeout(), we're able to compare CURRENT value against the LOCKED value */
	const inputRef = useRef();

	/* rerenders after completion! + executes every time the filter value changes */
	useEffect(() => {
		/* you can set a reference to setTimeout by assigning it to constant, `timer` */
		const timer = setTimeout(() => {
			console.log("FILTER:", filter);

			console.log("INPUTREF.CURRENT.VALUE:", inputRef.current.value);

			/* 
				`filter` value is what is BEING typed
				`ref.current.value` is what is ALREADY typed.

				`filter` value is locked in when timer starts, 
				it will NOT be value the user has entered AFTER the timer expires,
				it will be the value during the time it is LOCKED IN.

				it will not be the current input in the input field, but filter value of when the closure starts!

				using inputRef to grab the 'current' value!
				We can grab inputRef because it is outside the closure!

				we use === ( equality operator ) because once the user stops entering, and it IS equivalent to the CURRENT value of what is inside the input field,
				THEN execute the .get() code
			*/

			// once the `filter` value has CAUGHT up with the current value in the text field, then axios call
			// `filter` value will be lagging behind because of the SET TIMEOUT of 500 for the timer!
			// inputRef.current.value is literally that, the current value!
			if (filter === /* refFilter */ inputRef.current.value) {
				const query =
					filter.length === 0
						? ""
						: `?orderBy="title"&equalTo="${filter}"`; // syntax to search for item in Firebase
				setLoading(true);
				axios
					.get("axiosAPI-ingredients.json" + query)
					.then((res) => {
						setLoading(false);
						const fetchedIngredients = [];
						for (let ing in res.data) {
							fetchedIngredients.push({
								id: ing,
								...res.data[ing], // will return something like {amount: "4", title: "Apples"}
							});
						}
						onLoadIngredients(fetchedIngredients); // this is WHERE WE GET DATA for our array inside the Ingredients.js -- it is an empty array at the beginning!
					})
					.catch((err) => {
						console.log(err);
						setLoading(false);
						setError(err);
					});
			}
		}, 2000); // 2 seconds!

		/* componentWillUnmount, or clean up, must always return a function */
		/* look at notes, key stroke for every letter starts a timer, clean it up and only search at the LAST key stroke */

		// why do we have to clear?
		// useEffect is basically componentDidUpdate in this regard, because of the deps in the second argument, it will run IF there are any changes to the state | component!
		// every time the user enters a key stroke, it calls useEffect, the state | component updates!
		/* 
		
		So let's say i type, flexer, it will do

		f -> 500ms
		l -> 500ms
		e -> 500ms
		x -> 500ms
		e -> 500ms
		r -> 500ms

		it will start a timer, for every letter.

		... no need. just clear it with clearTimeout()
		
		so when the comparison is executed, if it is `flexer` === `flexer`, only THEN execute

		*/
		return () => {
			clearTimeout(timer); // this really does work!, we ARE clearing the execessive timers! Woohoo!!
		};
	}, [refFilter, filter, onLoadIngredients, inputRef]); // shouldComponentUpdate()

	const onChangeHandler = (event) => {
		setFilter(event.target.value);
		// setRefFilter(event.target.value); for testing and THIS works
	};

	const clearError = () => {
		setError(false);
	};

	return (
		<section className="search">
			{error && (
				<ErrorModal onClose={clearError}>{error.message}</ErrorModal>
			)}
			<Card>
				<div className="search-input">
					<label>Filter by Title</label> {loading && "Loading..."}
					{/* two way binding for the value */}
					<input
						ref={inputRef}
						type="text"
						value={filter}
						onChange={(event) => onChangeHandler(event)}
					/>
				</div>
			</Card>
		</section>
	);
});

export default Search;
