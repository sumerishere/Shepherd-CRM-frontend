import "./ChartComp.css";

// import React from 'react';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const data = {
    labels: ["miss-out", "pending", "deal-done", "cold-lead"],
    datasets: [
      {
        label: "# of Votes",
        data: [14, 19, 13, 10],
        backgroundColor: [
          "rgba(255, 99, 132, 0.3)",
          "rgba(255, 206, 86, 0.3)",
          "rgba(100, 192, 192, 0.3)",
          "rgba(153, 102, 255, 0.3)",
          
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(100, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="chart-div">
      <div className="chart-child-div">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;
