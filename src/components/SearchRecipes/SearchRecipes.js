import { useState, useRef, useEffect } from "react";
import styles from "./SearchRecipes.module.css";

export default function SearchRecipes() {
  const allRecipes = useRef();
  const [foundRecipes, setFoundRecipes] = useState([]);
  const [recipeList, setRecipeList] = useState([]);

  const searchRef = useRef("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
      const response = await fetch("http://localhost:8080/recipes/all/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      
      const data = await response.json();
      allRecipes.current = data;
      console.log("Found recipes: " + JSON.stringify(allRecipes.current));
    } catch (error) {
      console.error("Error searching recipes: ", error);
    }
  };

  fetchRecipes();

  }, []);

  const searchRecipes = () => {
    const input = searchRef.current.value;

    if (input.length == 0) {
      setFoundRecipes([]);
      return;
    }

    let results = allRecipes.current.filter((recipe) => {
      if (recipe.recipeName.includes(input)) {
        return recipe;
      }
    });

    setFoundRecipes(results);
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
