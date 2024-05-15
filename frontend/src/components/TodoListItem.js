import { useNavigate } from "react-router-dom";
import { deleteTodoById } from "../util/todo-service";

/**
 * TODO 리스트 각각 요소로 
 * 삭제 및 생성 관리.
 */
export function TodoListItem({ id, content, shouldUpdate }) {
  let navigate = useNavigate();

  // Todo 수정 이벤트
  const onEditBtnClicked = (e) => {
    navigate(`/edit/${id}`)
  }

  // Todo 삭제 이벤트
  const onDeleteBtnClicked = async (e) => {
    const isDelete = window.confirm(`"${content}"를 삭제하시겠습니까?`);
    // 삭제 취소
    if (!isDelete) return;

    const [status, data] = await deleteTodoById(id);
    alert(data?.message); // 어차피 성공도 message로 반환해서 메세지만 보여주면됨.
    shouldUpdate(true); // 리스트 새로고침
  }


  return (<div key={id} className="todo-list-item">
    <div className="content">
      {content}
    </div>
    <div className="icon-container">
      <i className='bx bx-message-square-edit' onClick={onEditBtnClicked} />
      <i className='bx bx-message-square-x' onClick={onDeleteBtnClicked} />
    </div>
  </div>)
}