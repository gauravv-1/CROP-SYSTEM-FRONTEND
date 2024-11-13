import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { npkValues } from '../../data/npkData';

const CropDetails = () => {
    const navigate = useNavigate();
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [error, setError] = useState(''); // State for handling form validation
    const [showCropDetails, setShowCropDetails] = useState(false); // State to manage crop details visibility

    // Handle district selection
    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setError(''); // Clear any previous error when a district is selected
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate district selection
        if (!selectedDistrict) {
            setError('Please select a district before proceeding.');
            return;
        }

        // Navigate to the recommendation page with the selected district
        navigate('/recommendation', { state: { selectedDistrict } });
    };

    // Function to show crop details
    const handleCropDetailsClick = () => {
        setShowCropDetails(true);
    };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 flex-1">
                <h1 className="text-3xl font-bold mb-6">Farmer Dashboard</h1>

                {/* Display error message if no district is selected */}
                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* Show crop details form if the section is active */}
                {showCropDetails && (
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <div className="mb-4">
                            <label htmlFor="district" className="block text-gray-700">Select District</label>
                            <select
                                id="district"
                                value={selectedDistrict}
                                onChange={handleDistrictChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">--Select District--</option>
                                {Object.keys(npkValues).map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Get Fertilizer Recommendation
                        </button>
                    </form>
                )}
            </div>
  )
}

export default CropDetails