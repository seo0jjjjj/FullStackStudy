import { Navigate, Outlet, useOutlet } from "react-router-dom";
import { Header } from "../components/Header";
import { TodoNav } from "../components/TodoNav";
import '../style/todoStyle.css'

export function Todo(props) {
  const hasOulet = useOutlet();

 if(!hasOulet) return <Navigate to={"/list"}/> 
  return <div className="todo-container">
    <Header title="Todo 리스트" />
    <TodoNav />
    <Outlet />
    </div>

}