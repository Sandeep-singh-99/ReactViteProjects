import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const newUser = { name, email, password };

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', newUser);
      console.log(res.data);
      window.location.href = "/login"
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className='shadow-lg rounded-md bg-white mt-5 p-7'>
      <h1 className='text-lg pb-5 font-semibold'>Register</h1>
      <form onSubmit={onSubmit}>
        <input 
        type="text" 
        name="name" 
        value={name} 
        onChange={onChange} 
        placeholder="Name" 
        required
        className='block outline-none w-full border-2 px-3 py-2 rounded-md mb-5' 
        />

        <input 
        type="email" 
        name="email" 
        value={email} 
        onChange={onChange}
        placeholder="Email" 
        required
        className='block outline-none w-full border-2 px-3 py-2 rounded-md mb-5' 
        />
        <input 
        type="password" 
        name="password" 
        value={password} 
        onChange={onChange} 
        placeholder="Password" 
        required 
         className='block outline-none w-full border-2 px-3 py-2 rounded-md mb-5'
        />
        <button className='bg-blue-500 text-white px-2 py-1 w-[150px] rounded-md' type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
