
import './App.css'

import {useDispatch, useSelector} from 'react-redux'
import {fetchToDo} from './redux/slice/todoSlice'
import { useEffect, useMemo } from 'react'

function App() {
  const dispatch = useDispatch()
  const {data, isLoading, isError} = useSelector(state => state.todo)

  console.log("List", data);
  

  useEffect(() => {
    dispatch(fetchToDo())
  },[dispatch])

  if (isLoading) {
    <h1>Loading...</h1>
  }

  if (isError) {
    return <h1>Error loading data</h1>
  }

  return (
    <>
    <div >ToDo App</div>
    <div>
      {data && data.map((e) => <li key={e.id}>{e.url}</li>)}
    </div>
    </>
  )
}

export default App
