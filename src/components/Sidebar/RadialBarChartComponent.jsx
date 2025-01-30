import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SoilHealthComponent from "./SoilHealthComponent";

function RadialBarChartComponent({ npkData, onStop }) {
  const [recommendation, setRecommendation] = useState(null);//newPart
  const [soilHealthData, setSoilHealthData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [location, setLocation] = useState(null);
  // const [error, setError] = useState(null); 

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });

            console.log("Location: ",location);
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
      }
    };

    getLocation(); // Call the function to get the location
  }, []);

  // Default NPK values
  const defaultNPKValues = [40, 30, 30,15];
  const defaultAllDataUpdatedPart = [40,50,50,40.0,20,100,100];
  const [nitrogen = defaultNPKValues[0], phosphorus = defaultNPKValues[1], potassium = defaultNPKValues[2], ph=defaultNPKValues[3]] = npkData || defaultNPKValues;

  const getValidValue = (value) => Math.min(100, Math.max(0, value));
  
  // ---------------------------------************-----------------------------------
  const sendDataToAPI = async (sensorData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/predict", {
        Nitrogen: defaultAllDataUpdatedPart[0],
        Phosphorus: defaultAllDataUpdatedPart[1],
        Potassium: defaultAllDataUpdatedPart[2],
        Temperature: defaultAllDataUpdatedPart[3],
        Humidity: defaultAllDataUpdatedPart[4],
        Ph: defaultAllDataUpdatedPart[5],
        Rainfall: defaultAllDataUpdatedPart[6],
      });

      setRecommendation(response.data);
    } catch (err) {
      setError("Failed to get recommendation. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------*************************---------------------------------

  const handleCheckHealth = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log(nitrogen, phosphorus, potassium);
      const response = await axios.post("http://localhost:8081/api/soil-health", {
        nitrogen:10,
        phosphorus:20,
        potassium,
        ph: 6.2, // Placeholder pH value
      });
      console.log(response.data);
      setSoilHealthData(response.data);  // Updated to reflect new structure
    } catch (err) {
      setError("Failed to fetch soil health data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (location) {
    return (
      <div>
        Latitude: {location.latitude}, Longitude: {location.longitude}
      </div>
    );
  }

  if (soilHealthData) {
    return (
      <SoilHealthComponent
        soilHealthData={soilHealthData}
        onBack={() => setSoilHealthData(null)}
      />
    );
  }

  return (
    <div className="m-3 flex flex-col items-center justify-center min-h-[600px] bg-gray-100 text-center space-y-6 sm:m-10">
      <h2 className="text-2xl font-semibold">Soil NPK Composition</h2>

      <div className="flex flex-wrap justify-between sm:space-x-4 p-4 sm:p-14">
        {/* Nitrogen Radial Bar */}
        <div className="flex flex-col items-center mb-8 sm:mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <CircularProgressbar
            value={getValidValue(nitrogen)}
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
            value={getValidValue(phosphorus)}
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
            value={getValidValue(potassium)}
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
        {/* PH Radial Bar */}
        <div className="flex flex-col items-center mb-8 sm:mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <CircularProgressbar
            value={getValidValue(ph)}
            text={`${getValidValue(ph)}%`}
            styles={buildStyles({
              textSize: "16px",
              pathColor: "#FFCE56",
              textColor: "#333",
              trailColor: "#eee",
            })}
          />
          <p className="mt-2 font-medium text-gray-700">PH (K)</p>
        </div>
      </div>

      <button
        // onClick={handleCheckHealth}
        onClick={sendDataToAPI}
        disabled={loading}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? "Checking..." : "Check Health"}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}

      <button
        onClick={onStop}
        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Stop
      </button>
      {/* new Part */}
      <div className="text-center">
      <h2>Crop Recommendation</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {recommendation && (
        <div className="p-4 border rounded shadow-md">
          <h3>Recommended Crop: {recommendation.crop}</h3>
          <p>{recommendation.message}</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default RadialBarChartComponent;
