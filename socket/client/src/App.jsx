// src/App.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connect to your server
const socket = io('http://localhost:5000');

function App() {
  const [username, setUsername] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [toUserId, setToUserId] = useState('');
  const [privateMessage, setPrivateMessage] = useState('');
  const [roomMessage, setRoomMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socketId, setSocketId] = useState('');

  useEffect(() => {
    // Socket event listeners
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('registered', (data) => {
      setIsRegistered(true);
      setSocketId(data.id);
      setOnlineUsers(data.onlineUsers);
    });

    socket.on('user-connected', (user) => {
      setOnlineUsers(prev => [...prev, [user.id, user.username]]);
    });

    socket.on('user-disconnected', (user) => {
      setOnlineUsers(prev => prev.filter(([id]) => id !== user.id));
    });

    socket.on('joined-room', (roomId) => {
      setCurrentRoom(roomId);
    });

    socket.on('private-message', (data) => {
      setMessages(prev => [...prev, `Private from ${data.sender}: ${data.message}`]);
    });

    socket.on('room-message', (data) => {
      const prefix = data.system ? 'System' : data.sender;
      setMessages(prev => [...prev, `${prefix}: ${data.message}`]);
    });

    // Cleanup
    return () => {
      socket.off('connect');
      socket.off('registered');
      socket.off('user-connected');
      socket.off('user-disconnected');
      socket.off('joined-room');
      socket.off('private-message');
      socket.off('room-message');
    };
  }, []);

  const handleRegister = () => {
    if (username) {
      socket.emit('register', username);
    }
  };

  const handleJoinRoom = () => {
    if (roomId) {
      socket.emit('join-room', roomId);
    }
  };

  const handleSendPrivateMessage = () => {
    if (toUserId && privateMessage) {
      socket.emit('private-message', { toUserId, message: privateMessage });
      setPrivateMessage('');
    }
  };

  const handleSendRoomMessage = () => {
    if (currentRoom && roomMessage) {
      socket.emit('room-message', { roomId: currentRoom, message: roomMessage });
      setRoomMessage('');
    }
  };

  return (
    <div className="App">
      {!isRegistered ? (
        <div className="register">
          <h2>Register</h2>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
          <button onClick={handleRegister}>Register</button>
        </div>
      ) : (
        <div className="chat-container">
          <div className="sidebar">
            <h3>Online Users</h3>
            <ul>
              {onlineUsers.map(([id, name]) => (
                <li key={id}>{name} ({id})</li>
              ))}
            </ul>
            <div className="room-section">
              <h3>Join Room</h3>
              <input
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Room ID"
              />
              <button onClick={handleJoinRoom}>Join</button>
              {currentRoom && <p>Current Room: {currentRoom}</p>}
            </div>
          </div>

          <div className="chat-section">
            <div className="private-chat">
              <h3>Private Chat (Your ID: {socketId})</h3>
              <input
                value={toUserId}
                onChange={(e) => setToUserId(e.target.value)}
                placeholder="Recipient ID"
              />
              <input
                value={privateMessage}
                onChange={(e) => setPrivateMessage(e.target.value)}
                placeholder="Private message"
              />
              <button onClick={handleSendPrivateMessage}>Send Private</button>
            </div>

            <div className="room-chat">
              <h3>Room Chat</h3>
              <input
                value={roomMessage}
                onChange={(e) => setRoomMessage(e.target.value)}
                placeholder="Room message"
                disabled={!currentRoom}
              />
              <button 
                onClick={handleSendRoomMessage}
                disabled={!currentRoom}
              >
                Send to Room
              </button>
            </div>

            <div className="messages">
              <h3>Messages</h3>
              <ul>
                {messages.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;