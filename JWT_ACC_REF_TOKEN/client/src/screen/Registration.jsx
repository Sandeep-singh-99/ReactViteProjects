import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Registration() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }).then((res) => navigate('/login')).catch((err) => console.log(err));
    } catch (error) {
      console.log("Error", error);
    }
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-80 space-y-4">
        <h1 className="text-3xl font-semibold">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block font-semibold mb-2">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-none px-3 py-1 border-1 rounded-md w-full"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-5">
            <label className="block font-semibold mb-2">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none px-3 py-1 border-1 rounded-md w-full"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-5">
            <label className="block font-semibold mb-2">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none px-3 py-1 border-1 rounded-md w-full"
              placeholder="Enter your password"
            />
          </div>

          <button className="bg-blue-600 w-full py-2 rounded-md text-white">
            Register
          </button>
        </form>
        <div className="flex flex-col justify-center items-center">
          <p>Already Have an Account</p>
          <Link to={"/login"} className="bg-green-600 w-full py-2 text-center rounded-md text-white">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Registration;
