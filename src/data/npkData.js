// src/data/npkData.js

// NPK values for different regions
export const npkValues = {
    "Pune": { N: 150, P: 60, K: 40 },
    "Nagpur": { N: 180, P: 70, K: 50 },
    "Aurangabad": { N: 160, P: 65, K: 45 },
    "Mumbai": { N: 170, P: 75, K: 55 },
    // Add more regions as needed
};

// Function to recommend crops based on NPK values
export const cropRecommendations = (N, P, K) => {
    const crops = [];

    // Adjust ranges to ensure they are distinct and relevant for each region
    if (N >= 150 && N < 200 && P >= 60 && P < 80 && K >= 40 && K < 60) {
        crops.push("Rice", "Wheat", "Millets");
    } 
    if (N >= 160 && P >= 65 && K >= 45) {  // Adjusted for Aurangabad's NPK
        crops.push("Sugarcane", "Cotton");
    }
    if (N >= 170 && P >= 70 && K >= 50) { // Adjusted for Nagpur's NPK
        crops.push("Soybean", "Corn");
    }
    if (N < 150 && P < 60) {
        crops.push("Legumes", "Pulses");
    }
    


    return crops.length > 0 ? crops : ["No suitable crops found for the given NPK values."];
};
