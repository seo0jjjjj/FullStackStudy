import { useState } from "react";
import { TodoForm } from "./TodoForm";

export function TodoCreationForm(props) {
  const [todoText, setTodoText] = useState();
  const onSubmit = async (e) => {
    try {
      const response = await fetch("http://localhost:5000/add", {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",
        body: JSON.stringify({ content: todoText })
      })

      // 입력 오류: null인 content를 넘겼을 떄,
      if (!response.ok) {
        const errorMsg = await response.json();
        alert(errorMsg.error ?? "값이 잘못되었습니다.");
        setTodoText("");
        return;
      }
    } catch (err) {
      alert("서버가 응답하지 않습니다.");
      console.error("fetch 에러 발생" + err);
      return;
    };
    alert("값이 저장되었습니다.");

  }

  return <TodoForm
    todoText={todoText}
    setTodoText={setTodoText}
    title="할일 추가하기"
    btnText="추가하기"
    onSubmit={onSubmit}
  />

}