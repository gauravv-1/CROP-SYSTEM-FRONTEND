import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import background1 from '../../assests/green-tea-bud-leaves-green-tea-plantations-morning.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobile] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (firstName && lastName && email && mobileNo && password) {
            const formValues = { firstName, lastName, email, mobileNo, password };

            const resultAction = await dispatch(signup(formValues));

            if (signup.fulfilled.match(resultAction)) {
                console.log(resultAction.payload);
                toast.success('Signup successful!')
                console.log("Signup successful");
                navigate('/'); // Redirect on successful signup
            } else {
                console.error("Signup failed:", resultAction.error.message);
            }
        }
    };

    return (
        <div
            className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${background1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
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
                            value={mobileNo}
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
                        {loading ? "Signing up..." : "Signup"}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Already have an account? <a href="/" className="text-green-500 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
