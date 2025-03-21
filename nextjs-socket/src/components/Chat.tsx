"use client"
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

let socket;

export default function Chat() {
    const [userId, setUserId] = useState('')
    const [recipientId, setRecipientId] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        fetch('/api/socket')

        socket = io()

        socket.on('connect', () => {
            console.log("Connected to server", socket.id);
        })

        socket.on('privateMessage', ({ from , message }) => {
            setMessages((prev) => [...prev, { from, message }])
        })

        return () => {
            socket.disconnect()
        }
    },[])

    const joinChat = () => {
        if (userId) {
            socket.emit('join', userId)
        }
    }

    const sendMessage = () => {
        if (recipientId && message) {
            socket.emit('privateMessage', { to: recipientId, message })
            setMessages((prev) => [...prev, { from: "me", message }])
            setMessage('')
        }
    }

  return (
    <div>
    <h1>One-to-One Chat</h1>
    <div>
      <input
        type="text"
        placeholder="Your User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={joinChat}>Join Chat</button>
    </div>
    <div>
      <input
        type="text"
        placeholder="Recipient User ID"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
      />
    </div>
    <div>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
    <div>
      <h3>Messages:</h3>
      {messages.map((msg, index) => (
        <p key={index}>
          {msg.from === "me" ? "You" : msg.from}: {msg.message}
        </p>
      ))}
    </div>
  </div>
  )
}
