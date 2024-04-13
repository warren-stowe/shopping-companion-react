import { useState } from "react";
import "./AddIngredient.css";
import { useEffect } from "react";

export default function AddIngredient({ addIngredient, isForRecipe, recipe }) {
  const [ingredientInput, setIngredient] = useState("");
  const [aisleInput, setAisle] = useState("");
  const [amountInput, setAmount] = useState("");
  const [measurementInput, setMeasurement] = useState("");
  const [optionalInput, setOptionalInput] = useState(true);
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

  useEffect(() => {
    console.log("Re-rendering AddIngredient");
  }, []);

  /**
   * This method routes form submission to the appropriate method depending on isForRecipe.
   */
  function submitForm() {
    isForRecipe ? addToRecipe() : submitIngredient();
  }

  /**
   * Adds an ingredient to the current recipe.  This is used in the addRecipe page of the site.
   */
  function addToRecipe() {
    console.log("Adding to recipe");

    let newIngredient = {
      ingredient: {
        ingredientName: ingredientInput,
        aisle: aisleInput,
      },
      quantity: {
        measurement: measurementInput,
        amount: amountInput,
        optional: optionalInput,
      },
    };

    addIngredient(newIngredient, recipe);
  }

  /**
   * Submits the ingredient to the database.  This is used in the addIngredient page of the site.
   */
  const submitIngredient = async () => {
    let ingredient = ingredientInput;
    let aisle = aisleInput;

    let message = "";
    let response = "";

    if (validateIngredient(message)) {
      let newIngredient = { ingredientName: ingredient, aisle: aisle };
      response = await fetch("http://localhost:8080/ingredients/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIngredient),
      });

      console.log("Response: " + JSON.stringify(response));

      if (response.ok) {
        alert("Submitted " + ingredient + ".");
      } else {
        alert("Failed to submit " + ingredient + ".");
      }
    }
  };

  /**
   * Method to confirm both the ingredient name and aisle are completed.
   * @param {*} message
   * @returns
   */
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

  /**
   * Clear the entire form.
   */
  function clearForm() {
    setIngredient("");
    setAisle("");

    if (isForRecipe) {
      setAmount("");
      setMeasurement("");
    }
  }

  /**
   * Call the findByIngredientName endpoint in shopping-companion to populate a list of database entries
   * that contain the current ingredient name input.
   * @param {*} ingredient
   * @returns
   */
  function getSimilarIngredients(ingredient) {
    if (ingredient.length === 0) {
      return;
    }

    fetch("http://localhost:8080/ingredients/" + ingredient, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((json) => {
        console.log("Fetched data: ", json);
        setSimilarIngredients(json);
      })
      .catch((error) => console.error(error));
  }

  /**
   * Update the ingredient's name field.
   * @param {} ingredient
   */
  function updateIngredient(ingredient) {
    setIngredient(ingredient);
    getSimilarIngredients(ingredient);
  }

  /**
   * Update the ingredient's aisle in a grocery store.
   * @param {} aisle
   */
  function updateAisle(aisle) {
    setAisle(aisle);
  }

  /**
   * Update the amount of an ingredient needed for a recipe.
   * @param {*} amount
   */
  function updateAmount(amount) {
    setAmount(amount);
  }

  /**
   * Update the measurement of the ingredient in a recipe.
   * @param {*} measurement
   */
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
              <div id="input-div">
                <label id="input-label">Optional</label>
                <input
                  className="select-input"
                  type="checkbox"
                  required
                  value={optionalInput}
                  onChange={(event) => setOptionalInput(!optionalInput)}
                ></input>
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

      {!isForRecipe &&
        similarIngredients &&
        similarIngredients.map((ingredient, index) => (
          <p>{ingredient.ingredientName}</p>
        ))}

      {isForRecipe &&
        similarIngredients &&
        similarIngredients.map((ingredient, index) => (
          <p>{ingredient.ingredientName}</p>
        ))}
    </div>
  );
}
