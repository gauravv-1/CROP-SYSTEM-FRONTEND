import React, { useEffect, useState } from 'react';

const NPKData = ({ latitude, longitude }) => {
    const [npkValues, setNpkValues] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNPKData = async (latitude, longitude) => {
        try {
            const response = await fetch(`https://rest.soilgrids.org/search?lon=${longitude}&lat=${latitude}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setNpkValues(data); // Set the fetched data to state
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNPKData(latitude, longitude);
    }, [latitude, longitude]);

    if (loading) {
        return <div>Loading NPK data...</div>;
    }

    if (error) {
        return <div>Error fetching data: {error}</div>;
    }

    return (
        <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">NPK Values</h2>
            {npkValues && npkValues.results && npkValues.results.length > 0 ? (
                <div className="space-y-2">
                    <h3 className="text-xl">NPK Data for the Region</h3>
                    <p>Nitrogen (N): {npkValues.results[0].properties.nitrogen}</p>
                    <p>Phosphorus (P): {npkValues.results[0].properties.phosphorus}</p>
                    <p>Potassium (K): {npkValues.results[0].properties.potassium}</p>
                </div>
            ) : (
                <p>No NPK data available for this location.</p>
            )}
        </div>
    );
};

export default NPKData;
