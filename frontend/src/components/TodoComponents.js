import { NavLink, useNavigate, useParams } from "react-router-dom";
import '../style/todoStyle.css'
import { useEffect, useState } from "react";

export function TodoNav(props) {
  return (
    <ol className="todo-nav-container">
      <NavLink to="/add" className="nav-item">할일 추가</NavLink>
      <NavLink to="/list" className="nav-item">할일 보기</NavLink>
      {/* <NavLink to="/delete" className="nav-item">할일 삭제</NavLink> */}
      <NavLink to="/edit" className="nav-item">할일 수정</NavLink>
    </ol>);
}

export function Header(props) {
  const { title } = props;
  return (
    <div className="header">
      <h1>{title}</h1>
      <hr />
    </div>
  );
}

export function ShowTodo() {
  const [todoList, setTodoList] = useState();
  const [shouldReRedner, setShouldReRender] = useState(true);
  useEffect(() => {
    // 업데이트 해야되지 않을 경우, 
    if(!shouldReRedner) return;

    let list;
    fetch('http://localhost:5000/list')
      .then(res => res.json())
      .then(setTodoList);

      // 업데이트 완료
      setShouldReRender(false);
  }, [shouldReRedner])
  return (<>
    <div className="todo-list-container">
      {todoList?.map(element =>
        <TodoElement key={element._id} id={element._id} content={element.content} shouldUpdate={setShouldReRender} />)}
    </div>
  </>)
}


export function DeleteTodo(props) {
  return (<>
    <h1>delete todo</h1>
  </>)
}


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
    fetch(`http://localhost:5000/get?id=${id}`)
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
    const response = await fetch("http://localhost:5000/edit", {
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


export function CreateTodo(props) {
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

function TodoForm(props) {
  const { title, btnText, onSubmit, todoText, setTodoText } = props;
  const onTextChange = (e) => {
    setTodoText(e.target.value);
  }

  return (<>
    <fieldset>
      <legend>{title ?? "제목"}</legend>
      <input type="text" id="content" placeholder="할일을 입력하세요." value={todoText ?? ""} onChange={onTextChange} />
      <button onClick={onSubmit} className="btn">{btnText ?? "버튼"}</button>
    </fieldset>
  </>)


}

function TodoElement({ id, content, shouldUpdate}) {
  let navigate = useNavigate();

  const onEditBtnClicked = (e) => {
    navigate(`/edit/${id}`)
  }

  const onDeleteBtnClicked = async (e) => {
    const isDelete = window.confirm(`"${content}"를 삭제하시겠습니까?`);
    // 삭제 취소
    if(!isDelete) return;

    try{
    // 삭제 진행
    const response = await fetch(`http://localhost:5000/delete?id=${id}`, {      
      method: "DELETE"
    })

    const json = await response.json();
    // 삭제 성공
    if(response.status === 200){
      alert("삭제가 완료되었습니다!");
      shouldUpdate(true);
      return;
    }

    if(response.status === 400){
      alert(json.error);
    }
  }catch(error){
    alert("서버가 응답하지 않습니다.");
    console.log("delete fetch error" + error);
  }
  }


  return (<div key={id} className="todo-list-item">
    <div className="content">
      {content}
    </div>
    <div className="icon-container">
      <i className='bx bx-message-square-edit' onClick={onEditBtnClicked} />
      <i className='bx bx-message-square-x' onClick={onDeleteBtnClicked}/>
    </div>
  </div>)
}