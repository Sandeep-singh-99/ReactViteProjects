import React from "react"
import { useGetTodosQuery } from "./redux/slice/todo-slice"
function App() {
  const { data: todos, error, isLoading } = useGetTodosQuery() 

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {
          todos.map((todo) => (
            <li key={todo.id}>
              <strong>{todo.completed ? '✅': '❌'}</strong>
              {todo.title}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
