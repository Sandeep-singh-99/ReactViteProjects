
import { useState, useCallback, useEffect, useRef } from 'react'


function App() {

  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [char, setChar] = useState(false)
  const[password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (number) str += "0123456789"
    if (char) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let character = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(character)
    }

    setPassword(pass)

  }, [length, number, char, setPassword])

  const copyPasswordToClipBoard = useCallback( () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect( () => {
    passwordGenerator()
  },[length, number, char, passwordGenerator])

  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input 
        type="text"
        value={password}
        className="outline-none w-full py-1 px-3"
        placeholder="password"
        readOnly
        ref={passwordRef}>
        </input>
        <button onClick={copyPasswordToClipBoard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type='range'
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}>
          </input>
          <label>length {length}</label>
        </div>
        <div className='flex items-center gap-x-4'>
          <input
          type='checkbox'
          defaultChecked={number}
          id='numberInput'
          onChange={() => {
            setNumber((prev) => !prev)
          }}></input>
          <label htmlFor='numberInput'>Number</label>
        </div>
        <div className='flex items-center gap-x-4'>
          <input
          type='checkbox'
          defaultChecked={char}
          id='characterInput'
          onChange={() => {
            setChar((prev) => !prev)
          }}></input>
          <label htmlFor='characterInput'>Character</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
