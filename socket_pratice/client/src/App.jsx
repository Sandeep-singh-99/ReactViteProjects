// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// export default function App() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const socket = io("http://localhost:3000");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       socket.emit('chat message', message);
//       setMessage("");
//     }
//   };

//   useEffect(() => {
//     socket.on('chat message', (msg) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     return () => {
//       socket.off('chat message');
//     };
//   }, []);

//   return (
//     <>
//       <ul id="messages">
//         {messages.map((msg, index) => (
//           <li key={index}>{msg}</li>
//         ))}
//       </ul>
//       <form id="form" onSubmit={handleSubmit}>
//         <input
//           id="input"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>
//     </>
//   );
// }

// import React, { useEffect } from "react";
// import io from "socket.io-client";

// export default function App() {
//   useEffect(() => {
//     const socket = io("http://localhost:3000");
//     socket.on("hello", (arg) => {
//       console.log(arg);
//     });

//     socket.on("hello1", (arg1, arg2, arg3) => {
//       console.log(arg1, arg2, arg3);
//     });

//     socket.on('request', (arg1, arg2, arg3) => {
//       console.log(arg1)
//       console.log(arg2)
//       useCallback({
//         status: 'ok'
//       })
//     }
//     );
//   });
//   return <div>App</div>;
// }



import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io("http://localhost:3000",{
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 10,
})

socket.on('error', (error) => {
  console.error("Error in socket", error)
})

export default function App() {
  const [message, setMessage] = useState("")
  const [allMessages, setAllMessages] = useState([])
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [data, setData] = useState([])

  const fetchData = async() => {
    try {
      const response = await fetch('http://localhost:3000/all-messages')
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error("Error in fetching data", error);
    }
  }

  useEffect(() => {
    socket.on('connection', () => {
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('one', (msg) => {
      console.log("one event", msg);
      setAllMessages((prevMessages) => [...prevMessages, msg])
  })

  fetchData()

  return () => {
    socket.off('one')
    socket.off('disconnect')
    socket.off('connection')
  }
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      socket.emit('one-to-one', message)
      setMessage("")
    }
  }


  return (
    <div className="chat-container">
    <div className="status">
      Status: {isConnected ? 'Connected' : 'Disconnected'}
    </div>
    <form onSubmit={handleSubmit} className="message-form">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
        // disabled={!isConnected}
      />
      <button type="submit" >
        Send
      </button>
    </form>

    <ul className="message-list">
      {allMessages.map((msg, index) => (
        <li key={index}>{msg.receiverId}</li>
      ))}
    </ul>

    <h1>Fetch Data with Database</h1>
    <div>
      {
        data.map((msg, index) => (
          <li key={index}>{msg.receiverId}</li>
        ))
      }
    </div>
  </div>
  )
}
