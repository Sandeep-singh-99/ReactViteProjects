import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function NoteMakerList() {

  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3000/api/notemaker/getnote")
    .then((response) => setNotes(response.data))
    .catch((err) => console.error("Error fetching notes: ", err))
  },[])


  const handleAddNote = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3000/api/notemaker/addnote", {title, content})
    .then((response) => {
      setNotes([...notes, response.data]);
      setTitle("")
      setContent("")
    })
    .catch((err) => console.error("Error adding note: ", err))
  }

  const handleEditNote = (id, updatedTitle, updatedContent) => {
    axios.put(`http://localhost:3000/api/notemaker/updatenote/${id}`, {
      title: updatedTitle,
      content: updatedContent
    })
    .then((response) => {
      const updateNotes = notes.map((note) => 
      note._id === id ? response.data : note);
      setNotes(updateNotes)
    })
    .catch((err) => console.error("Error updating note: ", err))
  }

  const handleDeleteNote = (id) => {
    axios.delete(`http://localhost:3000/api/notemaker/deletenote/${id}`)
    .then((response) => {
      const deleteNotes = notes.filter((note) => note._id !== id)
      setNotes(deleteNotes)
    })
    .catch((err) => console.error("Error deleting note: ", err))
  }

  return (
    <div className='bg-white rounded-lg shadow-xl relative m-10 border-4'>
        <div className='p-4'>
            <div className='pt-5'>
                <h1 className='text-3xl font-bold'>Notes App</h1>
            </div>
            <div className='mt-5 mb-10'>
              <form>
                <h2 className='font-semibold text-2xl'>Add Note</h2>
                <div className='mt-5'>
                  <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 w-full rounded-md outline-none px-2 py-2'/>
                </div>
                <div className='mt-5'>
                  <textarea placeholder='Content' value={content} onChange={(e) => setContent(e.target.value)} className='border-2 w-full px-3 py-4 outline-none rounded-md' rows={5} cols={30}>
                  </textarea>
                </div>

                <div className='mt-5'>
                  <button onClick={handleAddNote} className='bg-green-500 w-full py-2 text-white rounded-md'>
                    Add Note
                  </button>
                </div>
              </form>
            </div>

            {notes.map((note) => (
          <div key={note._id} className='mb-3'>
            <div className='bg-gray-300 rounded-lg'>
              <div className='p-2 pb-5'>
                <label className='text-xl font-semibold mb-5 text-[#3f3f3f]'>
                  {note.title}
                </label>
                <p className='text-[#7f7f7f]'>{note.content}</p>
                <div className='flex gap-4 mt-5'>
                  <button
                    onClick={() => handleEditNote(note._id,
                      prompt("Enter updated title: ", note.title),
                      prompt("Enter updated content: ",note.content)
                    )}
                    className='w-full bg-green-500 text-white py-2 rounded-md'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note._id)}
                    className='w-full bg-green-500 text-white py-2 rounded-md'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
    </div>
  )
}
