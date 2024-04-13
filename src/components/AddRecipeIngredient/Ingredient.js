export default function Ingredient({ ingredient }) {
  return (
    <>
      <p>
        {ingredient.ingredient.ingredientName}: {ingredient.quantity.amount} {ingredient.quantity.measurement},{" "}
        {ingredient.ingredient.aisle}
      </p>
    </>
  );
}
