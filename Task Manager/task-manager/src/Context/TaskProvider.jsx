import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import axios from 'axios'

const TaskContext = createContext()

const apiURL = "http://localhost:5000/api/task"

export const useTaskContext = () => {
    return useContext(TaskContext)
}

export default function TaskProvider({children}) {
    const [tasks, setTasks] = useState([])
    const [filiteredTasks, setFiliteredTasks] = useState([])
    const [totalTasks, setTotalTasks] = useState(0)
    const [completedTasks, setCompletedTasks] = useState(0)
    const [todoTasks, setTodoTasks] = useState(0)

    useEffect(() => {
        fetchData()
    }, [totalTasks])


    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiURL}/tasks`)
            setTasks(response.data)
            setFiliteredTasks(response.data)
            setTotalTasks(response.data.length)
            const completedCount = response.data.filter(
                (task) => task.status === 'Completed' 
            ).length;
            setCompletedTasks(completedCount)
            setTodoTasks(response.data.length - completedCount)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleFilterClick = (status) => {
        if (status === 'all') {
            setFiliteredTasks(tasks)
        } else {
            const filtered = tasks.filter((task) => task.status === status)
            setFiliteredTasks(filtered)
        }
    }

    const addTask = async (title, description, status) => {
        try {
            const response = await axios.post(`${apiURL}/tasks`, {
                title,
                description,
                status,
            });
            setTasks([...tasks, response.data])
            if (status === 'Completed') {
                setCompletedTasks((prev) => prev + 1)
            } else {
                setTodoTasks((prev) => prev + 1)
            }
            setTotalTasks((prev) => prev + 1)
        } catch (error) {
            console.error("Error adding tasks:", error);
        }
    }

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`${apiURL}/tasks/${taskId}`)
            const updatedTasks = tasks.filter((task) => task.id !== taskId)
            setTasks(updatedTasks)
            setFiliteredTasks(updatedTasks)
            setTotalTasks((prev) => prev - 1)

            const completedCount = updatedTasks.filter(
                (task) => task.status === "Completed"
            ).length;
            setCompletedTasks(completedCount)
            setTotalTasks(updatedTasks.length - completedCount)
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    const editTask = async (taskId, updatedTitle, updatedDescription, updatedStatus) => {
        try {
            await axios.put(`${apiURL}/tasks/${taskId}`, {
                title: updatedTitle,
                description: updatedDescription,
                status: updatedStatus
            });
            fetchData()
        } catch (error) {
            console.error("Error editing tasks: ", error);
        }
    }

    const updatedTaskStatus = async (taskId, status) => {
        try {
            await  axios.put(`${apiURL}/tasks/${taskId}`, {status})
            const updatedTasks = tasks.map((task) => task._id === taskId ? {...task, status} : task)

            setTasks(updatedTasks)
            setFiliteredTasks(updatedTasks)
           
            const completedCount = updatedTasks.filter(
                (task) => task.status === "Completed"
            ).length;

            setCompletedTasks(completedCount)
            setTodoTasks(updatedTasks.length - completedCount)
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    }

  return (
    <TaskContext.Provider
    value={{
        filiteredTasks,
        totalTasks,
        completedTasks,
        todoTasks,
        handleFilterClick,
        addTask,
        deleteTask,
        editTask,
        updatedTaskStatus
    }}
    >
        {children}
    </TaskContext.Provider>
  )
}
