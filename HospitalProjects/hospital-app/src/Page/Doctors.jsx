import React, { useEffect, useState } from 'react'
import DoctorCard from '../Components/DoctorCard';
import axios from 'axios';

export default function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty:'',
  });

  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect( () => {
    axios.get('http://localhost:5000/doctors')
    .then(response => setDoctors(response.data))
    .catch(err => console.error('Error fetching doctors:', err))
  }, [])

  

  return (
    <div className='flex m-5 justify-between'>
      <div>
        <h4 className='px-20 mb-10 font-semibold'>
          {
            isEditMode ? 'Edit Doctor' : 'Add New Doctor'
          }
        </h4>
        <div className='bg-white rounded-lg shadow-lg p-5 w-[400px]'>
          <form>

            {/* Name */}
            <label className='block mb-2'>Name:</label>
            <input className='border-2 outline-none w-full rounded-md px-2 py-1 mb-5'/>

            {/* Specialty */}
            <label className='block mb-2'>Specialty:</label>
            <input className='border-2 outline-none w-full rounded-md px-2 py-1 mb-5'/>

            <div>
              <button type='submit' className='text-white bg-blue-400 py-1 px-2 rounded-md'>
                {
                  isEditMode ? 'Update Doctor' : 'Add Doctor'
                }
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className='pr-20'>
        <h3 className='pl-20'>
          Doctor ({doctors.length})
        </h3>
        <div>
          {doctors.map(doctor => {
            <DoctorCard
            key={doctor._id}
            doctor={doctor}
            onEdit={handleEditDoctor}
            onDelete={handleDeleteDoctor}
            />
          })}
        </div>
      </div>
    </div>
  )
}
