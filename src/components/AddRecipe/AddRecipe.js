import { useState } from "react";
import Input from "../Input/Input";
import "./AddRecipe.css";
import Ingredient from "../AddRecipeIngredient/Ingredient";
import AddIngredient from "../AddIngredient/AddIngredient";

export default function AddRecipe() {
  const NAME = "name";
  const SOURCE = "source";
  const PAGE = "page";

  const [recipe, setRecipe] = useState({
    name: "Name",
    source: "Source",
    page: "Page",
    ingredients: [],
  });

  const [isAddingIngredient, setIsAddingIngredient] = useState(false);

  function handleChange(key, value) {
    let input = { ...recipe };

    if (key === NAME) {
      console.log("Changing name");
      input.name = value;
    }

    if (key === SOURCE) {
      console.log("Changing source");
      input.source = value;
    }

    if (key === PAGE) {
      console.log("Changing Page");
      input.page = value;
    }

    setRecipe(input);
    console.log(recipe.name);
  }

  function addIngredient(ingredient, recipe) {
    console.log("Adding Ingredient");

    let newRecipe = {
      ...recipe,
    };

    newRecipe.ingredients.push(ingredient);

    setRecipe(newRecipe);
    console.log(JSON.stringify(recipe));

    setIsAddingIngredient(false);
  }

  function submitRecipe() {
    console.log("Submitting Recipe to Backend");
    console.log("Name: " + recipe.name);
    console.log("Source: " + recipe.source);
    console.log("Source Page: " + recipe.page);

    for (let i = 0; i < recipe.ingredients.length; i++) {
      const element = recipe.ingredients[i];
      let ingredient =
        element.name +
        " " +
        element.aisle +
        " " +
        element.amount +
        " " +
        element.measurement;
      console.log("Ingredient " + (i + 1) + ": " + ingredient);
    }
  }

  return (
    <>
      <div className="recipe-inputs">
        <Input
          field={NAME}
          handleChange={handleChange}
          placeholder="Name"
        ></Input>

        <Input
          field={SOURCE}
          handleChange={handleChange}
          placeholder="Source"
        ></Input>

        <Input
          field={PAGE}
          handleChange={handleChange}
          placeholder="Page"
        ></Input>
      </div>

      <div>
        <button onClick={() => setIsAddingIngredient(true)}>
          Add Ingredient
        </button>
      </div>

      {isAddingIngredient && (
        <AddIngredient
          isForRecipe={true}
          addIngredient={addIngredient}
          recipe={recipe}
        ></AddIngredient>
      )}

      <div className="ingredients-container">
        {recipe.ingredients.length > 0 &&
          recipe.ingredients.map((ingredient, index) => (
            <Ingredient ingredient={ingredient} key={index}></Ingredient>
          ))}
      </div>
    </>
  );
}
