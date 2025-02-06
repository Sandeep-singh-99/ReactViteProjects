import React from 'react'

function CardLayout() {
  return (
    <div className='flex flex-wrap justify-center gap-6 p-4'>
        <div className='flex w-48 h-32 rounded-md text-black dark:text-red-700 bg-blue-100 items-center justify-center'>
            1
        </div>

        <div className='flex w-48 h-32 rounded-md text-black dark:text-red-700 bg-blue-100 items-center justify-center'>
            2
        </div>

        <div className='flex w-48 h-32 rounded-md text-black dark:text-red-700 bg-blue-100 items-center justify-center'>
            3
        </div>

        <div className='flex w-48 h-32 rounded-md text-black dark:text-red-700 bg-blue-100 items-center justify-center'>
            4
        </div>

        <div className='flex w-48 h-32 rounded-md text-black dark:text-red-700 bg-blue-100 items-center justify-center'>
            5
        </div>

        <div className='flex w-48 h-32 rounded-md text-black dark:text-red-700 bg-blue-100 items-center justify-center'>
            6
        </div>
    </div>
  )
}

export default CardLayout