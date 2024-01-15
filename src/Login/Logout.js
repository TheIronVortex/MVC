import React, { useContext, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './Login.js';

const Logout = () => {
    const navigate = useNavigate(); // Renamed from 'history' to 'navigate'
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        const auth = getAuth();
        signOut(auth).then(() => {
            setUser(null); // Update the user state to null
            navigate('/login'); // Use navigate function directly
        }).catch((error) => {
            console.error('Logout Error:', error);
        });
    }, [setUser, navigate]); // Update dependency array

    return (
        <div>Loading... (or any other indication of logging out)</div>
    );
};

export default Logout;
