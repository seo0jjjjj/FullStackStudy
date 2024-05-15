import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodoForm } from "./TodoForm";
import { getTodoById, updateTodoById } from "../util/todo-service";

export function EditTodo(props) {
  const { id } = useParams();
  const [todoText, setTodoText] = useState("");
  let navigate = useNavigate();

  // 해당 컴포넌트를 생성할 때, 미리 입력될 내용을 가져와야함.
  useEffect(() => {
    /// 해당 ID로 content 값 가져오는 feetch
    if (id === undefined) {
      alert("잘못된 접근입니다.");
      navigate("/list");
      return;
    }

    getTodoById(id).then(([status, res]) => {
      if (status === "ok") {
        setTodoText(res.content);
      } else {
        alert(res.message);
        console.log(`데이터 가져오기 오류, ${status} 에러: ${res.error} 메세지 ${res.message} `)
      }
    });
  }, []);

  const onSubmit = async (e) => {
    updateTodoById(id, todoText)
  }



  return <TodoForm
    todoText={todoText}
    setTodoText={setTodoText}
    todoContent="default Todo"
    title="할일 수정하기"
    btnText="수정하기"
    onSubmit={onSubmit}
  />
}
