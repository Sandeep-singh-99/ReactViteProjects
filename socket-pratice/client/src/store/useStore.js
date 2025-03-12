import { create } from 'zustand';
import io from 'socket.io-client';

const socket = io('http://localhost:5000', {
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    transports: ['websocket', 'polling'] // Fallback to polling if WebSocket fails
});

const useChatStore = create((set, get) => ({
    username: '',
    socketId: '',
    isRegistered: false,
    onlineUsers: [],
    currentRoom: null,
    roomId: '',
    toUserId: '',
    privateMessage: '',
    roomMessage: '',
    messages: [],

    setUsername: (username) => set({ username }),
    setRoomId: (roomId) => set({ roomId }),
    setToUserId: (toUserId) => set({ toUserId }),
    setPrivateMessage: (privateMessage) => set({ privateMessage }),
    setRoomMessage: (roomMessage) => set({ roomMessage }),

    initializeSocket: (username) => {
        socket.on('connect', () => {
            set({ socketId: socket.id });
        });

        socket.on('registered', (data) => {
            set({
                socketId: data.socketId,
                isRegistered: true,
                onlineUsers: data.onlineUsers.map(([id, name]) => ({ id, username: name }))
            });
        });

        socket.on('user-connected', (user) => {
            set(state => ({
                onlineUsers: [...state.onlineUsers, user]
            }));
        });

        socket.on('user-disconnected', (user) => {
            set(state => ({
                onlineUsers: state.onlineUsers.filter(u => u.id !== user.id)
            }));
        });

        socket.on('joined-room', (roomId) => {
            set({ currentRoom: roomId });
        });

        socket.on('private-message', (data) => {
            set(state => ({
                messages: [...state.messages, {
                    type: 'private',
                    from: data.sender,
                    content: data.message,
                    timestamp: new Date()
                }]
            }));
        });

        socket.on('room-message', (data) => {
            set(state => ({
                messages: [...state.messages, {
                    type: data.system ? 'system' : 'room',
                    from: data.system ? 'System' : data.sender,
                    content: data.message,
                    timestamp: new Date()
                }]
            }));
        });

        socket.emit('register', username);
    },

    joinRoom: () => {
        const { roomId } = get();
        if (roomId) socket.emit('join-room', roomId);
    },

    sendPrivateMessage: () => {
        const { toUserId, privateMessage } = get();
        if (toUserId && privateMessage) {
            socket.emit('private-message', { toUserId, message: privateMessage });
            set({ privateMessage: '' });
        }
    },

    sendRoomMessage: () => {
        const { currentRoom, roomMessage } = get();
        if (currentRoom && roomMessage) {
            socket.emit('room-message', { roomId: currentRoom, message: roomMessage });
            set({ roomMessage: '' });
        }
    },

    disconnect: () => {
        socket.disconnect();
        set({
            isRegistered: false,
            socketId: '',
            onlineUsers: [],
            currentRoom: null,
            messages: []
        });
    }
}));

export default useChatStore;