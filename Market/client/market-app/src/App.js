import {BrowserRouter, Routes, Route} from 'react-router-dom'
import GetProduct from './Page/GetProduct';
import UploadProduct from './Page/UploadProduct';
import ProductList from './Page/ProductList';

function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<GetProduct/>}/>
    <Route path='/upload' element={<UploadProduct/>}/>
    <Route path='/category-product' element={<ProductList/>}/>
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
