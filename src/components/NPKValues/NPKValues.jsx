import React from 'react';

const NPKValues = () => {
    // Hardcoded NPK values for each district
    const npkData = {
        'District 1': { N: 30, P: 20, K: 10 },
        'District 2': { N: 25, P: 15, K: 20 },
        // Add more districts as needed
    };

    return (
        <div>
            <h2 className="text-2xl mb-2">NPK Values</h2>
            <ul>
                {Object.entries(npkData).map(([district, values]) => (
                    <li key={district} className="mb-2">
                        <strong>{district}</strong>: N: {values.N}, P: {values.P}, K: {values.K}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NPKValues;
