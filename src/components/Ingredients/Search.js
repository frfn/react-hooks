import React, { useState, useEffect, useRef } from "react";
import axios from "../../axios/axios";
import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
	const { onLoadIngredients } = props;

	/* the string inputted */
	const [filter, setFilter] = useState("");

	/* for reference! so we can use the current value of filter, once the filter value goes into closure, we're able to compare current against the value locked */
	const inputRef = useRef();

	useEffect(() => {
		/* you can set a reference to setTimeout by assigning it to constant */
		const timer = setTimeout(() => {
			/* 
      filter value is locked in when timer starts, 
      it will NOT be value the user has entered AFTER the timer expires,
      it will be the value during the time it is LOCKED IN.

      it will not be the current input, but the old one!

      using inputRef to compare the 'current' value!
      it works because inputRef is outside the closure!

      we use === because once the user stops entering, and it is equivalent to the CURRENT value,
      THEN reachout!
      */
			if (filter === inputRef.current.value) {
				const query =
					filter.length === 0
						? ""
						: `?orderBy="title"&equalTo="${filter}"`; // syntax to filter
				axios
					.get("axiosAPI-ingredients.json" + query)
					.then((res) => {
						const fetchedIngredients = [];
						for (let ing in res.data) {
							fetchedIngredients.push({
								id: ing,
								...res.data[ing], // will return something like {amount: "4", title: "Apples"}
							});
						}
						onLoadIngredients(fetchedIngredients);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}, 500); // 500 ms

		/* componentWillUnmount, or clean up, must always return a function */
		/* look at notes, key stroke for every letter starts a timer, clean it up and only search at the LAST key stroke */
		return () => {
			clearTimeout(timer);
		};
	}, [filter, onLoadIngredients, inputRef]); // shouldComponentUpdate()

	const onChangeHandler = (event) => {
		setFilter(event.target.value);
	};

	return (
		<section className="search">
			<Card>
				<div className="search-input">
					<label>Filter by Title</label>

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
