import "./App.css";
import "./components/AddIngredient/AddIngredient.js";
import AddIngredient from "./components/AddIngredient/AddIngredient.js";
import AddRecipe from "./components/AddRecipe/AddRecipe.js";
import SearchRecipes from "./components/SearchRecipes/SearchRecipes.js";
import { useState } from "react";

function App() {
  const [selectedButton, setSelectedButton] = useState(null);

  return (
    <div>
      <header className="App">
        <button
          id="addIngredientBtn"
          onClick={() => setSelectedButton("AddIngredient")}
        >
          Add Ingredient
        </button>
        <button
          id="addRecipeBtn"
          onClick={() => setSelectedButton("AddRecipe")}
        >
          Add Recipe
        </button>
        <button
          id="searchRecipesBtn"
          onClick={() => setSelectedButton("SearchRecipes")}
        >
          Search Recipes
        </button>
      </header>
      <div id="main-container">
        {selectedButton === "AddIngredient" && <AddIngredient></AddIngredient>}
        {selectedButton === "AddRecipe" && <AddRecipe></AddRecipe>}
        {selectedButton === "SearchRecipes" && <SearchRecipes></SearchRecipes>}
      </div>
    </div>
  );
}

export default App;
