"use client"; // Required in Next.js 13+ (App Router)

import React, { useEffect, useState } from "react";

export default function ToDo() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await response.json();
        setTodos(data); // ✅ Set fetched data to state
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false); // ✅ Stop loading once done
      }
    }

    fetchTodos();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">To-Do List (CSR)</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {todos.map((todo) => ( // Showing only first 10
            <div key={todo.id} className="border rounded-lg p-4 shadow-md">
              <h2 className="text-lg font-semibold mt-2">{todo.title}</h2>
              <p className="text-gray-500">
                Status: {todo.completed ? "✅ Completed" : "❌ Not Completed"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
