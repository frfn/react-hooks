import React from "react"; // { useState }
// import axios from "../../axios/axios";
import "./IngredientList.css";

const IngredientList = (props) => {
	console.log("RERENDER LIST!");
	return (
		<section className="ingredient-list">
			<h2>Loaded Ingredients</h2>
			<ul>
				{props.ingredients.map((ig) => (
					<li
						key={ig.id}
						// onClick={props.onRemoveItem.bind(this, ig.id)}
						onClick={() => props.onRemoveItem(ig.id)}
					>
						<span>{ig.title}</span>
						<span>{ig.item}</span>
						<span>{ig.amount}x</span>
					</li>
				))}
			</ul>
		</section>
	);
};

export default IngredientList;
