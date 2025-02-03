'use client'
import {FormEvent, useState} from "react";

export default function AddForm() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const res = await fetch("/api/todos", {
            method: "POST",
            body: JSON.stringify({title, description}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        console.log(data)
    }
    return (
        <div className={"flex justify-center items-center h-screen"}>
            <div className={"min-w-96  bg-gray-800 p-4 rounded"}>
                <h1 className={"text-white text-3xl font-semibold underline text-center"}>ToDo Form</h1>

                <form className={"mt-6"} onSubmit={handleSubmit}>
                    <div className={"mb-3"}>
                        <label className={"block mb-1"}>Title: </label>
                        <input placeholder={"Enter title"} value={title} onChange={(e) => setTitle(e.target.value)}
                               className={"w-full px-2 py-1 outline-none text-gray-600"}/>
                    </div>

                    <div className={"mb-3"}>
                        <label className={"block mb-1"}>Description: </label>
                        <input placeholder={"Enter description"} value={description}
                               onChange={(e) => setDescription(e.target.value)}
                               className={"w-full px-2 py-1 outline-none text-gray-600"}/>
                    </div>

                    <button className={"bg-orange-600 w-full py-2 text-xl rounded font-semibold"}>Submit</button>
                </form>
            </div>
        </div>
    )
}
