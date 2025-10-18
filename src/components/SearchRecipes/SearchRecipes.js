import { useState, useRef, useEffect } from "react";
import styles from "./SearchRecipes.module.css";

export default function SearchRecipes() {
  const [allRecipes, setAllRecipes] = useState([]);
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

      const sorted = data.sort((a, b) => {
        const nameA = a.recipeName.toUpperCase();
        const nameB = b.recipeName.toUpperCase();
      
        if (nameA < nameB) {
          return -1;
        }

        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });

      setAllRecipes(sorted);
      console.log("Found recipes: " + JSON.stringify(allRecipes));
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

    let results = allRecipes.filter((recipe) => {
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
        <input
          type="text"
          ref={searchRef}
          onChange={() => searchRecipes()}
          placeholder="Search recipes..."
          className={styles.input}
        />
      </div>

      <div className={styles.flexContainer}>
        <div className={styles.columnContainer}>
          <h1>Found Recipes</h1>
          <ul>
            {foundRecipes && foundRecipes.map((recipe, index) => (
              <li className={styles.foundRecipe} key={index} >
                <button onClick={() => { addToRecipes(recipe) }}>Add</button>
                {recipe.recipeName}
              </li>
            ))}
          </ul>

          <div className={styles.selectedRecipes}>
            <h1>Selected Recipes</h1>
            <button className={styles.getIngredientList} onClick={() => { submitList() }}>Get Ingredient List</button>
          </div>

          <ul>
          {recipeList && recipeList.map((recipe, index) => (
            <li className={styles.foundRecipe} key={index} >
              <button className={styles.removeRecipeButton} onClick={() => { removeFromRecipes(recipe.recipeName)}}>Remove</button>
              {recipe.recipeName}
            </li>
          ))}
          </ul>
        </div>

        <div className={styles.columnContainer}>
          <h1>All Recipes</h1>
          <ul>

          {allRecipes && allRecipes.map((recipe, index) => (
            <li className={styles.foundRecipe} key={index} >
              <button onClick={() => { addToRecipes(recipe) }}>Add</button>
              {recipe.recipeName}
            </li>
          ))}
          </ul>
        </div>
      </div>

    </>
  );
}
