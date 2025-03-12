import React, { useEffect } from 'react'
import io from 'socket.io-client'

export default function App() {
  const socket = io("http://localhost:5000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server", socket.id);
    })

    socket.on("welcome", (message) => {
      console.log(message);
    })

    return () => {
      socket.disconnect();
    }
  })
  return (
    <div>App</div>
  )
}
