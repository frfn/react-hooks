import React, { useState, useEffect, useCallback } from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import axios from "../../axios/axios";

const Ingredients = () => {
	const [ingredients, setIngredients] = useState([]); // componentDidMount()

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
  }, []); */

	useEffect(() => {
		console.log("update?", ingredients);
	}, [ingredients]);

	const addIngredientHandler = (ingredient) => {
		/* AXIOS API */
		axios
			.post("axiosAPI-ingredients.json", ingredient)
			.then((response) => {
				// console.log(response.data.name);
				setIngredients((prevState) => [
					...prevState,
					{
						...ingredient,
						id: response.data.name, // axios generated
					},
				]);
			})
			.catch((error) => {
				// console.log(error);
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
		/* if false, remove ingredient */
		// const updatedIngredient = ingredients.filter(
		// 	(ingredient) => id !== ingredient.id
		// );

		console.log(id);

		axios
			.delete("axiosAPI-ingredients/" + id + ".json")
			.then((res) => console.log(res))
			.catch((error) => console.log(error));

		setIngredients((prevState) =>
			prevState.filter((ingredient) => id !== ingredient.id)
		);
	};

	const filteredIngredientsHandler = useCallback((filteredIngredients) => {
		setIngredients(filteredIngredients);
	}, []); // [setIngredients] , since setIngredients is dependant of function

	return (
		<div className="App">
			<IngredientForm onAddIngredient={addIngredientHandler} />

			<section>
				<Search onLoadIngredients={filteredIngredientsHandler} />
				<IngredientList
					onRemoveItem={removeIngredientHandler}
					ingredients={ingredients}
				/>
			</section>
		</div>
	);
};

export default Ingredients;
