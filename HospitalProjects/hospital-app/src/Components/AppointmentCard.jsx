import React from 'react'

export default function AppointmentCard({appointment, onEdit, onDelete}) {
  return (
    <div className='bg-white rounded-md shadow-md'>
        <div className='mt-10 w-[300px] p-5'>
            <p className='text-blue-500'>
                <span className='mr-2 text-black'>
                    Patient: 
                </span>
                {appointment.patientName}
            </p>

            <p className='text-blue-500'>
                <span className='mr-2 text-black'>
                    Doctor:
                </span>
                {appointment.doctorName}
            </p>

            <p className='text-blue-500'>
                <span className='mr-2 text-black'>
                    Date: 
                </span>
                {new Date(appointment.date).toLocaleDateString()}
            </p>

            <div className='flex justify-between mt-5'>
                <button className='bg-blue-400 text-white px-2 rounded-md' onClick={() => onEdit(appointment)}>Edit</button>

                <button className='bg-blue-400 text-white px-2 rounded-md' onClick={() => onDelete(appointment._id)}>
                    Delete
                </button>
            </div>
        </div>
    </div>
  )
}
