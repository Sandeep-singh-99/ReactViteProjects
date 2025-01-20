import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <Header />
      <div className="mx-10 py-10">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
