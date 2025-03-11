import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import io from 'socket.io-client'

//  const BASE_URL = import.meta.env.VITE_API_URL 

export const useAuthStore = create((set, get) =>({
    authUser: null,
    isSignUp: false,
    isLoggedIn: false,
    isCheckingAuth: true,
    isUpdatingProfileImage: false,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/check-auth')
            set({ authUser: response.data })
            get().connectSocket()
        } catch (error) {
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSignUp: true })
        try {
            const response = await axiosInstance.post('/auth/signup', data)
            set({ authUser: response.data })
            toast.success('Account created successfully')
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isSignUp: false })
        }
    },

    login: async (data) => {
        set({ isLoggedIn: true })
        try {
            const response = await axiosInstance.post('/auth/login', data)
            set({ authUser: response.data })
            toast.success('Logged in successfully')
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isLoggedIn: false})
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout')
            set({ authUser: null })
            toast.success('Logged out successfully')
            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    updateProfileImage: async (data) => {
        set({ isUpdatingProfileImage: true })
        try {
            const response = await axiosInstance.put('/auth/update-profile', data)
            set({ authUser: response.data })
            toast.success('Profile image updated successfully')
        } catch (error) {
            console.log("error", error);
            toast.error(error.response.data.message)
        } finally {
            set({ isUpdatingProfileImage: false })
        }
    },

    connectSocket: async () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return

        console.log("Connecting to websocket ..............");
    
        // https://chat-app-7wb6.onrender.com

        const socket = io("http://localhost:5000", {
            query: {
                userId: authUser._id,
                reconnection: true,  
                reconnectionAttempts: 5,
                reconnectionDelay: 3000,
            },
        })

        socket.connect()

        set({ socket: socket})

        socket.on('getOnlineUsers', (userIds) => {
            set({ onlineUsers: userIds })
        })
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect()
    }
}))