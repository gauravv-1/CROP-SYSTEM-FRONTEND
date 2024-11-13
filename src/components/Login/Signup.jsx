// src/components/Signup/Signup.jsx

import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa'; // Importing icons
// import logo3 from '../../assests/smart-agriculture-iot-with-hand-planting-tree-background.jpg';
import background1 from '../../assests/green-tea-bud-leaves-green-tea-plantations-morning.jpg'; // or any other background image
import { API_URL } from '../../config/api';  // Adjust API URL based on your setup
import axios from 'axios';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');

    const formValues = {
        firstName,
        lastName,
        email,
        mobile,
        password
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (firstName && lastName && email && mobile && password) {
            try {
                const res = await axios.post(`${API_URL}/auth/signup`, formValues);  // Adjust API endpoint
                console.log("Response: ", res);
                // Redirect to login or dashboard on successful signup
            } catch (error) {
                console.error("Error during signup:", error);
            }
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${background1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black opacity-30"></div> {/* Overlay */}
            <div className="relative bg-white bg-opacity-90 rounded-lg shadow-lg p-8 max-w-sm w-full z-10 m-2">
                <h2 className="text-2xl font-semibold text-center text-green-800">Farmer Signup</h2>
                <form onSubmit={handleSubmit} className="mt-6">
                    {/* First Name */}
                    <div className="mb-4 flex items-center border border-gray-300 rounded-md">
                        <FaUser className="ml-2 mr-2 text-gray-600" />
                        <input
                            type="text"
                            id="firstName"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-inherit"
                        />
                    </div>
                    {/* Last Name */}
                    <div className="mb-4 flex items-center border border-gray-300 rounded-md">
                        <FaUser className="ml-2 mr-2 text-gray-600" />
                        <input
                            type="text"
                            id="lastName"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-inherit"
                        />
                    </div>
                    {/* Email */}
                    <div className="mb-4 flex items-center border border-gray-300 rounded-md">
                        <FaEnvelope className="ml-2 mr-2 text-gray-600" />
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-inherit"
                        />
                    </div>
                    {/* Mobile Number */}
                    <div className="mb-4 flex items-center border border-gray-300 rounded-md">
                        <FaPhone className="ml-2 mr-2 text-gray-600" />
                        <input
                            type="text"
                            id="mobile"
                            placeholder="Enter your mobile number"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-inherit"
                        />
                    </div>
                    {/* Password */}
                    <div className="mb-4 flex items-center border border-gray-300 rounded-md">
                        <FaLock className="ml-2 mr-2 text-gray-600" />
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-inherit"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        Signup
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Already have an account? <a href="/" className="text-green-500 hover:underline">Login</a>
                </p>
                {/* <div className="mt-6 text-center text-gray-600">
                    <img src={logo3} alt="Farm Logo" className="w-full h-[150px]" />
                </div> */}
            </div>
        </div>
    );
};

export default Signup;
