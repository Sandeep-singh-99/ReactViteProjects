import React from 'react'

export default function PatientCard({patient, onEdit, onDelete}) {
  return (
    <div className='bg-white rounded-md shadow-md'>
        <div className='mt-10 w-[300px] p-5'>
            <p className=''>
                Name: {patient.name}
            </p>
            <p>
                Age: {patient.age}
            </p>
            <p>
                Gender: {patient.gender}
            </p>

            <div className='flex justify-between mt-5'>
                <button className='bg-blue-400 text-white px-2 py-1 rounded-md'>Edit</button>
                <button className='bg-blue-400 text-white px-2 py-1 rounded-md'>Delete</button>
            </div>
        </div>
    </div>
  )
}
