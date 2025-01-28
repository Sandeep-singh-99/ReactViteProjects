import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FromPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    date: "",
    description: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccessMessage] = useState("");
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setError(null);
    setSuccessMessage("");
  
    try {
      const response = await fetch("http://localhost:5000/api/form/add-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json(); // Parse JSON response
  
      if (response.ok) {
        setSuccessMessage(data.message);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          date: "",
          description: "",
        });
        navigate("/");
      } else {
        // Handle errors returned by the backend
        if (data.errors) {
          setError(data.errors);
        } else {
          setError([{ message: data.message || "Something went wrong" }]);
        }
      }
    } catch (error) {
      setError([{ message: "Network error. Please try again later." }]);
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-slate-950 text-white rounded-md shadow-2xl min-w-xs border-2 border-gray-300 px-5 py-5">
        <h1 className="text-2xl font-bold">Form Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="pt-4 mb-3">
            <label className="font-semibold mr-2">FirstName: </label>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
              className="border  rounded-md px-2 py-1 outline-none"
              placeholder="Enter your First name"
            />
          </div>

          <div className="mb-3">
            <label className="font-semibold mr-2">LastName: </label>
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
              className="border rounded-md px-2 py-1 outline-none"
              placeholder="Enter your last name"
            />
          </div>

          <div className="mb-3">
            <label className="font-semibold mr-2">Email: </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="border rounded-md px-2 py-1 outline-none"
            />
          </div>

          <div className="mb-3">
            <label className="font-semibold mr-2">Phone: </label>
            <input
              type="number"
              name="phone"
              onChange={handleChange}
              value={formData.phone}
              placeholder="phone no"
              className="border rounded-md px-2 py-1 outline-none"
            />
          </div>

          <div className="mb-3">
            <label className="font-semibold mr-2">Message: </label>
            <input
              type="text"
              name="message"
              onChange={handleChange}
              value={formData.message}
              placeholder="Message"
              className="border rounded-md px-2 py-1 outline-none"
            />
          </div>

          <div className="mb-3">
            <label className="font-semibold mr-2">Date: </label>
            <input
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border rounded-md px-2 py-1 outline-none"
              type="date"
            />
          </div>

          <div className="mb-3">
            <label className="font-semibold mr-2 mb-2 block">
              Description:{" "}
            </label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              value={formData.description}
              placeholder="Description"
              className="border rounded-md px-2 py-1 w-full outline-none"
            />
          </div>

          {error && (
            <div className="mb-4">
              <ul className="text-red-600">
                {error.map((err, index) => (
                  <li key={index}>{err.message}</li>
                ))}
              </ul>
            </div>
          )}

          {success && (
            <div className="mb-4 text-green-600 font-bold">{success}</div>
          )}

          <button className="bg-blue-600 w-full rounded-md py-1">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default FromPage;
