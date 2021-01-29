import React, {
	useState, // state management
	// useEffect,
	useCallback, // saving function render so that the function is NOT changed, this is cool, probably saved rendering time
	useMemo, // saves the VALUE from rerender cycles, it does NOT destroy it!
	useReducer, // this uses a reducer, similar to Redux, but NOT at all Redux, use Redux hahaha!!
} from "react";

// components
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";

// depedencies -- things we need
import axios from "../../axios/axios";
import ErrorModal from "../UI/ErrorModal";

/* similar to redux... IT IS INITIALIZED WITH useReducer inside the functional component */
// a function that returns something, here it's an array!
const ingredientReducer = (currentIngredient, action) => {
	switch (action.type) {
		case "SET":
			return action.ingredients; // this is an array

		case "ADD":
			return [...currentIngredient, action.ingredient];

		case "DELETE":
			return currentIngredient.filter((ing) => ing.id !== action.id);

		default:
			throw new Error("should not get here...");
	}
};

/* controls loading + modal */
const httpReducer = (curHttpState, action) => {
	switch (action.type) {
		case "RES":
			return { loading: false, ...curHttpState };

		case "CLEAR":
			return { ...curHttpState, error: null };

		case "SEND":
			return { loading: true, error: null };

		case "ERROR":
			return { error: action.error, loading: false };

		default:
			throw new Error("should not get here...");
	}
};

const Ingredients = () => {
	const [userIngredient, dispatch] = useReducer(ingredientReducer, []); // initializing the reducer with an array, ex. SET will be a empty array, dispatch IS USED along with the Search component!
	const [httpState, dispatchHttp] = useReducer(httpReducer, {
		loading: false,
		error: null,
	});

	const [isLoading, setIsLoading] = useState(false); // needed because DISPATCH AINT WORKING WITH AXIOS, it needs to be with fetch since it has 2 .then()'s!

	// const [error, setError] = useState();
	// const [ingredients, setIngredients] = useState([]);

	// not needed because GET method is done in <Search>, we call the grabbing of data FROM THE SEARCH COMPONENT!
	/* useEffect(() => {
		axios
			.get("axiosAPI-ingredients.json")
			.then((res) => {
				const fetchedIngredients = [];
				for (let ing in res.data) {
					fetchedIngredients.push({ id: ing, ...res.data[ing] });
				}

				setIngredients(fetchedIngredients);
			})
			.catch((err) => {
				console.log(err);
			});
  }, []); // componentDidMount() */

	// useEffect(() => {
	// 	console.log("update?", userIngredient);
	// }, [userIngredient]);

	// take note of useCallback, we want to preserve this function, every rerender, because the function DOES change. it takes in a second argument, [], just like useEffect!
	const addIngredientHandler = useCallback(
		(ingredient) => {
			dispatchHttp({
				type: "SEND",
			});
			setIsLoading(true); // this is for the loading animation!,

			/* AXIOS API */
			axios
				.post("axiosAPI-ingredients.json", ingredient)
				.then((response) => {
					dispatchHttp({ type: "RES" });
					setIsLoading(false);
					// console.log(response.data.name);
					// setIngredients((prevState) => [
					// 	...prevState,
					// 	{
					// 		...ingredient,
					// 		id: response.data.name, // axios generated
					// 	},
					// ]);
					dispatch({
						type: "ADD",
						ingredient: { ...ingredient, id: response.data.name },
					});
				})
				.catch((error) => {
					// console.log(error);
					dispatchHttp({
						type: "ERROR",
						error: error.message + " - Something went wrong!",
					});
					// setError(error.message + " - Something went wrong!");
					setIsLoading(false);
				});

			/* FETCH API */
			// fetch(
			// 	"https://react-hooks-project-dc5a7.firebaseio.com/fetchAPI-ingredients.json",
			// 	{
			// 		method: "POST",
			// 		body: JSON.stringify(ingredient),
			// 		headers: { "Content-Type": "application/json" },
			// 	}
			// )
			// 	.then((response) => {
			// 		console.log(response);
			// 		return response.json();
			// 	})
			// 	.then((responseData) => {
			// 		console.log(responseData);
			// 		setIngredients((prevState) => {
			// 			return [
			// 				...prevState,
			// 				{
			// 					id: responseData.name, // created by firebase
			// 					...ingredient,
			// 				},
			// 			];
			// 		});
			// 	})
			// 	.catch((error) => {
			// 		console.log(error);
			// 	});
		},
		[
			/* setIsLoading, dispatchHttp */
		] // setIsLoading & dispatchHttp does not have to be updated
	);

	// take note again, useCallback, let's preserve this function!
	const removeIngredientHandler = useCallback((id) => {
		dispatchHttp({
			type: "SEND",
		});
		setIsLoading(true);
		/* fetchAPI syntax */
		// fetch(`...firebaseio.com/ingredients/${id}.json`, {
		// 	method: "DELETE",
		// })
		// 	.then(/* you can move logic here to update state */)
		// 	.then()
		// 	.catch();

		/* if false, remove ingredient */
		// const updatedIngredient = ingredients.filter(
		// 	(ingredient) => id !== ingredient.id
		// );

		// console.log(id);

		axios
			.delete(`axiosAPI-ingredients/${id}.json`)
			.then((res) => {
				dispatchHttp({ type: "RES" });
				setIsLoading(false);
				// setIngredients((prevState) =>
				// 	prevState.filter((ingredient) => id !== ingredient.id)
				// );
				dispatch({
					type: "DELETE",
					id: id,
				});
			})
			.catch((error) => {
				// console.log(error, error.message); error.message = "Network Error"
				// setError(error.message + " - Something went wrong!");
				setIsLoading(false);
				dispatchHttp({
					type: "ERROR",
					error: error.message + " - Something went wrong!",
				});
			});
	}, []);

	// useCallback! this is a function that is important, it will be USED in <Search /> component
	const filteredIngredientsHandler = useCallback((filteredIngredients) => {
		// setIngredients(filteredIngredients);
		dispatch({
			type: "SET",
			ingredients: filteredIngredients,
		});
	}, []); // [setIngredients] , since setIngredients is dependant of function

	/* this clears the error! */
	const clearError = useCallback(() => {
		dispatchHttp({ type: "CLEAR" });
	}, []);

	// check this out! useMemo!, we want to preserve this Component | value!, different from saving functions!
	const ingredientList = useMemo(
		() => (
			<IngredientList
				onRemoveItem={removeIngredientHandler}
				ingredients={userIngredient}
			/>
		),
		[removeIngredientHandler, userIngredient]
	);

	return (
		<div className="App">
			{httpState.error && (
				<ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
			)}

			<IngredientForm
				// loading={httpState.loading}
				loading={isLoading}
				onAddIngredient={addIngredientHandler}
			/>

			<section>
				<Search onLoadIngredients={filteredIngredientsHandler} />
				{/* the method IS PASSED down to Search, Search will THEN call it over inside it's self, TAKE NOTE that this how they are connected! */}
				{ingredientList}
				{/* 
        Moving to ingredientList
        <IngredientList
					onRemoveItem={removeIngredientHandler}
					ingredients={userIngredient}
				/> */}
			</section>
		</div>
	);
};

export default Ingredients;
