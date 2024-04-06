import { useState } from "react";
import "./AddIngredient.css";

export default function AddIngredient({ addIngredient, isForRecipe, recipe }) {
  const [ingredientInput, setIngredient] = useState("");
  const [aisleInput, setAisle] = useState("");
  const [amountInput, setAmount] = useState("");
  const [measurementInput, setMeasurement] = useState("");
  const [similarIngredients, setSimilarIngredients] = useState([]); 

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

  const submitIngredient = async() => {
    console.log("Submitting Ingredient");
    let ingredient = ingredientInput;
    let aisle = aisleInput;

    let message = "";

    if (validateIngredient(message)) {
      alert(ingredient + " (" + aisle + ") submitted");
      let newIngredient = { ingredient: ingredient, aisle: aisle };
      const response = await fetch("localhost:8080/ingredients/all");
      console.log(response.data);
      // call addIngredient endpoint
      clearForm();
    } else {
      alert("Invalid Input : " + message);
    }
  }

  function validateIngredient(message) {
    let isValid = true;

    if (ingredientInput.length <= 0) {
      let updatedMessage = "\nIngredient is invalid";
      message = updatedMessage;
      isValid = false;
    }

    if (aisleInput.length <= 0) {
      let updatedMessage = message;
      updatedMessage += "\nAisle is invalid";
      message = updatedMessage;
      isValid = false;
    }
    
    return isValid;
  }

  function clearForm() {
    setIngredient("");
    setAisle("");

    if (isForRecipe) {
      setAmount("");
      setMeasurement("");
    }
  }

  function getSimilarIngredients(ingredient) {

    fetch("http://localhost:8080/ingredients/" + ingredient, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    })
    .then(json => {
      console.log("Fetched data: ", json);
      setSimilarIngredients(json);
    })
    .catch(error => console.error(error));
  }

  function updateIngredient(ingredient) {
    setIngredient(ingredient);
    getSimilarIngredients(ingredient);
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
        <button onClick={() => console.log(JSON.stringify(similarIngredients))}>Click Me</button>
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
