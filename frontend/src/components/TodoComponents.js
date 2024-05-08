import { NavLink } from "react-router-dom";
import '../style/todoStyle.css'
import 'boxicons'

export function TodoNav(props){
  return(
    <ol className="todo-nav-container">
    <NavLink to= "/add" className="nav-item">할일 추가</NavLink>
    <NavLink to= "/list" className="nav-item">할일 보기</NavLink>
    <NavLink to= "/delete" className="nav-item">할일 삭제</NavLink>
    <NavLink to= "/edit" className="nav-item">할일 수정</NavLink>
  </ol>);
}

export function Header(props){
  const {title} = props;
  return (
  <div className="header">
     <h1>{title}</h1>
      <hr/>
  </div>
  );
}

export function ShowTodo(){
  const content = "내용";

    return (<>
    <div className="todo-list-container">
      <div className="todo-list-item-container">
        <h4>{content ?? "내용이 없습니다"}</h4>
        <i class="bx bx-hot"></i>
        <i class="bx bx-hot"></i>
        <i class="bx bx-hot"></i>
      </div>
    </div>
    </>) 
}


export function DeleteTodo(props){
  return (<>
      <h1>delete todo</h1>
  </>) 
}


export function EditTodo(props){
  const onSubmit = (e) =>{
    alert("수정하기 버튼 클릭");
  }

  return <TodoForm 
  todoContent = "default Todo"
    title="할일 수정하기"
    btnText="수정하기"
    onSubmit={onSubmit}
  />
}


export function CreateTodo(props){
  const onSubmit = (e) =>{
    alert("추가하기 버튼 클릭");
  }

  return <TodoForm 
    title="할일 추가하기"
    btnText="추가하기"
    onSubmit={onSubmit}
  />

}

function TodoForm(props){
  const {title, btnText, onSubmit, todoContent} = props;

  return(<>
    <fieldset>
      <legend>{title ?? "제목"}</legend>
      <input type="text" id="content" placeholder="할일을 입력하세요." value={todoContent ?? ""}/>
      <button onClick={onSubmit} className="btn">{btnText ?? "버튼"}</button>
    </fieldset>
  </>)
}