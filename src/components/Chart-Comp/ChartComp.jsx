import "./ChartComp.css";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const data = {
    labels: ["Java fullstack", "Automation Testing", "React UI/UX", "MERN Stack"],
    datasets: [
      {
        label: "# of Votes",
        data: [14, 19, 13, 10],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(100, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          
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
        <Doughnut height={190} width={580} data={data} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;
