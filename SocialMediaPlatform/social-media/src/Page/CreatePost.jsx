import axios from 'axios';
import React, { useState } from 'react'

export default function CreatePost() {
    const [newPost, setNewPost] = useState({
        title:'',
        content:'',
        file: null,
    })

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setNewPost({...newPost, [name]: value})
    }

    const hadnleFileChange = (event) => {
        setNewPost({...newPost, file: event.target.files[0]})
    }

    const handlePostSubmit = () => {
        const formData = new FormData()
        formData.append("title", newPost.title)
        formData.append("content", newPost.content)
        formData.append("file", newPost.file)

        console.log("aif");

        axios.post("http://localhost:5000/api/posts", formData)
        .then((response) => {
            setNewPost({title: "", content: "", file: null})
            console.log("asasdad");
        })
        .catch((err) => console.error("Error creating post: ", err))
    }
  return (
    <div className='w-full mt-5 shadow-lg p-5 bg-gray-100'>
        <div>
            <div>
                <h2 className='text-xl pb-5 font-semibold'>Create a Post</h2>
            </div>
            <div className=''>
                <div className='mb-5'>
                    <input
                    type='text'
                    name='title'
                    placeholder='Title'
                    value={newPost.title}
                    onChange={handleInputChange}
                    className='outline-none w-full px-2 py-1 rounded-md' 
                    />
                </div>
                <div className='mb-5'>
                    <textarea
                    name='content'
                    placeholder='Content'
                    value={newPost.content}
                    onChange={handleInputChange} 
                    className='w-full outline-none px-2 py-1 rounded-md'
                    />
                </div>
                <div className='mb-5'>
                    <input type='file' name='file' onChange={hadnleFileChange}/>
                </div>
                <div>
                    <button className='bg-green-500 text-white px-2 py-1 rounded-md' onClick={handlePostSubmit}>Post</button>
                </div>
            </div>
        </div>
    </div>
  )
}
