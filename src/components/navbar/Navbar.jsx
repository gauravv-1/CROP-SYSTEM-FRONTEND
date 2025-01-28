import React, { useState } from "react";
import { Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // MUI menu icon
import CloseIcon from '@mui/icons-material/Close';

import logo2 from '../../assests/man_15240616.png';
import background1 from '../../assests/green-tea-bud-leaves-green-tea-plantations-morning.jpg';
import { useSelector } from "react-redux";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);

    return (
        <nav className="relative w-full h-30 bg-cover bg-center shadow-lg z-10"
            style={{ backgroundImage: `url(${background1})` }}>
            
            

            {/* Navbar Content */}
            <div className="relative container mx-auto px-4 md:px-8 flex justify-between items-center py-4 z-10">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img src={logo2} alt="Logo" className="h-10 w-24 object-contain" />
                    <span className="text-white font-semibold text-3xl" style={{ fontFamily: "'Poppins', sans-serif" }}></span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-10 text-lg font-medium text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <a href="/dashboard" className="hover:text-orange-400">Home</a>
                    <a href="#services" className="hover:text-orange-400">Services</a>
                    <a href="/about" className="hover:text-orange-400">About</a>
                    <a href="#contact" className="hover:text-orange-400">Contact</a>
                </div>

                {/* Profile Avatar */}
                <div className="hidden md:block">
                    <Avatar src="/path/to/your/avatar.jpg" alt="Profile">
                    {user?.firstName[0].toUpperCase()}
                    </Avatar>
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                        {isOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-gray-900 text-white w-full z-20">
                    <div className="flex flex-col items-center space-y-4 py-6 text-lg">
                        <a href="#home" className="hover:text-orange-400" onClick={() => setIsOpen(false)}>Home</a>
                        <a href="#services" className="hover:text-orange-400" onClick={() => setIsOpen(false)}>Services</a>
                        <a href="#about" className="hover:text-orange-400" onClick={() => setIsOpen(false)}>About</a>
                        <a href="#contact" className="hover:text-orange-400" onClick={() => setIsOpen(false)}>Contact</a>
                    </div>
                </div>
            )}
            <div className="absolute bottom-0 left-0 w-full h-[4px] bg-green-600"></div>
        </nav>
    );
};

export default Navbar;
