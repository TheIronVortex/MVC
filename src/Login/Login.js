// At the top of your file, add the import for the Dutch language file
import React, { useEffect, useState, createContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import '../style/login.scss';
import { useNavigate } from 'react-router-dom';

// Import your Firebase configuration
import firebaseConfig from '../firebase/config/firebaseConfig';

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

export const UserContext = createContext(null);

const Login = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // ... other setup remains the same

        const uiConfig = {
            signInSuccessUrl: '/home',
            signInOptions: [
                // GoogleAuthProvider.PROVIDER_ID,
                EmailAuthProvider.PROVIDER_ID
            ],
            tosUrl: '<your-tos-url>',
            privacyPolicyUrl: '<your-privacy-policy-url>',
            callbacks: {
                signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                    // This function is called when a user successfully signs in.
                    // You can access the user's information in authResult.user
                    setUser(authResult.user);
                    navigate('/home');
                    return false; // Prevents redirect, as we're handling it manually.x
                },
            }
        };

        // Check if an existing instance of FirebaseUI is available
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

        // Start the FirebaseUI Auth interface
        ui.start('#firebaseui-auth-container', uiConfig);
    }, []);

    return (
        <UserContext.Provider value={user}>
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="card mt-4">
                    <div className="card-header">Login</div>
                    <div className="card-body">
                        <div id="firebaseui-auth-container" lang="nl"></div>
                    </div>
                </div>
            </div>
        </UserContext.Provider>
    );
};

export default Login;
