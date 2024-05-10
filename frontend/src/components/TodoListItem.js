import { useNavigate } from "react-router-dom";

export function TodoListItem({ id, content, shouldUpdate}) {
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
    const response = await fetch(`http://192.168.0.74:5000/delete?id=${id}`, {      
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