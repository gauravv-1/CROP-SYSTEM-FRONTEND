import React, { useState, useEffect } from "react";
import power from '../../assests/power.png'; // Ensure the path is correct
import RadialBarChartComponent from "./RadialBarChartComponent";

function HealthCheck() {
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const [npkData, setNpkData] = useState([40, 30, 30, 15]); // Initialize with dummy NPK values
  const [showChart, setShowChart] = useState(false); // State to toggle between map and chart

  useEffect(() => {
    // Simulate WebSocket connection and data retrieval
    const ws = new WebSocket("ws://localhost:8081/ws"); // Ensure the correct WebSocket server URL

    ws.onopen = () => {
      console.log("WebSocket connected");
      setConnectionStatus("Connected");
      // ws.send("Requesting data from ESP32...");
    };

    ws.onmessage = (event) => {
      console.log("Raw message from server:", event.data); // Log the raw data for debugging

      try {
        // Extract the JSON part of the message
        const jsonData = event.data.replace("Received from ESP32: ", "").trim();

        // Now parse the JSON data
        const parsedData = JSON.parse(jsonData);
        console.log("Parsed NPK Data:", parsedData);

        // Assuming the JSON format is { "nitrogen": number, "phosphorus": number, "potassium": number }
        const { nitrogen, phosphorus, potassium, ph } = parsedData;
        setNpkData([nitrogen, phosphorus, potassium, ph]);  // Set NPK data state
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
        setConnectionStatus("Error - Invalid data format");
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionStatus("Error - See Console");
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
      setConnectionStatus("Disconnected");
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []);

  // Show RadialBarChartComp when `showChart` is true, else show NPKMap
  return showChart ? (
    <RadialBarChartComponent
      npkData={npkData} // Pass live NPK data to RadialBarChartComp
      onStop={() => setShowChart(false)} // Stop and go back to NPKMap
    />
  ) : (
    <div className="flex flex-col items-center justify-center min-h-[600px] bg-gray-100 text-center">
      <h1 className="text-3xl font-bold mb-6">ESP8266 Data</h1>
      <p className="text-sm text-gray-500 mb-4">{`Status: ${connectionStatus}`}</p>

      {/* Button to trigger chart display */}
      <button
        onClick={() => setShowChart(true)} // Switch to RadialBarChartComp on click
        className="focus:outline-none"
      >
        <img
          src={power}
          alt="Start"
          className="w-24 h-24 rounded-full hover:scale-110 transform transition-transform duration-200"
        />
      </button>

      <p className="mt-4 text-gray-700">
        {npkData ? `Latest NPK Data Received` : "Click the button to fetch data"}
      </p>
    </div>
  );
}

export default HealthCheck;
