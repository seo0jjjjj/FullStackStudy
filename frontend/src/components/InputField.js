const { memo, useState } = require("react");

export const InputField = memo(({ type, label, value, onChange }) => {
  const [inputType, setInputType] = useState(type ?? 'text');
  const onFieldHiddenBtnClicked = (event) => {
    const isPassword = inputType === 'password';
    const addClass = isPassword ? 'bx-low-vision' : 'bx-show-alt';
    const removeClass = isPassword ? 'bx-show-alt' : 'bx-low-vision';

    event.target.classList.add(addClass);
    event.target.classList.remove(removeClass);

    setInputType(isPassword ? 'text' : 'password');

  }


  return (
    <div>
      <label>{label}</label>
      <div className="input-field">
        <input type={inputType} value={value} onChange={onChange} id={label} className="input-field" />
        {type === "password" && <i class='bx bx-show-alt input-icon' onClick={onFieldHiddenBtnClicked}></i>}
      </div>
    </div>
  );
});
