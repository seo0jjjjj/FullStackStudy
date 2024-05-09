import { Navigate, Outlet, useOutlet } from "react-router-dom";
import { Header, TodoNav } from "../components/TodoComponents";

export function Todo(props) {
  const hasOulet = useOutlet();

 if(!hasOulet) return <Navigate to={"/list"}/> 
  return <>
    <Header title="Todo 리스트" />
    <TodoNav />
    <Outlet />
  </>

}