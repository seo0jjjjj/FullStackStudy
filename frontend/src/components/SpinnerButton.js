import { useState } from "react";
import { Spinner } from "./Spinner";

export function SpinnerButton({ title, onBtnClicked }) {
  const [isLoading, setIsLoading] = useState(false);
  const onSpinBtnClicked = (async (event) => {
    setIsLoading(true);
    const result = await onBtnClicked(event);
    console.log('btn ' + title + ' clicked')
    setIsLoading(false);
  });

  return (
    <button type="submit" onClick={onSpinBtnClicked} disabled={isLoading} style={btnStyle}>
      {isLoading ? <Spinner /> : <span>{title}</span>}
    </button>)
}


const btnStyle = {
  margin: '20px 0px',
  fontSize: '1em',
  width: '30rem',
  borderRadius: '12px',
}