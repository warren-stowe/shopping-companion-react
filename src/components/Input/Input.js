export default function Input({ field, handleChange, placeholder }) {
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => handleChange(field, e.target.value)}
      ></input>
    </>
  );
}
