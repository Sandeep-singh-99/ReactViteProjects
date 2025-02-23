import React from "react";

async function getTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    // cache: "force-cache", // ✅ Forces SSG (data is cached at build time)
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch todos: ${response.status}`);
  }

  return response.json();
}

export default async function TodoList() {
  const todos = await getTodos(); // ✅ Fetches data at build time

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">To-Do List (SSG)</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {todos.map((todo) => ( // ✅ Only showing first 10
          <div key={todo.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-semibold mt-2">{todo.title}</h2>
            <p className="text-gray-500">
              Status: {todo.completed ? "✅ Completed" : "❌ Not Completed"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
