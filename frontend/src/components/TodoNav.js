import { NavLink } from "react-router-dom";

export function TodoNav(props) {
  return (
    <ol className="todo-nav-container">
      <NavLink to="/add" className="nav-item">할일 추가</NavLink>
      <NavLink to="/list" className="nav-item">할일 보기</NavLink>
      <NavLink to="/sign-in" className="nav-item">로그인 </NavLink>
      <NavLink to="/sign-up" className="nav-item">회원가입</NavLink>
    </ol>);
}