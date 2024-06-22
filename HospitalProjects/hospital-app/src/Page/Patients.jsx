import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PatientCard from '../Components/PatientCard'

export default function Patients() {
  const [patients, setPatients] = useState([])
  const [newPatients, setNewPatients] = useState({
    name: '',
    age: '',
    gender: '' 
  })
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:5000/patients')
    .then(response => setPatients(response.data))
    .catch(err => console.error('Error fetching patients: ', err))
  },[])

  const handleAddPatient = (e) => {
    e.preventDefault()

    axios.post('http://localhost:5000/patients/add', newPatients)
    .then(response => {
      console.log(response.data);
      setPatients([...patients, response.data])
      setNewPatients({
        name: '',
        age:'',
        gender:''
      })
    }).catch(err => console.error('Error adding patient:', err))
  }

  const handleUpdatePatient = (id, e) => {
    e.preventDefault()

    axios.put(`http://localhost:5000/patients/update/${id}`, selectedPatient)
    .then(response => {
      const updatePatient = {
        ...selectedPatient,
        _id: id,
      }

      console.log('Update Patient', updatePatient);

      setPatients(
        patients.map(patient => (patient._id === id ? updatePatient : patient))
      );

      setSelectedPatient(null)
      setIsEditMode(false)
    })
    .catch(err => console.error('Error updating patient: ', err))
  }

  const handleDeletePatient = (id) => {
    axios.delete(`http://localhost:5000/patients/delete/${id}`)
    .then(response => {
      console.log(response.data);
      setSelectedPatient(null)
      setPatients(patients.filter(patient => patient._id !== id))
    })
    .catch(err => console.error('Error deleting patients: ', err))
  }

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient)
    setIsEditMode(true)
  }


  return (
    <div className='flex m-5 justify-between'>
      <div>
        <h4 className='mb-10 px-20 font-semibold'>
          {
            isEditMode ? 'Edit Patient' : 'Add New Patient'
          }
        </h4>

        <div className='w-[500px] bg-white rounded-lg shadow-lg p-5'>
          {/* Form Fields*/}
          <form onSubmit={
            isEditMode ? (e) => handleUpdatePatient(selectedPatient._id, e): handleAddPatient
          }>
            {/* Name */}
            <label className='block mb-2'>Name:</label>
            <input value={isEditMode ? selectedPatient.name : newPatients.name} className='outline-none border-2 px-2 py-1 rounded-md w-full mb-5'
            onChange={
              (e) => isEditMode ? setSelectedPatient({...selectedPatient, name: e.target.value}) : setNewPatients({...newPatients, name: e.target.value})
            }
            />

            {/* Age */}
            <label className='block mb-2'>Age:</label>
            <input value={isEditMode ? selectedPatient.age : newPatients.age} type='number' className='outline-none border-2 px-2 py-1 rounded-md w-full mb-5'
            onChange={
              (e) => isEditMode ? setSelectedPatient({...selectedPatient, age: e.target.value}) : setNewPatients({...newPatients, age: e.target.value})
            }
            />

            {/* Gender */}
            <label className='block mb-2'>Gender:</label>
            <input value={isEditMode ? selectedPatient.gender : newPatients.gender} className='outline-none border-2 px-2 py-1 rounded-md w-full mb-5'
            onChange={
              (e) => isEditMode ? setSelectedPatient({...selectedPatient, gender: e.target.value}) : setNewPatients({...newPatients, gender: e.target.value})
            }
            />

            <div>
              <button className='bg-blue-400 px-2 py-1 text-white rounded-lg'>
                {
                  isEditMode ? 'Update Patient' : 'Add Patient'
                }
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='pr-40'>
        <h3 className='pl-40'>
            Patients({patients.length})
        </h3>
        <div>
          {
            patients.map(patient => (
              <PatientCard
              key={patient._id}
              patient={patient}
              onEdit={handleEditPatient}
              onDelete={handleDeletePatient}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}
