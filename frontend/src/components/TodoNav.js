import { NavLink } from "react-router-dom";

export function TodoNav(props) {
  return (
    <ol className="todo-nav-container">
      <NavLink to="/add" className="nav-item">할일 추가</NavLink>
      <NavLink to="/list" className="nav-item">할일 보기</NavLink>
      {/* <NavLink to="/delete" className="nav-item">할일 삭제</NavLink> */}
      <NavLink to="/edit" className="nav-item">할일 수정</NavLink>
    </ol>);
}