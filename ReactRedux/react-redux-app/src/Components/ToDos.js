import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeToDos } from "../Features/ToDo/ToDoSlice";

function ToDos() {
  const todos = useSelector((state) => state.todos);

  const dispatch = useDispatch()
  return (
    <div>
        <div>ToDos</div>
        {todos.map((todo) => (
            <li key={todo.id}>{todo.text}
             <button onClick={() => dispatch(removeToDos(todo.id))}>x</button>
            </li>
        ))}
    </div>
  )
}

export default ToDos;
