import axios from "axios";
import React, { useEffect, useState } from "react";

interface PhotosList {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

const Photo: React.FC = () => {
    const [data, setData] = useState<PhotosList[]>([]);

    const fetchData = async () => {
        try {
            const response = await axios.get<PhotosList[]>('https://jsonplaceholder.typicode.com/photos')
            setData(response.data)
            alert('data fetched successfully')
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        fetchData()
    },[])


  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <h1 className="text-5xl font-semibold">Photo</h1>
      </div>

      <div className="p-10">
        {
            data.map((list) => (
                <div key={list.id}>
                    <img className="w-[200px] h-[200px]" src={list.url} alt=""/>
                    <p>{list.title}</p>
                    <img src={list.thumbnailUrl} alt="not showing"/>
                </div>
            ))
        }
      </div>
    </>
  );
};

export default Photo;
