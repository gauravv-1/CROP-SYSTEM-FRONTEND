import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { login } from '../../features/auth/authSlice';

import logo3 from '../../assests/smart-agriculture-iot-with-hand-planting-tree-background.jpg';
import background4 from '../../assests/bg4.jpg';
import { toast } from 'react-toastify'; 


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { loading, error } = useSelector((state) => state.auth);

    const formValues = {
        email: username,
        password: password
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username && password) {
            try {
                const resultAction = await dispatch(login(formValues));
                if (login.fulfilled.match(resultAction)) {
                    toast.success('Login successful!');
                    console.log(resultAction.payload);
                    navigate('/dashboard'); // Redirect on successful login
                }
            } catch (err) {
                toast.error(err);
                console.error("Login failed:", err);
            }
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${background4})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="relative bg-white bg-opacity-90 rounded-lg shadow-lg p-8 max-w-sm w-full z-10 m-4">
                <h2 className="text-2xl font-semibold text-center text-green-800">Farmer Login</h2>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4 flex items-center border border-gray-300 rounded-md">
                        <FaUser className="ml-2 mr-2 text-gray-600" />
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-inherit"
                        />
                    </div>
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
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                {error && <p className="mt-4 text-center text-red-600">{error}</p>}
                <p className="mt-4 text-center text-gray-600">
                    Don't have an account? <a href="/signup" className="text-green-500 hover:underline">Sign Up</a>
                </p>
                <div className="mt-6 text-center text-gray-600">
                    <img src={logo3} alt="Farm Logo" className="w-full h-[150px]" />
                </div>
            </div>
        </div>
    );
};

export default Login;
