import logo from './logo.svg';
import './App.css';
import './components/AddIngredient.js';
import AddIngredient from './components/AddIngredient.js';
import AddRecipe from './components/AddRecipe';
import SearchRecipes from './components/SearchRecipes';
import { useState } from 'react';

function App() {

  const [selectedButton, setSelectedButton] = useState(null);


  function handleClick() {
    this.currentScreen = 'test';
  }

  return (
    <body>

      <header className="App">
        <button id='addIngredientBtn' onClick={() => setSelectedButton('AddIngredient')}>Add Ingredient</button>
        <button id='addRecipeBtn' onClick={() => setSelectedButton('AddRecipe')}>Add Recipe</button>
        <button id='searchRecipesBtn' onClick={() => setSelectedButton('SearchRecipes')}>Search Recipes</button>

      </header>
      <div id='main-container'>
        {selectedButton === 'AddIngredient' && <AddIngredient></AddIngredient>}
        {selectedButton === 'AddRecipe' && <AddRecipe></AddRecipe>}
        {selectedButton === 'SearchRecipes' && <SearchRecipes></SearchRecipes>}
      </div>
    </body>
  );
}

export default App;
