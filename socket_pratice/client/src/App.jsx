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

import React, { useEffect } from "react";
import io from "socket.io-client";

export default function App() {
  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("hello", (arg) => {
      console.log(arg);
    });

    socket.on("hello1", (arg1, arg2, arg3) => {
      console.log(arg1, arg2, arg3);
    });

    socket.on('request', (arg1, arg2, arg3) => {
      console.log(arg1)
      console.log(arg2)
      useCallback({
        status: 'ok'
      })
    }
    );
  });
  return <div>App</div>;
}
