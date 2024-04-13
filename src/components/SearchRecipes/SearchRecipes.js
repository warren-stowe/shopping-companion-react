import { useState } from "react";
import "./SearchRecipes.css";

export default function SearchRecipes() {
  const [search, setSearch] = useState("");
  const [foundRecipes, setFoundRecipes] = useState([]);
  const [recipeList, setRecipeList] = useState([]);

  function handleChange(input) {
    setSearch(input);
    searchRecipes(input);
  }

  const searchRecipes = async (input) => {
    try {
      const response = await fetch("http://localhost:8080/recipes/search/" + input, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await response.json();
      setFoundRecipes(data);
      console.log(JSON.stringify(data));

      setFoundRecipes(data);
      console.log("Found recipes: " + JSON.stringify(foundRecipes));
    } catch (error) {
      console.error("Error searching recipes: ", error);
    }
  }

  function addToRecipes(recipe) {
    setRecipeList([...recipeList, recipe]);
    console.log(recipeList);
  }

  const submitList = async () => {

    let recipeIds = recipeList.map(recipe => recipe.id);

    console.log("recipeIds: " + JSON.stringify(recipeIds));

    try {
      const response = await fetch("http://localhost:8080/list/recipes", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipeIds: recipeIds }),
      });

      if (!response.ok) {
        throw new Error("Failed to send recipe list");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error getting ingredient list: ", error);
    }
  }

  return (
    <>
      <div className="search-container">
        <span>🔎</span>
        <input
          type="text"
          onChange={(event) => handleChange(event.target.value)}
          value={search}
        ></input>
      </div>

      <h1>Found Recipes</h1>
      {foundRecipes && foundRecipes.map((recipe, index) => (
        <button key={index} onClick={() => { addToRecipes(recipe) }}>{recipe.recipeName}</button>
      ))}

      <h1>Selected Recipes</h1>
      {recipeList && recipeList.map((recipe, index) => (
        <p>{recipe.recipeName}</p>
      ))}

      <button onClick={() => { submitList() }}>Get Ingredient List</button>
    </>
  );
}
