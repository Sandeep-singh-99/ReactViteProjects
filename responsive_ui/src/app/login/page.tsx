import React from 'react'
import Image from 'next/image'

function Login() {
  return (
    <div className='mt-10 sm:mt-6 items-top min-h-screen sm:items-center flex justify-center '>
        <div className='max-w-6xl mx-auto sm:px-6'>
            <div className='grid grid-col-1 items-center md:grid-cols-2 gap-4'>
                <div>
                    <Image src="/profile/img.png" alt="img" width={400} height={400}/>
                </div>

                <form className='flex flex-col justify-center rounded-md shadow bg-gray-400 sm:px-4 p-4'>
                    <div className='mb-3'>
                        <label className='block text-black font-semibold'>Name</label>
                        <input className='px-3 py-2 text-gray-600 outline-blue-700 border-0 rounded-md w-full'/>
                    </div>

                    <div className='mb-3'>
                        <label className='block text-black font-semibold'>Email</label>
                        <input className='px-3 py-2 text-gray-600 outline-blue-700 border-0 rounded-md w-full'/>
                    </div>

                    <div className='mb-3'>
                        <label className='block text-black font-semibold'>password</label>
                        <input className='px-3 py-2 text-gray-600 outline-blue-700 border-0 rounded-md w-full'/>
                    </div>

                    <button className='bg-purple-600 py-1 text-xl font-semibold rounded-md'>Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login