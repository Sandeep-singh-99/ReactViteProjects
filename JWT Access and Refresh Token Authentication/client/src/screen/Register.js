import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/register', { name, email, password })
        .then(res => {
            navigate('/login')
        })
        .catch(err => console.log(err))
    }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-5 rounded shadow-2xl w-80">
        <h1 className="text-2xl underline">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5 mt-3">
            <label className="block">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
          </div>

          <div className="mb-5">
            <label className="block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
          </div>

          <div className="mb-5">
            <label className="block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
          </div>

          <button type="submit" className="bg-blue-600 text-white w-full py-1 text-xl rounded">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
