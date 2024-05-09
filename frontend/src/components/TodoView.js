import { useEffect, useState } from "react";
import { TodoListItem } from "./TodoListItem";

export function TodoView() {
  const [todoList, setTodoList] = useState();
  const [shouldReRedner, setShouldReRender] = useState(true);
  useEffect(() => {
    // 업데이트 해야되지 않을 경우, 
    if(!shouldReRedner) return;

    let list;
    fetch('http://localhost:5000/list')
      .then(res => res.json())
      .then(setTodoList)
      .catch(err => {
        alert("데이터베이스에 연결할 수 없습니다.");
        setTodoList(null);
      })

      // 업데이트 완료
      setShouldReRender(false);
  }, [shouldReRedner])
  return (<>
    <div className="todo-list-container">
      {todoList?.map(element =>
        <TodoListItem key={element._id} id={element._id} content={element.content} shouldUpdate={setShouldReRender} />)}
    </div>
  </>)
}