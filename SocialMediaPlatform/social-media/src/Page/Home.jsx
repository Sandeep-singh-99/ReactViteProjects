import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
    const [commentInput, setCommentInput] = useState("")
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/api/posts")
        .then((response) => setPosts(response.data))
        .catch((err) => console.error('Error fetching posts:', err))
    },[])

    const handleLike = (postId) => {
        axios.post("http://localhost:5000/api/posts/like/${postId}")
        .then((response) => {
            const updatedPosts = posts.map((post) => post._id === postId ? response.data : post)
            setPosts(updatedPosts)
        })
        .catch((err) => console.error("Error linking post: ", err))
    }

    const handleAddComment = (postId, commentText) => {
        axios.post(`http://localhost:5000/api/posts/comment/${postId}`, {
            text: commentText,
        })
        .then((response) => {
            const updatedPosts = posts.map((post) => post._id === postId ? response.data : post)
            setPosts(updatedPosts)
        })
        .catch((err) => console.error("Error adding comment: ", err))
    }
  return (
    <div className="home">
    <h2>Recent Posts</h2>
    {posts.map((post) => (
        <div key={post._id} className="post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {post.file && (
                <div>
                    {post.file.includes(".mp4") ? (
                        <video width="320" height="240" controls>
                            <source
                                src={
                            `http://localhost:5000/uploads/${post.file}`
                                }
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <img
                            src={
                            `http://localhost:5000/uploads/${post.file}`
                            }
                            alt="Post Media"
                        />
                    )}
                </div>
            )}
            <p>Likes: {post.likes}</p>
            <button onClick={() => handleLike(post._id)}>Like</button>
            <p>Comments: {post.comments.length}</p>
            <ul>
                {post.comments.map((comment, index) => (
                    <li key={index}>{comment.text}</li>
                ))}
            </ul>

            <input
                type="text"
                placeholder="Add a comment"
                className="comment-input"
                onChange={(e) => setCommentInput(e.target.value)}
            />
            <button
                onClick={() => handleAddComment(post._id, commentInput)}
                className="comment-button"
            >
                Add Comment
            </button>
        </div>
    ))}
</div>
  )
}
