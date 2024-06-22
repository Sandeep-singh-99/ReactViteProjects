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

  const handleAddDoctor = (e) => {
    e.preventDefault()
    axios.post("http://localhost:5000/doctors/add", newDoctor)
    .then(response => {
      console.log("doc", response.data);
      setDoctors([
        ...doctors,
        response.data
      ]);
      setNewDoctor(
        {
          name: '',
          specialty: ''
        }
      )
    })
    .catch(err => console.error('Error adding doctors:', err))
  }

  const handleUpdateDoctor = (id, e) => {
    e.preventDefault()
    axios.put(`http://localhost:5000/doctors/update/${id}`, selectedDoctor)
    .then(response => {
      const updateDoc = {
        ...selectedDoctor,
        _id: id,
      }

      console.log('Update Doc: ', updateDoc);

      setDoctors(
        doctors.map(
          doctor => (doctor._id === id ? updateDoc : doctor)
        )
      )

      setSelectedDoctor(null)
      setIsEditMode(false)
    })
    .catch(err => console.error('Error updating doctor: ', err))
  }

  const handleDeleteDoctor = (id) => {
    axios.delete(`http://localhost:5000/doctors/delete/${id}`)
    .then(response => {
      console.log(response.data);
      setDoctors(
        doctors.filter(doctor => doctor._id !== id)
      )
    })
    .catch(err => console.error('Error deleting doctor: ', err))
  }

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor)
    setIsEditMode(true)
  }

  return (
    <div className='flex m-5 justify-between'>
      <div>
        <h4 className='px-20 mb-10 font-semibold'>
          {
            isEditMode ? 'Edit Doctor' : 'Add New Doctor'
          }
        </h4>
        <div className='bg-white rounded-lg shadow-lg p-5 w-[400px]'>
          <form onSubmit={
            isEditMode ? (e) => handleUpdateDoctor(selectedDoctor._id, e) : handleAddDoctor
          }>

            {/* Name */}
            <label className='block mb-2'>Name:</label>
            <input className='border-2 outline-none w-full rounded-md px-2 py-1 mb-5'
            value={
              isEditMode ? selectedDoctor.name : newDoctor.name 
            }

            onChange={
              (e) => isEditMode ?
              setSelectedDoctor(
                {
                  ...selectedDoctor,
                  name: e.target.value
                }
              ) : setNewDoctor({
                ...newDoctor,
                name: e.target.value
              })
            }
            />

            {/* Specialty */}
            <label className='block mb-2'>Specialty:</label>
            <input className='border-2 outline-none w-full rounded-md px-2 py-1 mb-5'
            value={
              isEditMode ? selectedDoctor.specialty : newDoctor.specialty
            }

            onChange={
              (e) => isEditMode ? setSelectedDoctor(
                {
                  ...selectedDoctor,
                  specialty: e.target.value
                }
              ) : 
              setNewDoctor({
                ...newDoctor,
                specialty: e.target.value
              })
            }
            />

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
          {doctors.map(doctor => (
            <DoctorCard
            key={doctor._id}
            doctor={doctor}
            onEdit={handleEditDoctor}
            onDelete={handleDeleteDoctor}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
