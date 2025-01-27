import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/auth/login", {
        email,
        password,
      }).then((res) => navigate("/dashboard")
      ).catch((err) => navigate("/"));
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-80 space-y-4">
        <h1 className="text-3xl font-semibold">Login</h1>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <div className="w-full flex flex-col justify-cemter items-center">
          <p>Already Have an Account</p>
          <Link
            to={"/register"}
            className="bg-green-600 text-center w-full px-1 py-2 rounded-md text-white"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
