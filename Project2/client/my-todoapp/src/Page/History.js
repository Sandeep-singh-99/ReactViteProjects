import axios from 'axios'
import React, { useEffect, useState } from 'react'

function History() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/history")
    .then((res) => setHistory(res.data))
    .catch((err) => console.error(err))
  },[])
  return (
    <>
    <div className='bg-slate-950 h-fit pt-10'>
      <div className='flex flex-col  justify-center items-center'>
        <h1 className='text-white pb-10 text-4xl font-semibold'>History ToDo</h1>
        <div className='flex flex-col space-y-5'>
          {history.map(todo => (
            <li key={todo._id} className="bg-white px-5 py-5">
              <p className='text-black'>{todo.historys?.content || 'Data delete'}</p>
            </li>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default History