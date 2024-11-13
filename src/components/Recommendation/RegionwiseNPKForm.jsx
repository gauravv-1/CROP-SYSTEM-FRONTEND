// src/components/Recommendation/RegionwiseNPKForm.jsx
import React, { useState } from 'react';
import { npkValues } from '../../data/npkData';

const RegionwiseNPKForm = ({ setSelectedDistrict }) => {
    const [selectedDistrict, setLocalSelectedDistrict] = useState('');
    const [error, setError] = useState('');

    const handleDistrictChange = (e) => {
        setLocalSelectedDistrict(e.target.value);
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedDistrict) {
            setError('Please select a district before proceeding.');
            return;
        }

        // Set the selected district and reset the local state
        setSelectedDistrict(selectedDistrict);
        setLocalSelectedDistrict(''); // Clear the local state after selection
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[500px]">
            <h1 className="text-3xl font-bold mb-6 text-green-800">Farmer Dashboard</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg sm:max-w-md">
                <div className="mb-4">
                    <label htmlFor="district" className="block text-gray-700 font-medium">Select District</label>
                    <select
                        id="district"
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                >
                    Get Fertilizer Recommendation
                </button>
            </form>
        </div>
    );
};

export default RegionwiseNPKForm;
