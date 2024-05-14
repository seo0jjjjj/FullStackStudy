const { memo } = require("react");

export const InputField = memo(({ type, label, value, onChange }) => {
  console.log(`Rendering ${label}`);
  return (
    <div>
      <label>{label}</label>
      <input type={type ?? 'text'} value={value} onChange={onChange} />
    </div>
  );
});
