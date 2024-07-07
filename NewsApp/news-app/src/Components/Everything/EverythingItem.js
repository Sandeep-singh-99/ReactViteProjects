import React from 'react'

function NewItem({article}) {
  return (
    <div className='p-20 '>
       <div className='shadow-lg rounded-lg bg-gray-200 px-5 pt-10'>
       <h1 className='text-4xl'>{article.title}</h1>
        <p className='text-xl'>{article.description}</p>
        <img className='h-[80%]' src={article.urlToImage} alt='not showing'/>
        <p className=''>{article.content}</p>
       </div>
    </div>
  )
}

export default NewItem