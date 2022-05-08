import React, { useState, useEffect } from 'react';
import authService from '../../../services/Auth';
import { useNavigate } from 'react-router-dom'; // import do hook


function Logout() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    let navigate = useNavigate();


    useEffect(() => {
        // subscribe to home component messages
        authService.logout();
        navigate('/login');
    }, []);
    return (<></>);
}

export default Logout;