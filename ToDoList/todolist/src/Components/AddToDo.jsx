import React, { useEffect, useState } from 'react'
import axios from "axios"

export default function ToDo() {
    const [todolist, setTodoList] = useState([])
    const [edittableId, setEditTableId] = useState(null)
    const [editedtask, setEditedTask] = useState("")
    const [editedStatus, setEditedStatus] = useState("")
    const [newtask, setNewTask] = useState("")
    const [newstatus, setNewStatus] = useState("")
    const [newdeadline, setNewDeadLine] = useState("")
    const [editeddeadline, setEditedDeadLine] = useState("")

    // Fetch task from database
    useEffect(() => {
        axios.get('http://localhost:3000/api/todo/getToDoList')
        .then(result => {
            setTodoList(result.data)
        })
        .catch(err => console.log(err))
    },[])

    // Function to toggle the editable state for a specific row
    const toggleEditable = (id) => {
        const rowData = todolist.find((data) => data._id === id)
         if (rowData) {
            setEditTableId(id)
            setEditedTask(rowData.task)
            setEditedStatus(rowData.status)
            setEditedDeadLine(rowData.deadline || "")
         } else {
            setEditTableId(null)
            setEditedTask("")
            setEditedStatus("")
            setEditedDeadLine("")
         }
    }

    //Function to add task to the database
    const addTask = (e) => {
        e.preventDefault();
        if (!newtask || !newstatus || !newdeadline) {
            alert("All fields must be filled out.")
            return;
        }

        axios.post('http://localhost:3000/api/todo/addToDoList', {
            task: newtask, status: newstatus, deadline: newdeadline
        })
        .then(res => {
            console.log(res);
            alert("Successfully submit")
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    // Function to save edited data to the database
    const savedEditedTask = (id) => {
        const editedData = {
            task: editedtask,
            status: editedStatus,
            deadline: editeddeadline
        }

        //If the fields are empty
        if (!editedtask || !editedStatus || !editeddeadline) {
            alert("All fields must be filled out.")
            return;
        }

        // Updating edited data to the database through updateById API
        axios.put('http://localhost:3000/api/todo/updateToDoList/' + id, editedData)
        .then(result => {
            console.log(result);
            setEditTableId(null)
            setEditedTask("")
            setEditedStatus("")
            setEditedDeadLine("") // clear the edited deadline
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    // Delete task from database
    const deleteTask = (id) => {
        axios.delete('http://localhost:3000/api/todo/deleteToDoList/'+ id)
        .then(result => {
            console.log(result);
            window.location.reload()
        })
        .catch(err => {
            console.log(err);
        })
    }


  return (
    <>
    <div className='flex justify-center items-center mt-10'>
        <div>
            <label className='font-semibold text-3xl'>Add Task</label>
        </div>
    </div>

    <div className='flex justify-center items-center mt-5'>
        <div className='mx-auto w-full max-w-[450px] rounded-md shadow-lg px-5 py-10 bg-gray-100'>
            <form>
                {/* Task Feild */}
                <div className='mb-5'>
                    <label className='block mb-3 text-base font-medium'>Task</label>
                    <input type='text' id='text' name='text' onChange={(e) => setNewTask(e.target.value)} placeholder='Enter your task' className='w-full text-blue-600 rounded-md shadow-lg border border-[#e0e0e0] px-3 py-3 outline-none text-base font-medium'/>
                </div>

                {/* Status Feild*/}
                <div className='mb-5'>
                    <label className='block mb-3 text-base font-medium'>Status</label>
                    <input type='text' id='text' name='text' onChange={(e) => setNewStatus(e.target.value)} placeholder='Enter your status' className='w-full text-blue-600 rounded-md shadow-lg border border-[#e0e0e0] px-3 py-3 outline-none text-base font-medium'/>
                </div>

                {/* Deadline */}
                <div className='mb-5'>
                    <label className='block mb-3 text-base font-medium'>Deadline</label>
                    <input type='date' id='date' name='date' onChange={(e) => setNewDeadLine(e.target.value)} className='w-full text-blue-600 rounded-md shadow-lg border border-[#e0e0e0] px-3 py-3 outline-none text-base font-medium'/>
                </div>

                <div>
                    <button onClick={addTask} className='bg-green-500 px-3 py-1 rounded-md text-white'>Add Task</button>
                </div>
            </form>
        </div>
    </div>

    <div className='flex justify-center items-center mt-10'>
        <div>
            <label className='font-semibold text-3xl'>ToDo List</label>
        </div>
    </div>

   {/* Todo List Table */}
   <div className='rounded-lg shadow-lg border-2 m-10 shadow-green-600/30'>
                <div className='bg-gray-100'>
                    <table className='w-full table-auto'>
                        <thead>
                            <tr>
                                <th className='bg-green-600 px-4 py-2 border'>Task</th>
                                <th className='bg-green-600 px-4 py-2 border'>Status</th>
                                <th className='bg-green-600 px-4 py-2 border'>Deadline</th>
                                <th className='bg-green-600 px-4 py-2 border'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todolist.map((todo) => (
                                <tr key={todo._id}>
                                    <td className='border px-4 py-2'>
                                        {edittableId === todo._id ? (
                                            <input type="text" value={editedtask} onChange={(e) => setEditedTask(e.target.value)} />
                                        ) : (
                                            todo.task
                                        )}
                                    </td>
                                    <td className='border px-4 py-2'>
                                        {edittableId === todo._id ? (
                                            <input type="text" value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)} />
                                        ) : (
                                            todo.status
                                        )}
                                    </td>
                                    <td className='border px-4 py-2'>
                                        {edittableId === todo._id ? (
                                            <input type="date" value={editeddeadline.split('T')[0]} onChange={(e) => setEditedDeadLine(e.target.value)} />
                                        ) : (
                                            new Date(todo.deadline).toLocaleDateString()
                                        )}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap flex justify-center items-center'>
                                        {edittableId === todo._id ? (
                                            <button onClick={() => savedEditedTask(todo._id)} className='px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600 transition duration-150 ease-in-out'>Save</button>
                                        ) : (
                                            <button onClick={() => toggleEditable(todo._id)} className='px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out'>Edit</button>
                                        )}
                                        <button onClick={() => deleteTask(todo._id)} className='ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    </>
  )
}
