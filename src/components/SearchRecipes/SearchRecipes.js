import { useState, useRef } from "react";
import styles from "./SearchRecipes.module.css";

export default function SearchRecipes() {
  const [foundRecipes, setFoundRecipes] = useState([]);
  const [recipeList, setRecipeList] = useState([]);

  const searchRef = useRef("");

  const searchRecipes = async () => {
    const input = searchRef.current.value;
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

  function removeFromRecipes(recipe) {
    return setRecipeList(recipeList.filter((r) => r.recipeName != recipe));
  }

  const submitList = async () => {

    if (recipeList.length <= 0) {
      throw new Error("Please select at least 1 recipe");
    }

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
      <div className={styles.searchContainer}>
        <span>🔎</span>
        <input
          type="text"
          ref={searchRef}
          onChange={() => searchRecipes()}
        ></input>
      </div>

      <h1>Found Recipes</h1>
      {foundRecipes && foundRecipes.map((recipe, index) => (
        <li className={styles.foundRecipe} key={index} >
          <button onClick={() => { addToRecipes(recipe) }}>Add</button>
          {recipe.recipeName}
        </li>
      ))}

      <h1>Selected Recipes</h1>
      {recipeList && recipeList.map((recipe, index) => (
        <li className={styles.foundRecipe} key={index} >
          <button className={styles.removeRecipeButton} onClick={() => { removeFromRecipes(recipe.recipeName)}}>Remove</button>
          {recipe.recipeName}
        </li>
      ))}

      <button className={styles.getIngredientList} onClick={() => { submitList() }}>Get Ingredient List</button>
    </>
  );
}
