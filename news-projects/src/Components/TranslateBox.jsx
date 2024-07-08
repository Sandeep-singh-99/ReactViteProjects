import React from 'react'

function TranslateBox() {
  return (
    <div>
       <div className='border-2 w-[750px] h-[350px] shadow-lg rounded-md shadow-green-800/30'>
        <div className='p-10'>
            <div className='mb-5'>
                <input className='border-2 w-full px-3 py-2 outline-none rounded text-gray-500' placeholder='Enter the content '/>
            </div>
            <button className='bg-gradient-to-r from-blue-600 to-purple-500 px-10 py-1 text-white rounded-md'>Submit</button>
            <div className='w-full px-5 py-3 rounded-md bg-white mt-10'>
                <p className='text-gray-500'>Sandeep...</p>
            </div>
        </div>
       </div>
    </div>
  )
}

export default TranslateBox