'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

import { HiOutlineTrash } from 'react-icons/hi'
export default function RemoveBtn({id}) {
    const router = useRouter();

    const remove = async () => {
        const confirmed = confirm('Are you sure?')

        if (confirmed) {
            const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                router.push(window.location.pathname);
            } else {
                alert('Failed to delete topic');
            }
        }
    }
  return (
    <button onClick={remove} className='text-red-400'>
        <HiOutlineTrash size={24}/>
    </button>
  )
}
