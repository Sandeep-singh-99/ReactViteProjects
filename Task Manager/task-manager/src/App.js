import Filterbar from "./Components/Filterbar";
import Navbar from "./Components/Navbar";
import TaskList from "./Components/TaskList";
import TaskProvider from "./Context/TaskProvider";


function App() {
  return (
    <>
    <TaskProvider>
      <Navbar />
      <Filterbar/>
      <TaskList/>
    </TaskProvider>
    </>
  );
}

export default App;
