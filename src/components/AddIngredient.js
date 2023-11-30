import { useState } from 'react';
import './AddIngredient.css';

export default function AddIngredient() {

    const [ingredientInput, setIngredient] = useState('');
    const [aisleInput, setAisle] = useState('');

    function submitIngredient() {
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
        }
    }

    function updateIngredient(ingredient) {
        setIngredient(ingredient);
    }

    function updateAisle(aisle) {
        setAisle(aisle);
    }

    return (
        <div>
            <div id='form-container'>
                <div id='form-input-container'>
                    <div id='input-div'>
                        <label id='input-label'>Ingredient</label>
                        <input id='ingredient-input' type='text' required
                            onChange={(event) => updateIngredient(event.target.value)}></input>
                    </div>
                    <div id='input-div'>
                        <label id='input-label'>Aisle</label>
                        <select id='aisle-select' type='text' required
                            onChange={(event) => updateAisle(event.target.value)}>
                            <option value=''></option>
                            <option value='Beverages'>Beverages</option>
                            <option value='Bread'>Bread</option>
                            <option value='Canned'>Canned</option>
                            <option value='Frozen'>Frozen</option>
                            <option value='International'>International</option>
                            <option value='Meat'>Meat</option>
                            <option value='Produce'>Produce</option>
                            <option value='Seafood'>Seafood</option>
                        </select>
                    </div>

                    <div class='container'>
                        <button id='add-ingredient-button' onClick={submitIngredient}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}