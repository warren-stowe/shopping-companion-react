import { useState } from "react";
import "./SearchRecipes.css";

export default function SearchRecipes() {
  const [search, setSearch] = useState("");
  const [foundRecipes, setFoundRecipes] = useState([]);

  const dummyRecipes = [
    {
      id: 1,
      name: "Tacos",
    },
    {
      id: 2,
      name: "Hamburgers",
    },
    {
      id: 3,
      name: "Hotdogs",
    },
  ];

  function handleChange(input) {
    setSearch(input);

    let recipes = dummyRecipes.filter((recipe) =>
      recipe.name.startsWith(input)
    );

    if (recipes.length > 0) {
      setFoundRecipes(recipes);
    }

    console.log(foundRecipes);
  }

  return (
    <>
      <div className="search-container">
        <span>🔎</span>
        <input
          type="text"
          onChange={(event) => handleChange(event.target.value)}
          value={search}
        ></input>
      </div>
      <div className="results-container">
        {/* {foundRecipes.length > 0 && */}
        {/* foundRecipes.map((recipe) => <p key={recipe.id}>{recipe}</p>)} */}
      </div>
    </>
  );
}
