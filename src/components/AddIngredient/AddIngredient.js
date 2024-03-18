import { useRef, useState } from "react";
import "./AddIngredient.css";

export default function AddIngredient() {
  const [ingredientInput, setIngredient] = useState("");
  const [aisleInput, setAisle] = useState("");

  const aisles = [
    "",
    "Beverages",
    "Bread",
    "Canned",
    "Dairy",
    "Frozen",
    "International",
    "Meat",
    "Produce",
    "Seafood",
    "Spices",
  ];

  function submitIngredient(event) {
    event.preventDefault();
    let ingredient = ingredientInput;
    let aisle = aisleInput;
    let isInvalid = false;

    let message = "";

    if (ingredient.length <= 0) {
      let updatedMessage = "\nIngredient is invalid";
      message = updatedMessage;
      isInvalid = true;
    }

    if (aisle.length <= 0) {
      let updatedMessage = message;
      updatedMessage += "\nAisle is invalid";
      message = updatedMessage;
      isInvalid = true;
    }

    if (isInvalid) {
      alert("Invalid Input : " + message);
    } else {
      alert(ingredient + " (" + aisle + ") submitted");

      let newIngredient = { ingredient: ingredient, aisle: aisle };
      // call addIngredient endpoint

      clearForm();
    }
  }

  function clearForm() {
    setIngredient("");
    setAisle("");
  }

  function updateIngredient(ingredient) {
    setIngredient(ingredient);
  }

  function updateAisle(aisle) {
    setAisle(aisle);
  }

  return (
    <div>
      <div id="form-container">
        <form id="form-input-container" onSubmit={submitIngredient}>
          <div id="input-div">
            <label id="input-label">Ingredient</label>
            <input
              id="ingredient-input"
              type="text"
              required
              value={ingredientInput}
              onChange={(event) => updateIngredient(event.target.value)}
            ></input>
          </div>
          <div id="input-div">
            <label id="input-label">Aisle</label>
            <select
              id="aisle-select"
              type="text"
              required
              value={aisleInput}
              onChange={(event) => updateAisle(event.target.value)}
            >
              {aisles.map((aisle, index) => (
                <option value={aisle} key={index}>
                  {aisle}
                </option>
              ))}
            </select>
          </div>

          <div className="container">
            <button id="add-ingredient-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
