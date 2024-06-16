import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import axios from 'axios';

const TaskContext = createContext();

const apiURL = "http://localhost:5000/api/task";

export const useTaskContext = () => {
    return useContext(TaskContext);
}

export default function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [totalTasks, setTotalTasks] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [todoTasks, setTodoTasks] = useState(0);

    useEffect(() => {
        fetchData();
    }, [totalTasks]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiURL}/tasks`);
            setTasks(response.data);
            setFilteredTasks(response.data);
            setTotalTasks(response.data.length);
            const completedCount = response.data.filter(task => task.status === 'Completed').length;
            setCompletedTasks(completedCount);
            setTodoTasks(response.data.length - completedCount);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleFilterClick = (status) => {
        if (status === 'all') {
            setFilteredTasks(tasks);
        } else {
            const filtered = tasks.filter(task => task.status === status);
            setFilteredTasks(filtered);
        }
    };

    const addTask = async (title, description, status) => {
        try {
            const response = await axios.post(`${apiURL}/tasks`, {
                title,
                description,
                status,
            });
            const newTask = response.data;
            setTasks(prevTasks => [...prevTasks, newTask]);
            setFilteredTasks(prevTasks => [...prevTasks, newTask]);
            setTotalTasks(prevTotal => prevTotal + 1);

            if (status === 'Completed') {
                setCompletedTasks(prevCompleted => prevCompleted + 1);
            } else {
                setTodoTasks(prevTodo => prevTodo + 1);
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`${apiURL}/tasks/${taskId}`);
            const updatedTasks = tasks.filter(task => task._id !== taskId);
            setTasks(updatedTasks);
            setFilteredTasks(updatedTasks);
            setTotalTasks(updatedTasks.length);

            const completedCount = updatedTasks.filter(task => task.status === 'Completed').length;
            setCompletedTasks(completedCount);
            setTodoTasks(updatedTasks.length - completedCount);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const editTask = async (taskId, updatedTitle, updatedDescription, updatedStatus) => {
        try {
            await axios.put(`${apiURL}/tasks/${taskId}`, {
                title: updatedTitle,
                description: updatedDescription,
                status: updatedStatus
            });
            fetchData();
        } catch (error) {
            console.error("Error editing task:", error);
        }
    };

    const updateTaskStatus = async (taskId, status) => {
        try {
            await axios.put(`${apiURL}/tasks/${taskId}`, { status });
            const updatedTasks = tasks.map(task => task._id === taskId ? { ...task, status } : task);

            setTasks(updatedTasks);
            setFilteredTasks(updatedTasks);

            const completedCount = updatedTasks.filter(task => task.status === 'Completed').length;
            setCompletedTasks(completedCount);
            setTodoTasks(updatedTasks.length - completedCount);
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    return (
        <TaskContext.Provider
            value={{
                filteredTasks,
                totalTasks,
                completedTasks,
                todoTasks,
                handleFilterClick,
                addTask,
                deleteTask,
                editTask,
                updateTaskStatus
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}
