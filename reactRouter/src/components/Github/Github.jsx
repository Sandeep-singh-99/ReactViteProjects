import React, { useEffect, useState } from 'react'

function Github() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('https:api.github.com/users/sandeep-coder-app')
        .then(response => response.json())
        .then(data => {
            setData(data)
        })
    },[setData])


  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>
        Github Repo: {data.public_repos}
    </div>
  )
}

export default Github