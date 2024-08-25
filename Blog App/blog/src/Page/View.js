import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlog } from '../redux/slice/blogSlice'
import { Spin, Alert, Card } from 'antd';

function View() {
  const [blog, setBlog] = useState([])

  const dispatch = useDispatch()

  const { isLoading, isError, data } = useSelector((state) => state.blog)

  useEffect(() => {
    dispatch(getAllBlog());
    console.log("data", data);
    
  }, [dispatch]);

  // if (isLoading) {
  //   return <Spin />;
  // }

  // if (isError) {
  //   return <Alert message="Error" type="error" />;
  // }

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-3xl mb-4 font-bold">View Blogs</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data && data.length > 0 ? (
        data.map((blog) => (
          <Card key={blog._id} title={blog.title} className="w-full">
            <p>{blog.content}</p>
            {blog.image && <img src={blog.image} alt={blog.title} className="mt-2 w-full" />}
          </Card>
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  </div>
  )
}

export default View