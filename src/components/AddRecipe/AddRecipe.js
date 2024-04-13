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
    recipe: {
      recipeName: "Name",
      source: "Source",
      sourcePage: "Page"
    },
    ingredientQuantities: [],
  });

  const [isAddingIngredient, setIsAddingIngredient] = useState(false);

  function handleChange(key, value) {
    let input = { ...recipe };

    if (key === NAME) {
      console.log("Changing name");
      input.recipe.recipeName = value;
    }

    if (key === SOURCE) {
      console.log("Changing source");
      input.recipe.source = value;
    }

    if (key === PAGE) {
      console.log("Changing Page");
      input.recipe.sourcePage = value;
    }

    setRecipe(input);
    console.log(recipe.name);
  }

  function addIngredient(ingredient, recipe) {
    console.log("Adding Ingredient");

    let newRecipe = {
      ...recipe,
    };

    newRecipe.ingredientQuantities.push(ingredient);

    setRecipe(newRecipe);
    console.log(JSON.stringify(recipe));

    setIsAddingIngredient(false);
  }

  const submitRecipe = async() => {
    console.log("Submitting Recipe to Backend");

    let response = await fetch("http://localhost:8080/recipes/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      })

    // for (let i = 0; i < recipe.ingredientQuantities.length; i++) {
    //   const element = recipe.ingredientQuantities[i];
    //   let ingredient =
    //     element.name +
    //     " " +
    //     element.aisle +
    //     " " +
    //     element.amount +
    //     " " +
    //     element.measurement;
    //   console.log("Ingredient " + (i + 1) + ": " + ingredient);
    // }

    console.log(response);
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

      {recipe && <p>{JSON.stringify(recipe)}</p>}

      <div className="ingredients-container">
        {recipe.ingredientQuantities.length > 0 &&
          recipe.ingredientQuantities.map((ingredient, index) => (
            <Ingredient ingredient={ingredient} key={index}></Ingredient>
          ))}
      </div>

      <button onClick={() => submitRecipe()}>Submit Recipe</button>
    </>
  );
}
