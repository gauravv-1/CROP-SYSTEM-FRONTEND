import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function SoilHealthComponent({ soilHealthData, onBack }) {
  // Destructure values with fallback in case soilHealthData is null or undefined
  const { soilHealth = "Unknown", recommendations = {}, nutrientPercentage = {} } = soilHealthData || {};

  // Round the nutrient percentages to 2 decimal places
  const roundPercentage = (value) => {
    return value ? (Math.round(value * 100) / 100).toFixed(2) : "0.00"; // Limiting to 2 decimals
  };

  // Map over the nutrientPercentage object to get the nutrient names and values
  const deficiencyKeys = Object.keys(nutrientPercentage);

  const getColor = (percentage) => {
    if (percentage >= 80) {
      return "#4CAF50"; // Green for good health (80% or above)
    } else if (percentage >= 50) {
      return "#ffc107"; // Yellow for moderate deficiency (50% to 79%)
    } else {
      return "#f44336"; // Red for high deficiency (below 50%)
    }
  };

  // Helper to handle recommendations formatting
  const formatRecommendation = (recommendation) => {
    const regex = /\(e\.g\.,\s*(.*?)\)/;  // Match everything inside (e.g., Superphosphate)
    const match = recommendation.match(regex);
    if (match) {
      const fertilizer = match[1];  // Extract fertilizer name
      const formattedRecommendation = recommendation.replace(regex, ""); // Remove the fertilizer suggestion from the original string
      return (
        <div>
          <span>{formattedRecommendation}</span>
          <span className="text-blue-600 font-semibold">{fertilizer}</span> {/* Highlighted fertilizer */}
        </div>
      );
    }
    return recommendation; // If no fertilizer in parentheses, return as is
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] bg-gray-100 text-center space-y-6 m-2">
      <h2 className="text-2xl font-semibold">Soil Health Analysis</h2>

      <div className="text-xl font-bold text-gray-800">
        Soil Health: <span className="text-red-500">{soilHealth}</span>
      </div>

      {/* Container for the progress bar section and recommendations */}
      <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-12  items-center">
        
        {/* Progress bar section */}
        <div className="flex-1 m-4 border-2  bg-white border-black shadow-lg p-4">
        <h3 className="flex justify-start text-lg font-semibold text-gray-800 mb-4">Nutrients Levels:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {deficiencyKeys.length > 0 ? (
              deficiencyKeys.map((nutrient) => (
                <div key={nutrient} className="flex flex-col items-center mb-8 sm:mb-4">
                  <div className="w-[140px] h-[140px] sm:w-26 sm:h-26 md:w-37 md:h-37">
                    <CircularProgressbar
                      value={roundPercentage(nutrientPercentage[nutrient])}
                      text={`${roundPercentage(nutrientPercentage[nutrient])}%`}
                      styles={buildStyles({
                        textSize: "16px",
                        pathColor: getColor(roundPercentage(nutrientPercentage[nutrient])), // Dynamic color based on percentage
                        textColor: "#333",
                        trailColor: "#eee",
                      })}
                    />
                  </div>
                  <p className="mt-2 font-medium text-gray-700">{nutrient}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-700">No deficiency data available.</p>
            )}
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="flex-1">
          <div className="text-left p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommendations:</h3>

            {Object.entries(recommendations).length > 0 ? (
              Object.entries(recommendations).map(([nutrient, advice]) => (
                <div key={nutrient} className="p-4 border-l-4 bg-white border-blue-500 shadow-lg space-y-2">
                  <h4 className="text-xl font-semibold text-gray-800">{nutrient}:</h4>
                  <div className="text-gray-700">{formatRecommendation(advice)}</div>
                </div>
              ))
            ) : (
              <p className="text-gray-700">No recommendations available.</p>
            )}
          </div>
        </div>

      </div>

      <button
        onClick={onBack}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Back to NPK Composition
      </button>
    </div>
  );
}

export default SoilHealthComponent;
