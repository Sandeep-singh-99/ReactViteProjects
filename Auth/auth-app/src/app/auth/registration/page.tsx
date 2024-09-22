'use client'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState} from 'react'

function Registration() {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>()

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const response: AxiosResponse = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password
            })

            setEmail('')
            setPassword('')
            setName('')

            router.push('/auth/login')

            console.log(response.data);
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='flex justify-center'>
        <div className='bg-blue-950 px-5 py-10 w-[350px] rounded-md'>
            <form onSubmit={handleSubmit}>
                <h1 className='text-white text-2xl font-bold flex justify-center'>Registration</h1>
                <div className='mb-5'>
                    <label className='block mb-3 text-white'>Name:</label>
                    <input className='w-full rounded-md px-3 py-2 outline-none'
                    value={name}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    type='text'
                    placeholder='Enter your name'
                    />
                </div>

                <div className='mb-5'>
                    <label className='block mb-3 text-white'>Email:</label>
                    <input className='w-full rounded-md px-3 py-2 outline-none'
                    value={email}
                    type='email'
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                    />
                </div>

                <div className='mb-5'>
                    <label className='block mb-3 text-white'>Password:</label>
                    <input className='w-full rounded-md px-3 py-2 outline-none'
                    value={password}
                    type='password'
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    placeholder='Enter your password'
                    />
                </div>

                <div className=''>
                    <button className='bg-green-500 px-10 py-3 rounded-md text-white w-full'>Registration</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Registration