import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function DashBoard() {
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    axios.defaults.withCredentials = true

    useEffect(() => {
        // Request dashboard data, including token renewal if necessary
        axios.get('http://localhost:5000/dashboard')
        .then(res => {
            console.log(res);
            if (res.data.valid) { // If the token is valid, display the dashboard
                setMessage(res.data.message);
            } else {
                // If invalid, redirect to the login page
                navigate('/');
            }
        })
        .catch(err => {
            // Handle errors (e.g., invalid token, no refresh token)
            console.log(err);
            navigate('/'); // Redirect to login if there’s an error
        })
    }, [navigate]);

    return (
        <div>DashBoard {message}</div>
    );
}

export default DashBoard;
