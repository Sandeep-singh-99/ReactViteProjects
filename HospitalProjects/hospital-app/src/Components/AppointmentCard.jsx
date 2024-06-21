import React from 'react'

export default function AppointmentCard({appointment, onEdit, onDelete}) {
  return (
    <div>
        <div>
            <p>
                <span>
                    Patient:
                </span>
                {appointment.patientName}
            </p>

            <p>
                <span>
                    Doctor:
                </span>
                {appointment.doctorName}
            </p>

            <p>
                <span>
                    Date:
                </span>
                {new Date(appointment.date).toLocaleDateString()}
            </p>

            <div>
                <button>
                    <button onClick={() => onEdit(appointment)}>Edit</button>
                </button>

                <button onClick={() => onDelete(appointment._id)}>
                    Delete
                </button>
            </div>
        </div>
    </div>
  )
}
