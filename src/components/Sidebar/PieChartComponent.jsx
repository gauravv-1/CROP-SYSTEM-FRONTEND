// src/components/PieChartComponent.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function PieChartComponent({ npkData, onStop }) {
  const data = {
    labels: ["Nitrogen (N)", "Phosphorus (P)", "Potassium (K)"],
    datasets: [
      {
        label: "NPK Levels",
        data: npkData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
          color: "#333",
        },
      },
      title: {
        display: true,
        text: "NPK Composition in Soil",
        font: {
          size: 18,
        },
        color: "#333",
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] bg-gray-100 text-center">
      <h2 className="text-2xl font-semibold mb-4">Soil NPK Data Visualization</h2>
      
      {/* Pie chart container */}
      <div className="flex justify-center items-center h-72 w-72 mb-4">
        <Pie data={data} options={options} />
      </div>

      {/* Stop button to go back to NPKMap */}
      <button
        onClick={onStop}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Stop
      </button>
    </div>
  );
}

export default PieChartComponent;
