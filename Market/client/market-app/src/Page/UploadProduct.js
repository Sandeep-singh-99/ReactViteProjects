import React, { useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UploadProduct() {
  const [upload, setUpload] = useState({
    name: "",
    desc: "",
    img: "",
    category: "",
    price: "",
  });

  const notify = () => toast("Submit")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpload({
      ...upload,
      [name]: value,
    });
  };

  const uploadProduct = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/user/upload-product", upload)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.error("Error Upload Products", err));
  };
  return (
    <div className="p-20 space-y-5">
      <div className="bg-slate-950 px-10 py-5">
        <div className="flex justify-center">
          <h1 className="text-white text-3xl uppercase font-semibold">
            Upload Product
          </h1>
        </div>
      </div>
      <div className="">
        <form onSubmit={uploadProduct}>
          <div className="mb-3">
            <label className="block mb-2">Name:</label>
            <input
              className="border-2 w-full rounded-md px-5 py-3"
              name="name"
              value={upload.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block mb-2">Category:</label>
            <input
              className="border-2 w-full rounded-md px-5 py-3"
              name="category"
              value={upload.category}
              onChange={handleChange}
              placeholder="Category"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block mb-2">Price:</label>
            <input
              className="border-2 rounded-md w-full px-5 py-3"
              name="price"
              value={upload.price}
              onChange={handleChange}
              placeholder="Price"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block mb-2">Image:</label>
            <input
              className="border-2 rounded-md w-full px-5 py-3"
              name="img"
              value={upload.img}
              onChange={handleChange}
              placeholder="Image"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block mb-2">Description:</label>
            <input
              className="border-2 rounded-md w-full px-5 py-3"
              name="desc"
              value={upload.desc}
              onChange={handleChange}
              placeholder="Description"
              required
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" onClick={notify} className="bg-blue-600 px-5 py-3 text-white rounded-md">
              Submit
            </button>
            <ToastContainer/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadProduct;
