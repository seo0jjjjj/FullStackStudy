import { useEffect, useState } from "react";
import { TodoListItem } from "./TodoListItem";
import { getTodoList } from "../util/todo-service";

/**
 * TODO 전체를 보여주는 메인 화면
 * @returns 
 */
export function TodoView() {
  const [todoList, setTodoList] = useState();
  const [shouldReRedner, setShouldReRender] = useState(true);
  useEffect(() => {
    // 업데이트 해야되지 않을 경우, 
    if (!shouldReRedner) return;

    getTodoList().then(([status, res]) => {
      if (status === "ok") {
        setTodoList(res);
      }
      else {
        alert(`${res?.message}`);
      }
    });


    // 업데이트 완료
    setShouldReRender(false);
  }, [shouldReRedner])
  return (<>
    <div className="todo-list-container">
      {todoList?.map(element =>
        <TodoListItem key={element._id} id={element._id} content={element.content} shouldUpdate={setShouldReRender} />)}
      {todoList?.length === 0 && <h3>할 일이 없어요.</h3>}
    </div>
  </>)
}
