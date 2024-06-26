import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleLike = (postId) => {
    axios
      .post(`http://localhost:5000/api/posts/like/${postId}`)
      .then((response) => {
        const updatedPosts = posts.map((post) =>
          post._id === postId ? response.data : post
        );
        setPosts(updatedPosts);
      })
      .catch((error) => console.error("Error liking post:", error));
  };

  const handleAddComment = (postId) => {
    const commentText = commentInputs[postId] || "";
    if (!commentText.trim()) return;

    axios
      .post(`http://localhost:5000/api/posts/comment/${postId}`, { text: commentText })
      .then((response) => {
        const updatedPosts = posts.map((post) =>
          post._id === postId ? response.data : post
        );
        setPosts(updatedPosts);
        setCommentInputs({ ...commentInputs, [postId]: "" }); // Clear the input after submitting
      })
      .catch((error) => console.error("Error adding comment:", error));
  };

  const handleCommentInputChange = (postId, value) => {
    setCommentInputs({ ...commentInputs, [postId]: value });
  };

  return (
    <div className="w-full mt-10 shadow-lg rounded-lg bg-gray-100 p-5">
      <div className="p-4 mb-5">
        <h1 className="text-2xl font-semibold">Recent Posts</h1>
      </div>
      {posts.map((post) => (
        <div key={post._id} className="shadow-lg rounded-md w-full bg-red-50 px-4 pt-8 mb-5">
          <h3 className="text-xl pb-5">{post.title}</h3>
          <p>{post.content}</p>
          {post.file && (
            <div>
              {post.file.includes(".mp4") ? (
                <video width="320" height="240" controls>
                  <source src={`http://localhost:5000/uploads/${post.file}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  width="320"
                  height="240"
                  src={`http://localhost:5000/uploads/${post.file}`}
                  alt="Post Media"
                />
              )}
            </div>
          )}
          <p>Likes: {post.likes}</p>
          <button onClick={() => handleLike(post._id)} className="mt-2 mb-2 px-4 py-2 bg-blue-500 text-white rounded">Like</button>
          <div className="mt-2">
            <p>Comments: {post.comments.length}</p>
            <ul className="list-disc pl-5">
              {post.comments.map((comment, index) => (
                <li key={index} className="mt-1">{comment.text}</li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Add a comment"
              value={commentInputs[post._id] || ""}
              onChange={(e) => handleCommentInputChange(post._id, e.target.value)}
              className="mt-2 p-2 border border-gray-300 rounded"
            />
            <button onClick={() => handleAddComment(post._id)} className="mt-2 px-4 py-2 bg-green-500 text-white rounded">Add Comment</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
