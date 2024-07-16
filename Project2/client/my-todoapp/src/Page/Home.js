import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [addToDo, setAddToDo] = useState({
    content: "",
    date: ""
  })
  const [todo, setToDo] = useState([])


  useEffect(() => {
    axios.get("http://localhost:5000/api/getTodo")
    .then((res) => {
      setToDo(res.data)
    }).catch((error) => {
      console.log(error);
    })
  },[])



  // add todo data

  const {content, date} = addToDo

  const handleChange = (e) => {
    const value = e.target.value;
    setAddToDo({
      ...addToDo,
      [e.target.name] : value
    })
  }

  const handleSubmit = (e) => {
    const userData = { content, date: new Date()
    };
    try {
      axios.post("http://localhost:5000/api/addtodo", userData).then((response) => {
        console.log(response.status, response.data);
        setToDo([...todo, response.data]);
        setAddToDo({
          content: '',
          date: ''
        })
        alert("Successfully saved data")
      })
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <>
      <div className="bg-slate-950 h-fit">
        <div className="flex flex-col justify-center items-center pt-24">
          <h1 className="text-white text-5xl font-bold">ToDo App</h1>
          <a href="/hes" className="mb-10">
            <button className="text-white text-4xl border-purple-800 border-b-4 cursor-pointer pt-10">
              History Page
            </button>
          </a>
          <div className="flex pt-10 gap-10">
            <input
              type="text"
              name="content"
              value={addToDo.content}
              onChange={handleChange}
              className="w-[450px] px-5 rounded-md outline-none"
              placeholder="Enter todo...."
            />
            <button
            type="submit"
              className="text-white bg-indigo-950 px-10 py-5"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
          <div className="pb-10"></div>
          <div className="space-y-10">
                {todo.map(todos => (
                   <div className="">
                     <li key={todos._id} className="bg-white px-5 py-5">
                        <p className='text-black'>{todos.content}</p>
                    </li>
                   </div>
                ))}
            </div>
        </div>
      </div>
    </>
  );
}

export default Home;
