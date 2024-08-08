import "../Chart-Comp/MonthsChart.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
// import { dataset } from "../dataset/weather";

const MonthsChart = () => {

  const dataset = [
    { month: 'jan', Java_Fullstack: 50, Automation: 60, MERN_Stack: 70, 'React(UI/UX)': 80 },
    
    { month: 'feb', Java_Fullstack: 40, Automation: 50, MERN_Stack: 60, 'React(UI/UX)': 70 },
    
    { month: 'mar', Java_Fullstack: 50, Automation: 60, MERN_Stack: 70, 'React(UI/UX)': 80 },
    
    { month: 'apr', Java_Fullstack: 40, Automation: 50, MERN_Stack: 60, 'React(UI/UX)': 70 },
    
    { month: 'may', Java_Fullstack: 50, Automation: 60, MERN_Stack: 70, 'React(UI/UX)': 80 },
    
    { month: 'jun', Java_Fullstack: 40, Automation: 50, MERN_Stack: 60, 'React(UI/UX)': 70 },
    
    { month: 'jul', Java_Fullstack: 50, Automation: 60, MERN_Stack: 70, 'React(UI/UX)': 80 },
    
    { month: 'aug', Java_Fullstack: 40, Automation: 50, MERN_Stack: 60, 'React(UI/UX)': 70 },
    
    { month: 'sep', Java_Fullstack: 50, Automation: 60, MERN_Stack: 70, 'React(UI/UX)': 80 },

    { month: 'oct', Java_Fullstack: 40, Automation: 50, MERN_Stack: 60, 'React(UI/UX)': 70 },

    { month: 'nov', Java_Fullstack: 50, Automation: 60, MERN_Stack: 70, 'React(UI/UX)': 80 },
    { month: 'dec', Java_Fullstack: 40, Automation: 50, MERN_Stack: 60, 'React(UI/UX)': 70 },
    // ... other data points
  ];

  const chartSetting = {
    yAxis: [
      {
        label: "rainfall (%)",
      },
    ],

    width: 740,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 1)",
      },
    },
  };

  const valueFormatter = (value) => `${value}%`;

  return (
    <div className="month-chart-root">

      <h3 id="month-chart-heading">Monthly check</h3>

      <div className="month-chart-child">

        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            { dataKey: "Java_Fullstack", label: "Java_Fullstack", valueFormatter },
            { dataKey: "Automation", label: "Automation", valueFormatter },
            { dataKey: "MERN_Stack", label: "MERN_Stack", valueFormatter },
            { dataKey: "React(UI/UX)", label: "React(UI/UX)", valueFormatter },
          ]}
          {...chartSetting}
        />

      </div>
    </div>
  );
};

export default MonthsChart;
