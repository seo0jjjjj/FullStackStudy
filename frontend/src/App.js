import { Route, Routes } from "react-router-dom";
import { Todo } from "./page/Todo";
import { CreateTodo, DeleteTodo, EditTodo, ShowTodo } from "./components/TodoComponents";

function App() {
  return (
    <Routes>
      <Route path ="/" element={<Todo/>}>
        <Route path="add" element={<CreateTodo/>}  />
        <Route path="list" element={<ShowTodo/>} />
        <Route path="delete" element={<DeleteTodo/>} />
        <Route path="edit/:id" element={<EditTodo/>} />
        <Route path="edit" element={<EditTodo id={3}/>} />
      
      </Route>
    </Routes>
  );
}

export default App;
