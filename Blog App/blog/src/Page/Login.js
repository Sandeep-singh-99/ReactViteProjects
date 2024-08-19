import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { login } from '../redux/slice/authSlice';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(login(user));
    message.success("Login success");
    navigate("/");
    setEmail("");
    setPassword("");
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error...</h1>;
  }


  return (
    <>
   <div className='flex items-center justify-center mt-20'>
    <div className='rounded-md shadow-md w-[350px] p-5 border-2'>
      <div className='flex flex-col'>
        <h1 className='text-3xl mb-2 font-bold'>Login</h1>
        <div className='h-1 bg-gradient-to-r from-indigo-700 to-purple-700 mb-3'></div>
        
        <form className='' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='font-semibold mb-2 block'>Email:</label>
            <input onChange={(e) => setEmail(e.target.value)} className='border rounded-md w-full py-2 px-3 outline-blue-600' placeholder='Enter your email'/>
          </div>

          <div className='mb-3'>
            <label className='font-semibold mb-2 block'>Password:</label>
            <input onChange={(e) => setPassword(e.target.value)} className='border rounded-md w-full py-2 px-3 outline-blue-600' placeholder='Enter your password'/>
          </div>

          <button className='w-full bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-2 rounded-md'>Login</button>
        </form>

      </div>
    </div>
   </div>
    </>
  )
}

export default Login