import react from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Page/Home'
import Cart from './Page/Cart'
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store'


function App() {
  return (
    <div className='App'>
      <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={ <Cart/>}/>
      </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
