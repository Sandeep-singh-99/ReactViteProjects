import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { addBlog } from "../redux/slice/blogSlice";
function AddBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const { isLoading, isError, data } = useSelector((state) => state.blog);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, content: description, image };
    dispatch(addBlog(blog)).then((result) => {
      if (addBlog.fulfilled.match(result)) {
        message.success("Blog added successfully");
        setTitle("");
        setDescription("");
        setImage("");
      } else {
        message.error("Failed to add blog");
      }
    });
  };

  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }

  // if (isError) {
  //   return <h1>Error...</h1>;
  // }

  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <div className="m-10 rounded-md shadow-lg w-[50%] p-5 border-2 ">
          <h1 className="text-3xl mb-2 font-bold">Add Blog</h1>
          <div className="h-1 bg-gradient-to-r w-[30%] from-indigo-700 to-purple-700 mb-3"></div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="font-semibold mb-2 block text-xl">Title:</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded-md w-full py-2 px-3 outline-blue-600"
                placeholder="Enter your title"
              />
            </div>

            <div className="mb-3">
              <label className="font-semibold mb-2 block text-xl">
                Description:
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded-md w-full py-2 px-3 outline-blue-600"
                placeholder="Enter your description"
              />
            </div>

            <div className="mb-3">
              <label className="font-semibold mb-2 block text-xl">Image:</label>
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="border rounded-md w-full py-2 px-3 outline-blue-600"
                type="text"
                placeholder="Enter your Image URL"
              />
            </div>

            <button className="w-full bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-2 rounded-md">
              Add Blog
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddBlog;
