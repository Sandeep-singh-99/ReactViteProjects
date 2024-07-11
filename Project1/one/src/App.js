import { BrowserRouter, Routes, Route} from "react-router-dom";
import './styles/App.scss'
import './styles/Header.scss'
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
