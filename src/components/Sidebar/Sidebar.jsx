import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { Home, Map, Agriculture, Info, Person } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Sidebar = ({ onSidebarClick }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [selected, setSelected] = useState('npkMap'); // Track the selected component

    // Handle component rendering and path switching
    const handleNavigation = (component) => {
        setSelected(component); // Update the selected component
        onSidebarClick(component); // Call the parent function to switch components 
    };

    // Handle window resizing to collapse the sidebar on smaller screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1050) {
                setIsOpen(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Dynamic classes for active menu items
    const liClasses = (component) =>
        component === selected
            ? "bg-orange-500 bg-opacity-80"  // Highlight selected item
            : "bg-gray-800 hover:bg-gray-600 hover:bg-opacity-60"; // Default hover effect

    return (
        <div className={`${isOpen ? (window.innerWidth < 1050 ? "w-full" : "w-1/5") : "w-16"} bg-gray-800 h-full p-5 pt-8 relative duration-300`}>
            {/* Toggle button for sidebar */}
            <div className={`flex flex-row ${!isOpen ? "justify-center" : "justify-end"}`}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-gray-700 p-2 rounded-full text-white hover:bg-gray-600"
                >
                    {isOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>

            {/* Sidebar content */}
            {isOpen && (
                <div className="flex flex-col items-center mb-10">
                    <Avatar
                        src="/path/to/your/profile.jpg"
                        alt="Profile"
                        sx={{ width: 60, height: 60 }}
                        className="mb-4"
                    />
                    <h2 className="text-white font-semibold text-xl">Farmer Dashboard</h2>
                </div>
            )}

            {/* Sidebar menu items */}
            <div className="flex justify-center mt-4">
                <ul className="space-y-4">
                    <li
                        className={`flex items-center space-x-3 text-white border-b border-gray-600 p-2 cursor-pointer ${liClasses('npkMap')}`}
                        onClick={() => handleNavigation('npkMap')}
                    >
                        <Home fontSize="large" />
                        {isOpen && <span className="text-lg">Start Soil Health Check</span>}
                    </li>
                    <li
                        className={`flex items-center space-x-3 text-white border-b border-gray-600 p-2 cursor-pointer ${liClasses('regionwiseNPK')}`}
                        onClick={() => handleNavigation('regionwiseNPK')}
                    >
                        <Agriculture fontSize="large" />
                        {isOpen && <span className="text-lg">Get Crop Recommendation</span>}
                    </li>

                    <li
                        className={`flex items-center space-x-3 text-white border-b border-gray-600 p-2 cursor-pointer ${liClasses('npkMap1')}`}
                        onClick={() => handleNavigation('npkMap1')}
                    >
                        <Map fontSize="large" />
                        {isOpen && <span className="text-lg">NPK Map</span>}
                    </li>

                    <li
                        className={`flex items-center space-x-3 text-white border-b border-gray-600 p-2 cursor-pointer ${liClasses('aboutProject')}`}
                        onClick={() => handleNavigation('aboutProject')}
                    >
                        <Info fontSize="large" />
                        {isOpen && <span className="text-lg">About Project</span>}
                    </li>
                    <li
                        className={`flex items-center space-x-3 text-white p-2 cursor-pointer ${liClasses('profile')}`}
                        onClick={() => handleNavigation('profile')}
                    >
                        <Person fontSize="large" />
                        {isOpen && <span className="text-lg">My Profile</span>}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
