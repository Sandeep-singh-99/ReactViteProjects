import Navbar from "./Components/Navbar";
import TaskProvider from "./Context/TaskProvider";


function App() {
  return (
    <>
    <TaskProvider>
      <Navbar />
    </TaskProvider>
    </>
  );
}

export default App;
