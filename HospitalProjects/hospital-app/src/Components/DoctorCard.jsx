import React from 'react'

export default function DoctorCard({doctor, onEdit, onDelete}) {
  return (
    <div className='bg-white rounded-md shadow-md'>
      <div className='mt-10 w-[300px] p-5'>
        <p className='text-blue-500 items-center justify-center flex'>
          {doctor.name} - 
          {doctor.specialty}
        </p>
        <div className='flex justify-between mt-5'>
          <button className='px-2 rounded-md bg-blue-400 text-white py-1' onClick={() => onEdit(doctor)}>Edit</button>
          <button className='px-2 rounded-md bg-blue-400 text-white py-1' onClick={() => onDelete(doctor._id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}
