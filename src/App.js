// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Ensure this import is correct
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard'; // Import the Dashboard component
import Recommendation from './components/Recommendation/Recommendation';
import Signup from './components/Login/Signup';
import AboutPage from './pages/AboutPage';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route path="/dashboard" element={<Dashboard/>} />
                    <Route path="/recommendation" element={<Recommendation />} />
                    <Route path="/about" element={<AboutPage />} />
                    {/* Add more routes as needed */}
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
