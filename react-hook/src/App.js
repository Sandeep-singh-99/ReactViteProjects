import React, { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  console.log(count);

  return (
    <div className='flex justify-center items-center flex-col h-screen bg-slate-950'>
      <p className='text-white text-2xl mb-5'>You Clicked {count} times</p>
      <button className='bg-green-500 px-10 py-3 rounded-md text-white' onClick={(() => setCount(count + 1))}>Click Me</button>
    </div>
  );
}

export default App;
