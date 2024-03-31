export default function Ingredient({ ingredient }) {
  return (
    <>
      <p>
        {ingredient.name}: {ingredient.amount} {ingredient.measurement},{" "}
        {ingredient.aisle}
      </p>
    </>
  );
}
