export default function Ingredient({ ingredient }) {
  return (
    <>
      <p>Ingredient: {ingredient.name}</p>
      <p>Aisle: {ingredient.aisle}</p>
      <p>Measurement: {ingredient.measurement}</p>
      <p>Amount: {ingredient.amount}</p>
    </>
  );
}
