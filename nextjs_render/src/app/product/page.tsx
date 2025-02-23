import React from "react";



async function getProduct() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }
  );
  const data = await response.json();
  return data
}

export default async function Product() {
  const products = await getProduct();
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">To-Do List (SSR)</h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((todo) => (
            <div key={todo.id} className="border rounded-lg p-4 shadow-md">
              <h2 className="text-lg font-semibold mt-2">{todo.title}</h2>
              <p className="text-gray-500">
                Status: {todo.completed ? "✅ Completed" : "❌ Not Completed"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No todos available</p>
      )}
    </div>
  );
}
