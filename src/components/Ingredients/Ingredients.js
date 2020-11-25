import React, { useEffect, useCallback, useReducer } from "react"; // useState,
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import axios from "../../axios/axios";
import ErrorModal from "../UI/ErrorModal";

/* similar to redux... */
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

const httpReducer = (curHttpState, action) => {
	switch (action.type) {
		case "CLEAR":
			return { ...curHttpState, error: null };

		case "SEND":
			return { loading: true, error: null };

		case "RESPONSE":
			return { loading: false, ...curHttpState };

		case "ERROR":
			return { error: action.error, loading: false };

		default:
			throw new Error("should not get here...");
	}
};

const Ingredients = () => {
	const [userIngredient, dispatch] = useReducer(ingredientReducer, []);
	const [httpState, dispatchHttp] = useReducer(httpReducer, {
		loading: false,
		error: null,
	});

	// const [ingredients, setIngredients] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);
	// const [error, setError] = useState();

	// not needed because GET method is done in <Search>
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

	useEffect(() => {
		console.log("update?", userIngredient);
	}, [userIngredient]);

	const addIngredientHandler = (ingredient) => {
		dispatchHttp({
			type: "SEND",
		});
		// setIsLoading(true);
		/* AXIOS API */
		axios
			.post("axiosAPI-ingredients.json", ingredient)
			.then((response) => {
				dispatchHttp({ type: "RESPONSE" });
				// setIsLoading(false);
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
				// setIsLoading(false);
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
	};

	const removeIngredientHandler = (id) => {
		dispatchHttp({
			type: "SEND",
		});
		// setIsLoading(true);
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
				dispatchHttp({ type: "RESPONSE" });
				// setIsLoading(false);
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
				// setIsLoading(false);
				dispatchHttp({
					type: "ERROR",
					error: error.message + " - Something went wrong!",
				});
			});
	};

	const filteredIngredientsHandler = useCallback((filteredIngredients) => {
		// setIngredients(filteredIngredients);
		dispatch({
			type: "SET",
			ingredients: filteredIngredients,
		});
	}, []); // [setIngredients] , since setIngredients is dependant of function

	const clearError = () => {
		dispatchHttp({ type: "CLEAR" });
	};
	return (
		<div className="App">
			{httpState.error && (
				<ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
			)}

			<IngredientForm
				loading={httpState.loading}
				onAddIngredient={addIngredientHandler}
			/>

			<section>
				<Search onLoadIngredients={filteredIngredientsHandler} />
				<IngredientList
					onRemoveItem={removeIngredientHandler}
					ingredients={userIngredient}
				/>
			</section>
		</div>
	);
};

export default Ingredients;
