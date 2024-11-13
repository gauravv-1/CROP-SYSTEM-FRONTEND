import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import RegionwiseNPKForm from '../Recommendation/RegionwiseNPKForm';
import Recommendation from '../Recommendation/Recommendation';
import NPKMap from '../Sidebar/HealthCheck';
import AboutPage from '../../pages/AboutPage';
import UserProfile from '../Sidebar/UserProfile';
import HealthCheck from '../Sidebar/HealthCheck';

const Dashboard = () => {
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [activeComponent, setActiveComponent] = useState('npkMap'); // Default component

    // Handle district selection from the sidebar
    const handleDistrictSelection = (district) => {
        setSelectedDistrict(district);
        setActiveComponent('recommendation'); // Show recommendation after selecting district
    };

    // Handle component switching based on sidebar selection
    const handleSidebarClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <>
            <Navbar />
            <div className="flex h-[calc(100vh-72px)]">
                <Sidebar 
                    onSidebarClick={handleSidebarClick}  // Pass the sidebar click handler for component switching
                    selected={activeComponent}  // Pass the active component state to highlight the selected sidebar item
                />
                <div className="flex-1 bg-gray-100 h-full overflow-y-auto">
                    {/* Conditional rendering based on the active component */}
                    {activeComponent === 'npkMap' ? (
                        <HealthCheck />
                    ) : activeComponent === 'regionwiseNPK' ? (
                        <RegionwiseNPKForm setSelectedDistrict={handleDistrictSelection} />
                    ) : activeComponent === 'recommendation' && selectedDistrict ? (
                        <Recommendation selectedDistrict={selectedDistrict} />
                    ) : activeComponent === 'aboutProject' ? (
                        <AboutPage />
                    ) : activeComponent === 'profile' ? (
                        <UserProfile />
                    ) : (
                        <div className="text-center text-gray-500">Please select a valid option.</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
