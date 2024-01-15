import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home/Home';
import { UserContext } from './Login/Login.js';
import Logout from './Login/Logout'
import { ProtectedRoute } from './components/ProtectedRoute.js';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import firebaseConfig from './firebase/config/firebaseConfig'; // Make sure this path is correct
import { setupAuthStateListener } from './firebase/auth/authService'; // Import the auth service function
import Invullen from './Invul Opdracht/Invullen_Controller.js';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);
//add logout function

function Content() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Setup the authentication state listener
    const unsubscribeFromAuth = setupAuthStateListener(auth, db);

    // Cleanup the listener when the component unmounts
    return () => unsubscribeFromAuth();
  }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute element={Home} />
                        }
                    />
                    <Route
                        path="/logout"
                        element={
                            <ProtectedRoute element={Logout} />
                        }
                    />
                    <Route
                        path="/invullen"
                        element={
                            <ProtectedRoute element={Invullen} />
                        }
                    />
                    {/* Other routes can also be added here */}
                </Routes>
            </Router>
        </UserContext.Provider>
    );
}


export default Content;
