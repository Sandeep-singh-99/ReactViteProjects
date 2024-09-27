"use client"
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function EditTopicForm({ id, title, description }) {
    const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title: newTitle, description: newDescription }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <input type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder='Topic Title' className='border border-slate-500 px-8 py-2' />

        <input type='text' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder='Topic Description' className='border border-slate-500 px-8 py-2' />

        <button className='bg-green-600 font-bold text-white py-3 px-6 w-fit'>Update Topic</button>
    </form>
    </>
  )
}
