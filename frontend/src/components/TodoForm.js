export function TodoForm(props) {
  const { title, btnText, onSubmit, todoText, setTodoText } = props;
  const onTextChange = (e) => {
    setTodoText(e.target.value);
  }

  return (<>
    <fieldset>
      <legend>{title ?? "제목"}</legend>
      <input type="text" id="content" placeholder="할일을 입력하세요." value={todoText ?? ""} onChange={onTextChange} />
      <button onClick={onSubmit} className="btn">{btnText ?? "버튼"}</button>
    </fieldset>
  </>)


}