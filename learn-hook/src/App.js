import React, {useState} from 'react'

function App({initialCount}) {
  // const [count, setCount] = useState(0)
  // const [name, setName] = useState('Sandeep Singh')
  // const [age, setAge] = useState(25)

  const [count, setCount] = useState(() => initialCount)
  return (
    // <div className='flex justify-center items-center h-screen'>
    //   <p className='mr-5'>You clicked {count} times</p>
    //   <button className='bg-black text-white px-3 py-1 rounded-lg' onClick={() => setCount(count + 1)}>Click me</button>
    // // </div>
    // <div className='place-items-center grid'>
    //   <p>Name: {name}</p>
    //   <p>Age: {age}</p>
    //   <button onClick={() => setName('Akash Yadav')}>Change Name</button>
    //   <button onClick={() => setAge(age + 1)}>Increase Age</button>
    // </div>

    <>
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>click me</button>
    </div>
    </>
  );
}

export default App;
