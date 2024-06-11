import React from 'react'

export default function ToDo() {
  return (
    <>
    <div className='flex justify-center items-center mt-10'>
        <div>
            <label className='font-semibold text-3xl'>Add Task</label>
        </div>
    </div>

    <div className='flex justify-center items-center mt-5'>
        <div className='mx-auto w-full max-w-[450px] rounded-md shadow-lg px-5 py-10 bg-gray-100'>
            <form>
                {/* Task Feild */}
                <div className='mb-5'>
                    <label className='block mb-3 text-base font-medium'>Task</label>
                    <input type='text' id='text' name='text' placeholder='Enter your task' className='w-full rounded-md shadow-lg border border-[#e0e0e0] px-3 py-3 outline-none text-base font-medium'/>
                </div>

                {/* Status Feild*/}
                <div className='mb-5'>
                    <label className='block mb-3 text-base font-medium'>Status</label>
                    <input type='text' id='text' name='text' placeholder='Enter your status' className='w-full rounded-md shadow-lg border border-[#e0e0e0] px-3 py-3 outline-none text-base font-medium'/>
                </div>

                {/* Deadline */}
                <div className='mb-5'>
                    <label className='block mb-3 text-base font-medium'>Deadline</label>
                    <input type='date' id='date' name='date' className='w-full rounded-md shadow-lg border border-[#e0e0e0] px-3 py-3 outline-none text-base font-medium'/>
                </div>

                <div>
                    <button className='bg-green-500 px-3 py-1 rounded-md text-white'>Add Task</button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}
