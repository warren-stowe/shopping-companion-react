import { useState } from "react";
import "./AddIngredient.css";

export default function AddIngredient({ addIngredient, isForRecipe, recipe }) {
  const [ingredientInput, setIngredient] = useState("");
  const [aisleInput, setAisle] = useState("");
  const [amountInput, setAmount] = useState("");
  const [measurementInput, setMeasurement] = useState("");

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

  const measurements = [
    "",
    "cup",
    "fl oz",
    "oz",
    "g",
    "lb",
    "tbsp",
    "tsp",
    "unit",
  ];

  function submitForm(event) {
    isForRecipe ? addToRecipe() : submitIngredient();
  }

  function addToRecipe() {
    console.log("Adding to recipe");

    let newIngredient = {
      name: ingredientInput,
      aisle: aisleInput,
      measurement: measurementInput,
      amount: amountInput,
    };

    addIngredient(newIngredient, recipe);
  }

  function submitIngredient() {
    console.log("Submitting Ingredient");
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

    if (isForRecipe) {
      setAmount("");
      setMeasurement("");
    }
  }

  function updateIngredient(ingredient) {
    setIngredient(ingredient);
  }

  function updateAisle(aisle) {
    setAisle(aisle);
  }

  function updateAmount(amount) {
    setAmount(amount);
  }

  function updateUnit(measurement) {
    setMeasurement(measurement);
  }

  return (
    <div>
      <div id="form-container">
        <form id="form-input-container" onSubmit={submitForm}>
          <div id="input-div">
            <label id="input-label">Ingredient</label>
            <input
              className="text-input"
              type="text"
              required
              value={ingredientInput}
              onChange={(event) => updateIngredient(event.target.value)}
            ></input>
          </div>
          <div id="input-div">
            <label id="input-label">Aisle</label>
            <select
              className="select-input"
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

          {isForRecipe && (
            <div>
              <div id="input-div">
                <label id="input-label">Amount</label>
                <input
                  className="text-input"
                  type="text"
                  required
                  value={amountInput}
                  onChange={(event) => updateAmount(event.target.value)}
                ></input>
              </div>
              <div id="input-div">
                <label id="input-label">Measurement</label>
                <select
                  className="select-input"
                  type="text"
                  required
                  value={measurementInput}
                  onChange={(event) => updateUnit(event.target.value)}
                >
                  {measurements.map((measurement, index) => (
                    <option value={measurement} key={index}>
                      {measurement}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="container">
            <button id="add-ingredient-button">
              {isForRecipe ? "Add" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
