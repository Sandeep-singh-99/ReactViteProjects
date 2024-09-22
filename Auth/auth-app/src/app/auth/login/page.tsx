'use client'
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>()

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const response: AxiosResponse = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            })

            setEmail('')
            setPassword('')
            localStorage.setItem('token', response.data);
            router.push('./homepage')
            console.log("login:",response.data);
            return response.data
        } catch (error) {
            alert("login not successful")
            console.log("Error",error);
            
        }
    }
  return (
    <div className='flex justify-center'>
        <div className='bg-blue-950 px-5 py-10 w-[350px] rounded-md'>
            <form onSubmit={handleSubmit}>
                <h1 className='text-white text-2xl font-bold flex justify-center'>Login</h1>

                <div className='mb-5'>
                    <label className='block mb-3 text-white'>Email:</label>
                    <input className='w-full rounded-md px-3 py-2 outline-none'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    value={email}
                    type='email'
                    placeholder='Enter your email'
                    />
                </div>

                <div className='mb-5'>
                    <label className='block mb-3 text-white'>Password:</label>
                    <input className='w-full rounded-md px-3 py-2 outline-none'
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    value={password}
                    type='password'
                    placeholder='Enter your password'
                    />
                </div>

                <div className=''>
                    <button className='bg-green-500 px-10 py-3 rounded-md text-white w-full'>Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login