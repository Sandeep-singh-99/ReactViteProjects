import React from 'react'

export default function DoctorCard({doctor, onEdit, onDelete}) {
  return (
    <div>
      <div>
        <p>
          {doctor.name} - 
          {doctor.specialty}
        </p>
        <div>
          <button onClick={() => onEdit(doctor)}>Edit</button>
          <button onClick={() => onDelete(doctor._id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}
