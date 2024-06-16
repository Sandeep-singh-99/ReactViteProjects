import React from 'react'
import { useTaskContext } from '../Context/TaskProvider'

export default function Filterbar() {
    const {handleFilterClick} = useTaskContext()

  return (
    <div className='flex justify-center gap-3 mt-8'>
        <button className='bg-blue-500 filter hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md' onClick={() => handleFilterClick('all')}>All</button>
        <button className='filter bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md' onClick={() => handleFilterClick('completed')}>Completed</button>
        <button className='filter bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md'>To Do</button>
    </div>
  )
}
