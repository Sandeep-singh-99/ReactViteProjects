import React from 'react'

function AddBlog() {
  return (
    <>
    <div className='flex items-center justify-center mt-10'>
    <div className='m-10 rounded-md shadow-lg w-[50%] p-5 border-2 '>
        <h1 className='text-3xl mb-2 font-bold'>Add Blog</h1>
        <div className='h-1 bg-gradient-to-r w-[30%] from-indigo-700 to-purple-700 mb-3'></div>
        <form>

          <div className='mb-3'>
            <label className='font-semibold mb-2 block text-xl'>Title:</label>
            <input className='border rounded-md w-full py-2 px-3 outline-blue-600' placeholder='Enter your title'/>
          </div>

          <div className='mb-3'>
            <label className='font-semibold mb-2 block text-xl'>Description:</label>
            <input className='border rounded-md w-full py-2 px-3 outline-blue-600' placeholder='Enter your description'/>
          </div>

          <div className='mb-3'>
            <label className='font-semibold mb-2 block text-xl'>Image:</label>
            <input className='border rounded-md w-full py-2 px-3 outline-blue-600' type='file' placeholder='Enter your author'/>
          </div>

          <button className='w-full bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-2 rounded-md'>Add Blog</button>
        </form>
    </div>
    </div>
    </>
  )
}

export default AddBlog