import React, { useEffect } from 'react';
import useChatStore from './store/useStore';

function App() {
    const {
        username,
        socketId,
        isRegistered,
        onlineUsers,
        currentRoom,
        roomId,
        toUserId,
        privateMessage,
        roomMessage,
        messages,
        setUsername,
        setRoomId,
        setToUserId,
        setPrivateMessage,
        setRoomMessage,
        initializeSocket,
        joinRoom,
        sendPrivateMessage,
        sendRoomMessage,
        disconnect
    } = useChatStore();

    useEffect(() => {
        return () => disconnect();
    }, [disconnect]);

    const handleRegister = () => {
        if (username) initializeSocket(username);
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
                        <h3>Online Users (Your ID: {socketId})</h3>
                        <ul>
                            {onlineUsers.map(user => (
                                <li key={user.id}>
                                    {user.username}
                                    <button onClick={() => setToUserId(user.id)}>Message</button>
                                </li>
                            ))}
                        </ul>
                        <div className="room-section">
                            <h3>Join Room</h3>
                            <input
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                                placeholder="Room ID"
                            />
                            <button onClick={joinRoom}>Join</button>
                            {currentRoom && <p>Current Room: {currentRoom}</p>}
                        </div>
                    </div>

                    <div className="chat-section">
                        <div className="private-chat">
                            <h3>Private Chat {toUserId && `to ${toUserId}`}</h3>
                            <input
                                value={privateMessage}
                                onChange={(e) => setPrivateMessage(e.target.value)}
                                placeholder="Private message"
                            />
                            <button onClick={sendPrivateMessage} disabled={!toUserId}>
                                Send Private
                            </button>
                        </div>

                        <div className="room-chat">
                            <h3>Room Chat</h3>
                            <input
                                value={roomMessage}
                                onChange={(e) => setRoomMessage(e.target.value)}
                                placeholder="Room message"
                                disabled={!currentRoom}
                            />
                            <button onClick={sendRoomMessage} disabled={!currentRoom}>
                                Send to Room
                            </button>
                        </div>

                        <div className="messages">
                            <h3>Messages</h3>
                            <ul>
                                {messages.map((msg, index) => (
                                    <li key={index}>
                                        [{msg.type}] {msg.from}: {msg.content}
                                    </li>
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