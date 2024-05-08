import { Outlet } from "react-router-dom";
import { Header, TodoNav } from "../components/TodoComponents";

export function Todo(props) {


  return <>
    <Header title="Todo 리스트" />
    <TodoNav />
    <Outlet />
  </>

}