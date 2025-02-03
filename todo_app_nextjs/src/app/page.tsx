'use client'

import { useEffect, useState } from "react";

interface ToDo {
  _id: string; // added _id field
  title: string;
  description: string;
}

export default function Home() {
  const [todo, setTodo] = useState<ToDo[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ToDo[] = await response.json();
      setTodo(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete to-do');
      }

      setTodo(todo.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting to-do:', error);
    }
  };



  useEffect(() => {
    fetchData();
  }, []);

  return (
      <div className={"flex flex-col min-w-96 justify-center items-center mt-10"}>
        {todo.length > 0 ? (
            todo.map((item) => (
                <div
                    className={"bg-white gap-10 shadow-lg rounded-lg p-6 m-4 flex justify-between items-center"}
                    key={item._id}
                >
                  <div>
                    <h2 className={"font-bold text-gray-600 text-lg mb-2"}>Title: {item.title}</h2>
                    <p className={"text-gray-700"}>Description: {item.description}</p>
                  </div>
                  <button
                      className={"bg-red-500 text-white rounded-full px-4 py-2"}
                      onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
            ))
        ) : (
            <p className={"text-gray-500"}>No to-dos available</p>
        )}
      </div>
  );
}
