import EditTopicForm from '@/app/components/EditTopicForm'
import React from 'react'

const getTopicById = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch topic");
      }
  
      const data = await res.json();
    
      // Ensure that data has the structure we expect
      return data && data.topic ? data : { topic: null };
    } catch (error) {
      console.log(error);
    }
  };

export default async function EditTopic({params}) {
    const {id} = params
    
    const result = await getTopicById(id);

    // Check if result and topic are valid before destructuring
    if (!result || !result.topic) {
      return <p>Failed to load topic. Please try again later.</p>;
    }
  
    const { title, description } = result.topic;
    
  return (
    <EditTopicForm id={id} title={title} description={description}/>
  )
}
