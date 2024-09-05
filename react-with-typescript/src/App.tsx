import React, { useEffect, useState } from "react";
import axios from "axios";

interface ToDo {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

const App: React.FC = () => {
  const [data, setData] = useState<ToDo[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get<ToDo[]>(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setData(response.data);
      alert("data fetched successfully");
    } catch (error) {
      alert(error);
    }
  };


  useEffect(() => {
    fetchData();
  },[]);


  return (
    <>
      <div className="flex justify-center items-center mt-10">
        <h2 className="text-3xl font-semibold">Fetch API</h2>
      </div>

      <div className="p-10">
        {
          data.map((todos) => (
            <li key={todos.id}>
              {todos.userId}
              {todos.title}
            </li>
          ))
        }
      </div>
    </>
  );
}

export default App;
