import React, { useEffect, useState } from "react";
import axios from "axios";

function ToDo() {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("");
  const [deadline, setDeadline] = useState("");
  const [getTask, setGetTask] = useState([])
  const [deleteTask, setDeleteTask] = useState('')

  const getTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todo/getToDoList')
      const data = response.data.data

      if (Array.isArray(data)) {
        setGetTask(data)
      } else {
        console.error("API did not not return an array: ", data);
        setGetTask([])
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todo/deleteToDoList/${id}`)
      getTasks()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTasks()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {task, status, deadline}

    try {
      const response = await axios.post('http://localhost:5000/api/todo/addToDoList',newTask)
      //Reset the form
      setTask("")
      setStatus("")
      setDeadline("")
      getTasks()
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center mt-10">
        <h1 className="text-3xl font-bold">Add ToDo</h1>
      </div>
      <div className="flex justify-center items-center mt-5">
        <div className="bg-[#f3f4f6] rounded-md shadow-lg w-[350px] px-5 py-5 shadow-green-900">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Task:
              </label>
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Status:
              </label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Deadline:
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>

      <div className="flex m-10 rounded-lg shadow-lg border-2 shadow-green-600/30">
        <table className="w-full table-auto">
          <thead className="bg-green-500">
            <tr className="text-xl">
              <th className="border">Task</th>
              <th className="border">Status</th>
              <th className="border">Deadline</th>
              <th className="border">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
          {Array.isArray(getTask) && getTask.map((task) => (
              <tr key={task._id} className="">
                <td className="border">{task.task}</td>
                <td className="border">{task.status}</td>
                <td className="border">{task.deadline}</td>
                <td className="border">
                  <button 
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ToDo;
