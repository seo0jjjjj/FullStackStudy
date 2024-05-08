import { NavLink } from "react-router-dom";
import '../style/todoStyle.css'
import { useEffect, useState } from "react";

export function TodoNav(props) {
  return (
    <ol className="todo-nav-container">
      <NavLink to="/add" className="nav-item">할일 추가</NavLink>
      <NavLink to="/list" className="nav-item">할일 보기</NavLink>
      <NavLink to="/delete" className="nav-item">할일 삭제</NavLink>
      <NavLink to="/edit" className="nav-item">할일 수정</NavLink>
    </ol>);
}

export function Header(props) {
  const { title } = props;
  return (
    <div className="header">
      <h1>{title}</h1>
      <hr />
    </div>
  );
}

export function ShowTodo() {
  const [todoList, setTodoList] = useState();
  useEffect(() => {
    let list;
    fetch('http://localhost:5000/list').then(res => res.json()).then(setTodoList);

  }, [])
  return (<>
    <div className="todo-list-container">
      {todoList?.map(elements => <div>
        {elements?.content}

      </div>)}
    </div>
  </>)
}


export function DeleteTodo(props) {
  return (<>
    <h1>delete todo</h1>
  </>)
}


export function EditTodo(props) {
  const onSubmit = (e) => {
    alert("수정하기 버튼 클릭");
  }

  return <TodoForm
    todoContent="default Todo"
    title="할일 수정하기"
    btnText="수정하기"
    onSubmit={onSubmit}
  />
}


export function CreateTodo(props) {
  const [todoText, setTodoText] = useState();
  const onSubmit = async (e) => {
    try {
      const response = await fetch("http://localhost:5000/add", {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",
        body: JSON.stringify({ content: todoText })
      })

      // 입력 오류: null인 content를 넘겼을 떄,
      if (!response.ok) {
        const errorMsg = await response.json();
        alert(errorMsg.error ?? "값이 잘못되었습니다.");
        setTodoText("");
        return;
      }
    } catch (err) {
      alert("서버가 응답하지 않습니다.");
      console.error("fetch 에러 발생" + err);
      return;
    };
    alert("값이 저장되었습니다.");

  }

  return <TodoForm
    todoText={todoText}
    setTodoText={setTodoText}
    title="할일 추가하기"
    btnText="추가하기"
    onSubmit={onSubmit}
  />

}

function TodoForm(props) {
  const { title, btnText, onSubmit, todoContent, todoText, setTodoText } = props;
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