import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodoForm } from "./TodoForm";

export function EditTodo(props) {
  const {id} = useParams();
  const [todoText, setTodoText] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    /// 해당 ID로 content 값 가져오는 feetch
    if (id === undefined) {
      alert("잘못된 접근입니다.");
      navigate("/list");
      return;
    }
    fetch(`http://192.168.0.74:5000/get?id=${id}`)
    .then(res=> {
      // 해당 아이디 값에 존재하지 않는 요청
      if(res.status == 400){
        res.json().then(json => alert(json.error));
        return;
      }
      return res.json();
  })
    .then(json => setTodoText(json.content))
    .catch( err => console.log("get fetch error 발생!" + err));

  }, []);

  const onSubmit = async (e) => {
    /// 서버에 업데이트 요청 보내기
    try{
    const response = await fetch("http://192.168.0.74:5000/edit", {
      headers: { 'Content-Type': 'application/json' },
      method: "PUT",
      body: JSON.stringify({  'id': `${id}`, 'content': `${todoText}`})
    })
    const json = await response.json();
    
    if(response.status === 500 || response.status === 400){
    alert(json.error)
    return;
    }

    // 정상 작동
    if(response.status === 200){
    setTodoText(json.content);
    }

    }catch(error){
      alert("서버가 응답하지 않습니다.");
      console.log(error);
    }
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
