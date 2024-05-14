const { memo } = require("react");

export const InputField = memo(({ label, value, onChange }) => {
  console.log(`Rendering ${label}`);
  return (
    <div>
      <label>{label}</label>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
});
