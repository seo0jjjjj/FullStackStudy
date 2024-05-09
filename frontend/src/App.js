import { Route, Routes } from "react-router-dom";
import { Todo } from "./page/Todo";
import { TodoCreationForm } from "./components/TodoCreationForm";
import { TodoView } from "./components/TodoView";
import { EditTodo } from "./components/EditTodo";

function App() {
  return (
    <Routes>
      <Route path ="/" element={<Todo/>}>
        <Route path="add" element={<TodoCreationForm/>}  />
        <Route path="list" element={<TodoView/>} />
        <Route path="edit/:id" element={<EditTodo/>} />
        <Route path="edit" element={<EditTodo/>} />
      </Route>
    </Routes>
  );
}

export default App;
