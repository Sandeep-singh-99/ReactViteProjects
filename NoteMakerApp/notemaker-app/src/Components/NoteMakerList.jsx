import React from 'react'

export default function NoteMakerList() {
  return (
    <div className='bg-white rounded-lg shadow-xl relative m-10 border-4'>
        <div className='p-4'>
            <div className='pt-5'>
                <h1 className='text-3xl font-bold'>Notes App</h1>
            </div>
            <div className='mt-5'>
              <form>
                <h2 className='font-semibold text-2xl'>Add Note</h2>
                <div className='mt-5'>
                  <input className='border-2 w-full rounded-md outline-none px-2 py-2'/>
                </div>
                <div className='mt-5'>
                  <textarea className='border-2 w-full px-3 py-4 outline-none rounded-md' rows={5} cols={30}>
                  </textarea>
                </div>

                <div className='mt-5'>
                  <button className='bg-green-500 w-full py-2 text-white rounded-md'>
                    Add Note
                  </button>
                </div>
              </form>
            </div>

            <div className='mt-10'>
              <div className='bg-gray-300 rounded-lg'>
                <div className='p-2 pb-5'>
                  <label className='text-xl font-semibold mb-5 text-[#3f3f3f]'>MERN Stack</label>
                  <p className='text-[#7f7f7f]'>Important topics of React</p>
                  <div className='flex gap-4 mt-5'>
                    <button className='w-full bg-green-500 text-white py-2 rounded-md'>Edit</button>
                    <button className='w-full bg-green-500 text-white py-2 rounded-md'>Delete</button>
                  </div>
                </div>
              </div>
            </div>

           
        </div>
    </div>
  )
}
