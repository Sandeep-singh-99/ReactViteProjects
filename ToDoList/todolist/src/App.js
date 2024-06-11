import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ToDo from './Components/AddToDo';

function App() {
  return (
    <div>
      <h1 className="flex justify-center items-center mt-10 font-bold text-4xl">
        ToDoList App
      </h1>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ToDo/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
