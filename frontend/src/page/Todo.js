import { Navigate, Outlet, useOutlet } from "react-router-dom";
import { Header } from "../components/Header";
import { TodoNav } from "../components/TodoNav";

export function Todo(props) {
  const hasOulet = useOutlet();

 if(!hasOulet) return <Navigate to={"/list"}/> 
  return <>
    <Header title="Todo 리스트" />
    <TodoNav />
    <Outlet />
  </>

}