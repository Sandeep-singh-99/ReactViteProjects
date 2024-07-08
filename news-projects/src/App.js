import React from 'react'
import './App.css';
import TranslateBox from './Components/TranslateBox';

function App() {
  return (
  <div className='bg-slate-950 h-screen'>
     <div className='flex flex-col justify-center items-center pt-10'>
    <h1 className='text-[40px] mb-10 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500'>Google Translate</h1>
    <TranslateBox/>
   </div>
  </div>
  );
}

export default App;
