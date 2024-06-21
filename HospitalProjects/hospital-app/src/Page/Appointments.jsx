import React, { useEffect, useState } from 'react'
import AppointmentCard from '../Components/AppointmentCard';
import axios from 'axios'

export default function Appointments() {

  const [appointments, setAppointments] = useState([])
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    doctorName: '',
    date: '' 
  });

  const [selectAppointment, setSelectAppointment] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:5000/appointment")
    .then(response => setAppointments(response.data))
    .catch(err => console.error('Error fetching appointment:', err));
  }, [])

  const handleAddAppointment = (e) => {
    e.preventDefault()

    axios.post("http://localhost:5000/appointment/add", newAppointment)
    .then(response => {
      console.log(response.data);
      setAppointments([
        ...appointments,
        response.data
      ]);

      setNewAppointment({
        patientName: '',
        doctorName:'',
        date: ''
      })
    })
    .catch(err => console.error('Error adding appointment: ', err));
  }

  const handleUpdateAppointment = (id, e) => {
    e.preventDefault()

    axios.post(`http://localhost:5000/appointment/update/${id}`, selectAppointment)
    .then(response => {
      console.log(response.data);

      const updateApp = {
        ...selectAppointment,
        _id: id
      };

      setAppointments(
        appointments.map(
          appointment => (
            appointment._id === id ? updateApp : appointment
          )));

          setSelectAppointment(null)
          setIsEditMode(false)
    })
    .catch(err => console.error('Error updating appointment: ', err))
  }

  const handleDeleteAppointment = (id) => {
    axios.delete(`http://localhost:5000/appointment/delete/${id}`)
    .then(response => {
      console.log(response.data);

      setAppointments(
        appointments.filter(
          appointment => appointment._id !== id
        )
      );
    })
    .catch(err => console.error('Error deleting appointment:', err))
  }

  const handleEditAppointment = (appointment) => {
    setSelectAppointment(appointment)
    setIsEditMode(true)
  }

  return (
    <div className='flex m-5 justify-between'>
      <div className=''>
          <h4 className='mb-10 px-20 font-semibold'>
            {
              isEditMode ? "Edit Appointment" : "Add New Appointment"
            }
          </h4>
       <div className='bg-white rounded-lg shadow-xl w-[400px] p-5'>
       <form onSubmit={isEditMode ? (e) => handleUpdateAppointment(selectAppointment._id, e) : handleAddAppointment}>

          {/* Patient */}
          <label className='block mb-2'>Patient Name:</label>
          <input type='text' className='outline-none w-full border-2 px-2 py-1 rounded-md mb-5'
          value={
            isEditMode ? selectAppointment.patientName : newAppointment.patientName
          }

          onChange={
            (e) => {
              isEditMode ?
              setSelectAppointment({
                ...selectAppointment,
                patientName: e.target.value
              }) :
              setNewAppointment({
                ...newAppointment,
                patientName: e.target.value,
              })
            }
          }
          />

          {/* Doctor */}
          <label className='block mb-2'>Doctor Name:</label>
          <input type='text' className='outline-none w-full border-2 px-2 py-1 rounded-md mb-5'
          value={
            isEditMode ? selectAppointment.doctorName : newAppointment.doctorName
          }

          onChange={
            (e) => isEditMode ?
            setSelectAppointment({
              ...selectAppointment,
              doctorName: e.target.value
            }) : 
            setNewAppointment({
              ...newAppointment,
              doctorName: e.target.value
            })
          }
          />

          {/* Date */}
          <label className='block mb-2'>Date:</label>
          <input type='date' className='outline-none w-full border-2 px-2 py-1 rounded-md mb-5'
          value={
            isEditMode ? selectAppointment.date: newAppointment.date
          }

          onChange={
            (e) => isEditMode ?
            setSelectAppointment({
              ...selectAppointment,
              date: e.target.value
            }) :
            setNewAppointment({
              ...newAppointment,
              date: e.target.value
            })
          }
          />

          {/* Button */}
          <div>
          <button type='submit' className='bg-blue-400 py-1 px-2 text-white rounded-md'>
            {
              isEditMode ? 'Update Appointment' : 'Add Appointment'
            }
          </button>
          </div>
        </form>
       </div>
      </div>

      <div>
          <h3>
            Appointments
            ({
              appointments.length
            })
          </h3>
          <div>
            {
              appointments.map(appointments => (
                <AppointmentCard
                key={appointments._id}
                appointment={appointments}
                onEdit={handleEditAppointment}
                onDelete={handleDeleteAppointment} 
                />
              ))
            }
          </div>
        </div>
    </div>
  )
}
