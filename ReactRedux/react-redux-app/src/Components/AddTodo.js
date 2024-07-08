import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { addToDos } from '../Features/ToDo/ToDoSlice'

function AddToDo() {
    const [input, setInput] = useState('')
    const dispatch = useDispatch()

    const addToHandler = (e) => {
        e.preventDefault()
        dispatch(addToDos(input))
        // clean form
        setInput('')
    }
  return (
    <div>addToDo</div>
  )
}

export default AddToDo