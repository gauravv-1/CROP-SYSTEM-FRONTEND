import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function RadialBarChartComponent({ npkData, onStop }) {
  // Destructure the npkData, with fallback to 0 if data is not available
  const [nitrogen = 0, phosphorus = 0, potassium = 0] = npkData || [];

  // Ensure that values are within a valid range (0-100)
  const getValidValue = (value) => Math.min(100, Math.max(0, value));

  return (
    <div className="m-3 flex flex-col items-center justify-center min-h-[600px] bg-gray-100 text-center space-y-6 sm:m-10">
      <h2 className="text-2xl font-semibold mb-4">Soil NPK Composition</h2>

      <div className="flex flex-wrap justify-center sm:space-x-4 p-8 sm:p-14">
        {/* Nitrogen Radial Bar */}
        <div className="flex flex-col items-center mb-8 sm:mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <CircularProgressbar
            value={getValidValue(nitrogen)} // Ensure the value is within 0-100
            text={`${getValidValue(nitrogen)}%`}
            styles={buildStyles({
              textSize: "16px",
              pathColor: "#FF6384",
              textColor: "#333",
              trailColor: "#eee",
            })}
          />
          <p className="mt-2 font-medium text-gray-700">Nitrogen (N)</p>
        </div>

        {/* Phosphorus Radial Bar */}
        <div className="flex flex-col items-center mb-8 sm:mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <CircularProgressbar
            value={getValidValue(phosphorus)} // Ensure the value is within 0-100
            text={`${getValidValue(phosphorus)}%`}
            styles={buildStyles({
              textSize: "16px",
              pathColor: "#36A2EB",
              textColor: "#333",
              trailColor: "#eee",
            })}
          />
          <p className="mt-2 font-medium text-gray-700">Phosphorus (P)</p>
        </div>

        {/* Potassium Radial Bar */}
        <div className="flex flex-col items-center mb-8 sm:mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <CircularProgressbar
            value={getValidValue(potassium)} // Ensure the value is within 0-100
            text={`${getValidValue(potassium)}%`}
            styles={buildStyles({
              textSize: "16px",
              pathColor: "#FFCE56",
              textColor: "#333",
              trailColor: "#eee",
            })}
          />
          <p className="mt-2 font-medium text-gray-700">Potassium (K)</p>
        </div>
      </div>

      {/* Stop Button */}
      <button
        onClick={onStop}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Stop
      </button>
    </div>
  );
}

export default RadialBarChartComponent;
