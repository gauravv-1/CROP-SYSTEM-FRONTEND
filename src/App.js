// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';  // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Recommendation from './components/Recommendation/Recommendation';
import Signup from './components/Login/Signup';
import AboutPage from './pages/AboutPage';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                {/* ToastContainer should only be added here once */}
                <ToastContainer 
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/recommendation" element={<Recommendation />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
