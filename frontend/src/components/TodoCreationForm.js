import { useState } from "react";
import { TodoForm } from "./TodoForm";
import { createTodo } from "../util/todo-service";

/**
 * Todo를 추가하는 페이지 
 */
export function TodoCreationForm(props) {
  const [todoText, setTodoText] = useState();

  // Todo 추가하기 버튼 이벤트
  const onSubmit = async (e) => {
    const [_, res] = await createTodo(todoText);
    alert(res.message);
  }

  return <TodoForm
    todoText={todoText}
    setTodoText={setTodoText}
    title="할일 추가하기"
    btnText="추가하기"
    onSubmit={onSubmit}
  />

}