import { Route, Routes } from "react-router-dom";
import { Todo } from "./page/Todo";
import { TodoCreationForm } from "./components/TodoCreationForm";
import { TodoView } from "./components/TodoView";
import { EditTodo } from "./components/EditTodo";
import {SignIn} from "./page/SignIn";
import {SignUp} from "./page/SignUp";

function App() {
  return (
    <Routes>
      <Route path ="/" element={<Todo/>}>
        <Route path="add" element={<TodoCreationForm/>}  />
        <Route path="list" element={<TodoView/>} />
        <Route path="edit/:id" element={<EditTodo/>} />
        <Route path="edit" element={<EditTodo/>} />
      </Route>
        <Route path="sign-in" element={<SignIn/>} />
        <Route path="sign-up" element={<SignUp/>} />
    </Routes>
  );
}

export default App;
